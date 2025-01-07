<?php

namespace App\Repositories\Eloquents;

use Exception;
use Carbon\Carbon;
use App\Models\Order;
use App\Payments\Cod;
use App\Enums\RoleEnum;
use App\Payments\bKash;
use App\Payments\Mollie;
use App\Payments\PayPal;
use App\Payments\Stripe;
use App\Helpers\Helpers;
use App\Enums\OrderEnum;
use App\Payments\PhonePe;
use App\Payments\Paystack;
use App\Payments\CCAvenue;
use App\Payments\RazorPay;
use App\Payments\InstaMojo;
use Illuminate\Support\Arr;
use App\Models\OrderStatus;
use App\Payments\SSLCommerz;
use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Payments\FlutterWave;
use App\Payments\BankTransfer;
use App\Events\PlaceOrderEvent;
use App\Models\OrderTransaction;
use App\Events\CancelOrderEvent;
use App\Enums\WalletPointsDetail;
use App\Http\Traits\PaymentTrait;
use Illuminate\Support\Facades\DB;
use App\Http\Traits\CheckoutTrait;
use App\Http\Traits\TransactionsTrait;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use App\Events\UpdateOrderStatusEvent;
use App\Events\PendingOrderReminderEvent;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class OrderRepository extends BaseRepository
{
    use CheckoutTrait, PaymentTrait, TransactionsTrait;

    protected $settings;
    protected $orderStatus;
    protected $orderTransaction;

    protected $fieldSearchable = [
        'order_number' => 'like',
        'payment_method' => 'like',
        'orderStatus.name' => 'like',
        'payment_status' => 'like',
    ];

    public function boot()
    {
        try {

            $this->pushCriteria(app(RequestCriteria::class));

        } catch (ExceptionHandler $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    function model()
    {
        $this->orderStatus = new OrderStatus();
        $this->settings = Helpers::getSettings();
        $this->orderTransaction = new OrderTransaction();
        return Order::class;
    }

    public function getOrderNumber($digits)
    {
        $i = 0;
        do {

            $order_number = pow(10, $digits) + $i++;

        } while ($this->model->where("order_number", "=", $order_number)->exists());

        return $order_number;
    }

    public function verifySingleOrder(Order $order)
    {
        $roleName = Helpers::getCurrentRoleName();
        if ($roleName == RoleEnum::CONSUMER) {
            if ($order->consumer_id != Helpers::getCurrentUserId()) {
                return false;
            }
        } else if ($roleName == RoleEnum::VENDOR) {
            if ($order->store_id != Helpers::getCurrentVendorStoreId()) {
                return false;
            }
        }

        return true;
    }

    public function show($order_number)
    {
        try {

            $order = Helpers::getOrderByOrderNumber($order_number);
            if ($order) {
                if ($this->verifySingleOrder($order)) {
                    return $this->verifyPayment($order);
                }

                throw new Exception("This action is unauthorized", 403);
            }

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function trackOrder($request)
    {
        try {

            $order = $this->show($request?->order_number);
            if ($this->verifyOrderUserDetails($order, $request)) {
                return $order;
            }

            throw new Exception("Provided details are invalid", 400);

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function createOrGetConsumerId($request)
    {
        $consumer_id = $this->getConsumerId($request);
        if (!$consumer_id) {
            if ($request->create_account && !Helpers::isUserLogin()) {
                $consumer = $this->createAccount($request);
                $consumer_id = $consumer?->id;
                $request->merge(['consumer_id' => $consumer_id]);
                if ($request->shipping_address) {
                    $request->merge(['shipping_address' => $this->createUserAddress($consumer, $request->shipping_address)]);
                }

                if ($request->billing_address_id) {
                    $request->merge(['billing_address' => $this->createUserAddress($consumer, $request->billing_address)]);
                }
            }
        }

        return $consumer_id;
    }

    public function placeOrder($request)
    {
        DB::beginTransaction();
        try {

            $consumer_id = $this->createOrGetConsumerId($request);
            $products = $this->getUniqueProducts($request->products);
            $request->merge(['products' => $products]);
            $items = $this->calculate($request);

            if (!$consumer_id && !Helpers::isUserLogin()) {
                if (!$this->isPhysicalOnly($request->products)) {
                    throw new Exception("Guest checkout allow for physical product", 422);
                }
            }

            if ($request->coupon) {
                $coupon = Helpers::getCoupon($request->coupon);
                $amount = Helpers::getTotalAmount($request->products);
                if ($this->isValidCoupon($coupon, $amount, $consumer_id)) {
                    $request->merge(['coupon_id' => $coupon->id]);
                }
            }

            $request->merge(['is_multiple_stores' => (count($items['items']) > 1)]);
            $request->merge(['store_id' => head($items['items'])['store']]);

            $order = $this->createOrder($items, $request);
            if (Helpers::isMultiVendorEnable()) {
                $this->createSubOrder($items, $request, $order);
                $order->sub_orders;
            }


            DB::commit();
            $order = $order->fresh();

            if ($consumer_id) {
                if ($request->points_amount) {
                    $balance = abs($items['total']['convert_point_amount']);
                    if ($this->verifyPoints($consumer_id, $balance)) {
                        $balance = $this->currencyToPoints($balance);
                        $this->debitPoints($consumer_id, $balance, WalletPointsDetail::POINTS_ORDER . ' #' . $order->order_number);
                    }
                }

                if ($request->wallet_balance) {
                    $balance = abs($items['total']['convert_wallet_balance']);
                    if ($this->verifyWallet($consumer_id, $balance)) {
                        $this->debitWallet($consumer_id, $balance, WalletPointsDetail::WALLET_ORDER . ' #' . $order->order_number);
                    }
                }

                if ($request->coupon_id) {
                    $this->updateCouponUsage($request->coupon_id);
                }
            }

            Helpers::removeCart($order);
            return $this->createPayment($order, $request);

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function createOrder($item, $request)
    {
        if ($this->isActivePaymentMethod($request->payment_method, $item['total']['total'])) {
            $order_number = (string) $this->getOrderNumber(3);
            $consumer_id = $request->consumer_id ?? Helpers::getCurrentUserId();
            $order_status = Helpers::getOrderStatusIdByName(OrderEnum::PENDING);
            $payment_status = PaymentStatus::PENDING;
            if (!$request->points_amount) {
                $item['total']['convert_point_amount'] = 0;
            }

            if (!$request->wallet_balance) {
                $item['total']['convert_wallet_balance'] = 0;
            }

            if ($item['total']['is_digital_only']) {
                $payment_status = PaymentStatus::COMPLETED;
                $order_status = Helpers::getOrderStatusIdByName(OrderEnum::DELIVERED);
            }

            if (!$request->shipping_address && $request->shipping_address_id) {
                $request->shipping_address = Helpers::getAddressById($request->shipping_address_id);
            }

            if (!$request->billing_address && $request->billing_address_id) {
                $request->billing_address = Helpers::getAddressById($request->billing_address_id);
            }

            if ($request->is_multiple_stores && !$request->parent_id) {
                $request->merge(['store_id' => $request->parent_id]);
            }

            $order = $this->model->create([
                'order_number' => $order_number,
                'consumer_id' => $consumer_id,
                'store_id' => $request->store_id,
                'tax_total' => $item['total']['tax_total'],
                'shipping_total' => $item['total']['shipping_total'],
                'payment_method' => $request->payment_method,
                'order_status_id' => $order_status,
                'payment_status' => $payment_status,
                'shipping_address' => $request->shipping_address,
                'billing_address' =>  $request->billing_address,
                'delivery_description' => $request->delivery_description,
                'delivery_interval' => $request->delivery_interval,
                'parent_id' => $request->parent_id,
                'coupon_id' => $request->coupon_id,
                'consumer' => Helpers::getConsumerById($consumer_id),
                'points_amount' => $item['total']['convert_point_amount'],
                'wallet_balance' => $item['total']['convert_wallet_balance'],
                'invoice_url' => $this->generateInvoiceUrl($order_number),
                'coupon_total_discount' => $item['total']['coupon_total_discount'],
                'is_guest' => (int) is_null($consumer_id),
                'is_digital_only' =>  $item['total']['is_digital_only'],
                'amount' => $item['total']['sub_total'],
                'total' => $item['total']['total']
            ]);

            if (!isset($item['products'])) {
                foreach ($item['items'] as $itemValues) {
                    foreach ($itemValues['products'] as $productValue) {
                        $itemProduct[] = $productValue;
                    }
                }

                $item['products'] = $itemProduct;
            }

            foreach ($item['products'] as $itemProduct) {
                $itemProduct = Arr::except($itemProduct, ['store_id']);
                $item_products[] = $itemProduct;
            }

            $item['products'] = $item_products;
            $order->products()->attach($item['products']);
            $item_products = [];
            $order->store;
            $order->products;
            $order->order_status;

            if (!$consumer_id && $order->is_guest) {
                $consumer = [
                    'name' => $request->name,
                    'email' => $request->email,
                    'country_code' => $request->country_code,
                    'phone' => $request->phone,
                ];

                $order->consumer = $consumer;
                $order->save();
            }

            if (!$request->parent_id) {
                $digitalItems = [];
                foreach ($item['products'] as $key => $product) {
                    if (Helpers::isDigitalProduct($product['product_id'])) {
                        $digitalItems[$key]['product_id'] = $product['product_id'];
                        if (isset($product['variation_id'])) {
                            $digitalItems[$key]['variation_id'] = $product['variation_id'];
                        }
                    }
                }

                if (count($digitalItems) && !empty($digitalItems)) {
                    foreach ($digitalItems as $item) {
                        if (Helpers::isLicensableProduct($item)) {
                            $license_key_id = $this->assignLicenseKey($order, $item)?->id;
                        }

                        $order->download_file()->create([
                            'product_id' => $item['product_id'] ?? null,
                            'variation_id' => $item['variation_id'] ?? null,
                            'consumer_id' => $consumer_id,
                            'license_key_id' => $license_key_id ?? null
                        ]);
                    }
                }
            }

            if ($order) {
                $this->updateOrderStatusActivities($order, $order->order_status?->name, $order->created_at);
            }

            event(new PlaceOrderEvent($order));
            return $order;
        }
    }

    public function createSubOrder($items, $request, Order $parentOrder)
    {
        $subOrders = [];
        if (count($items['items']) > 1) {
            foreach ($items['items'] as $item) {
                if (isset($request->products)) {
                    $request->merge(['parent_id' => $parentOrder->id, 'store_id' => $item['store']]);
                    $order = $this->createOrder($item, $request);
                    $subOrders[] = $order;
                }
            }
        }

        return $subOrders;
    }

    public function getWalletRatio()
    {
        $walletRatio = $this->settings['general']['wallet_currency_ratio'];
        return $walletRatio <= 0 ? 1 : $walletRatio;
    }

    public function isAllOrdersDelivered($order)
    {
        if ($order->parent_id) {
            $order = $this->model->findOrFail($order->parent_id);
        }

        if ($order->sub_orders?->isNotEmpty()) {
            $deliveredStatusId = Helpers::getOrderStatusIdByName(OrderEnum::DELIVERED);
            $deliveredCount = $order->sub_orders->where('order_status_id', $deliveredStatusId)->count();
            if ($order->sub_orders?->count() == $deliveredCount) {
                $order->payment_status = PaymentStatus::COMPLETED;
                $order->save();
            }
        }
    }

    public function update($request, $id)
    {
        DB::beginTransaction();
        try {

            $request = Arr::except($request, ['order_number']);
            $order = $this->model->findOrFail($id);
            if (isset($request['order_status_id'])) {
                $order_status = $this->orderStatus->where('id', $request['order_status_id'])->pluck('name')->first();
                if ($order_status == OrderEnum::DELIVERED && $order->payment_method == PaymentMethod::COD) {
                    $this->isAllOrdersDelivered($order);
                    $request['payment_status'] = PaymentStatus::COMPLETED;
                } else if ($order_status == OrderEnum::CANCELLED && $order->payment_status == PaymentStatus::PENDING) {
                    $request['payment_status'] = PaymentStatus::CANCELLED;
                }
            }

            $order->update($request);
            if (isset($request['order_status_id'])) {
                $changed_at = isset($request['changed_at']) ? $request['changed_at']: Carbon::now()->toDateTimeString();
                $this->updateOrderStatusActivities($order, $order_status, $changed_at);
            }

            DB::commit();

            $order = $order->fresh();
            $order->products;
            $order->sub_orders;
            $order->billing_address;
            $order->shipping_address;
            $order->order_status_activities;

            if (isset($request['order_status_id'])) {
                if ($order->order_status->name == OrderEnum::DELIVERED) {
                    $order->delivered_at = Carbon::now()->toDateString();
                    $order->save();

                    if ($order->parent_id) {
                        $this->updateParentOrderStatus($order);
                    }

                } else if ($order->order_status->name == OrderEnum::CANCELLED) {
                    Helpers::updateProductStock($order);
                }

                event(new UpdateOrderStatusEvent($order));
            }

            return $order;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function updateParentOrderStatus($order)
    {
        $parentOrder = $this->model->findOrFail($order->parent_id);
        if (count($parentOrder->sub_orders)) {
            $isAllPaymentCompleted = $parentOrder?->sub_orders?->every(function ($subOrder) {
                return $subOrder->payment_status ===  PaymentStatus::COMPLETED;
            });
            if ($isAllPaymentCompleted) {
                $parentOrder->payment_status = PaymentStatus::COMPLETED;
                $parentOrder->save();
            }
            $isAllOrderDelivered = $parentOrder?->sub_orders?->every(function ($subOrder) {
                return $subOrder->order_status?->name ===  OrderEnum::DELIVERED;
            });
            if ($isAllOrderDelivered) {
                $parentOrder->payment_status = PaymentStatus::COMPLETED;
                $parentOrder->save();
            }
        }
    }

    public function updateOrderStatusActivities($order, $status, $changed_at = null)
    {
        $sequence = $this->orderStatus->getSequenceByName($status);
        $cancelSequence = $this->orderStatus->getCancelSequence();
        if ($order?->is_digital_only) {
            $excludeSequences = $this->orderStatus->getExcludedSequenceForDigital();
            $order_sequences = collect(range(1, $sequence))
                ->reject(fn($item) =>($sequence > $cancelSequence && in_array($item, $excludeSequences)))?->values()?->all();
        } else {
            $order_sequences = collect(range(1, $sequence))?->reject(fn($item) => ($sequence > $cancelSequence && $item === $cancelSequence))?->values()?->all();
        }

        if ($order_sequences && is_array($order_sequences)) {
            foreach($order_sequences as $order_sequence) {
                $status = $this->orderStatus?->getNameBySequence($order_sequence);
                if ($status) {
                    $changed_at = $changed_at ?? Carbon::now()->toDateTimeString();
                    $order->order_status_activities()->updateOrCreate(['status' => $status],[
                        'status' => $status,
                        'changed_at' => $changed_at
                    ]);
                }
            }
        }
    }

    public function updateOrderStatus($order, $status)
    {
        $sequence = $this->orderStatus->getSequenceByName($status)->toArray();
        $order_sequences  = collect($this->orderStatus->getAllSequences());
        $activity_status_sequences = $order_sequences
                ->reject(fn($item) => in_array($item, $sequence))
                ->splice(2, 0, $order_sequences->diff($sequence))
                ->unique()
                ->values()
                ->except($this->orderStatus?->getSequenceByName(OrderEnum::CANCELLED))
                ->all();

        if ($activity_status_sequences && is_array($activity_status_sequences)) {
            foreach($activity_status_sequences as $activity_status_sequence) {
                $status = $this->orderStatus?->getNameBySequence($activity_status_sequence);
                if ($status) {
                    $order->order_status_activities()->updateOrCreate(['status' => $status],[
                        'status' => $status,
                        'changed_at' => $order->created_at
                    ]);
                }
            }
        }
    }

    public function destroy($id)
    {
        try {

            return $this->model->where('id', $id)->where('consumer_id', Helpers::getCurrentUserId())->destroy($id);

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function verifyPayment($request)
    {
        try {

            $order = $this->verifyOrderNumber($request->order_number);
            $transaction_id = $this->orderTransaction->where('order_id', $order->id)->pluck('transaction_id')->first();
            if (is_null($order) || !$transaction_id) {
                return $order;
            }

            switch ($order->payment_method) {
                case PaymentMethod::PAYPAL:
                    return PayPal::status($order, $transaction_id);

                case PaymentMethod::STRIPE:
                    return Stripe::status($order, $transaction_id);

                case PaymentMethod::RAZORPAY:
                    return RazorPay::status($order, $transaction_id);

                case PaymentMethod::MOLLIE:
                    return Mollie::status($order, $transaction_id);

                case PaymentMethod::PHONEPE:
                    return PhonePe::status($order, $transaction_id);

                case PaymentMethod::INSTAMOJO:
                    return InstaMojo::status($order, $transaction_id);

                case PaymentMethod::BKASH:
                    return bKash::status($order, $transaction_id);

                case PaymentMethod::PAYSTACK:
                    return Paystack::status($order, $transaction_id);

                default:
                    return $order;
            }
        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function verifyOrderNumber($order_number)
    {
        try {

            $order = $this->model->with(config('enums.order.with'))->where('order_number', $order_number)->first();
            if (!$order) {
                throw new Exception('The provided order number is not valid.', 400);
            }

            $order->products;
            return $order;

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function rePayment($request)
    {
        try {

            $order = $this->verifyOrderNumber($request->order_number);
            if ($order->payment_status == PaymentStatus::COMPLETED) {
                throw new Exception('This payment has already been successfully processed previously.', 400);
            }

            return $this->createPayment($order, $request);

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function generateInvoiceUrl($order_number)
    {
        return route('invoice', ['order_number' => $order_number]);
    }

    public function getInvoiceUrl($order_number)
    {
        try {

            return $this->verifyOrderNumber($order_number)?->invoice_url;

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function getInvoice($request)
    {
        try {

            $order = $this->verifyOrderNumber($request->order_number);
            $roleName = Helpers::getCurrentRoleName();
            if ($order->consumer_id != Helpers::getCurrentUserId() && $roleName == RoleEnum::CONSUMER) {
                throw new Exception("This order hasn't been purchased by you.", 400);
            }

            $invoice = [
                'order' => $order,
                'settings' => Helpers::getSettings(),
            ];

            return PDF::loadView('emails.invoice', $invoice)->download('invoice-' . $order->order_number . '.pdf');

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function statusReminder()
    {
        try {

            $orders = $this->model->whereNull('deleted_at')->where('order_status_id', Helpers::getOrderStatusIdByName(OrderEnum::PENDING))
                ->where('updated_at', '<=', Carbon::now()->subHours(24));

            if ($orders) {
                foreach($orders as $order) {
                    event(new PendingOrderReminderEvent($order));
                }
            }

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function cancel($request)
    {
        try {

            $roleName = Helpers::getCurrentRoleName();
            $order = $this->model->findOrFail($request->id);
            if (!$order?->is_guest) {
                if ($roleName == RoleEnum::CONSUMER) {
                    if ($order->consumer_id != Helpers::getCurrentUserId()) {
                        throw new Exception("This order does not belong to you and cannot be cancelled.", 400);
                    }
                }

                $pending_status_id = Helpers::getOrderStatusIdByName(OrderEnum::PENDING);
                $processing_status_id = Helpers::getOrderStatusIdByName(OrderEnum::PROCESSING);
                if ($order->order_status_id == $pending_status_id ||
                    $order->order_status_id == $processing_status_id) {
                    $order->update([
                        'order_status_id' => Helpers::getOrderStatusIdByName(OrderEnum::CANCELLED)
                    ]);

                    $order = $order->fresh();
                    Helpers::updateProductStock($order);
                    event(new CancelOrderEvent($order));
                }
            }

            return $order;

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function createPayment(Order $order, $request)
    {
        try {

            switch ($request->payment_method) {
                case PaymentMethod::PAYPAL:
                    return PayPal::getIntent($order, $request);

                case PaymentMethod::STRIPE:
                    return Stripe::getIntent($order, $request);

                case PaymentMethod::RAZORPAY:
                    return RazorPay::getIntent($order, $request);

                case PaymentMethod::MOLLIE:
                    return Mollie::getIntent($order, $request);

                case PaymentMethod::PHONEPE:
                    return PhonePe::getIntent($order, $request);

                case PaymentMethod::INSTAMOJO:
                    return InstaMojo::getIntent($order, $request);

                case PaymentMethod::CCAVENUE:
                    return CCAvenue::getIntent($order, $request);

                case PaymentMethod::BKASH:
                    return bKash::getIntent($order, $request);

                case PaymentMethod::FLUTTERWAVE:
                    return FlutterWave::getIntent($order, $request);

                case PaymentMethod::SSLCOMMERZ:
                    return SSLCommerz::getIntent($order, $request);

                case PaymentMethod::PAYSTACK:
                    return Paystack::getIntent($order, $request);

                case PaymentMethod::BANK_TRANSFER:
                    return BankTransfer::status($order, $request);

                case PaymentMethod::COD:
                    return Cod::status($order, $request);

                default:
                    throw new Exception('The selected payment method is not valid for this transaction.', 400);
            }

            return $order;

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}
