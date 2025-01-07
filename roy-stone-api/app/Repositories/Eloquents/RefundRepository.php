<?php

namespace App\Repositories\Eloquents;

use Exception;
use Carbon\Carbon;
use App\Models\Order;
use App\Models\Refund;
use App\Models\Product;
use App\Enums\OrderEnum;
use App\Helpers\Helpers;
use App\Enums\PaymentType;
use App\Enums\RequestEnum;
use App\Enums\PaymentStatus;
use App\Enums\WalletPointsDetail;
use Illuminate\Support\Facades\DB;
use App\Http\Traits\WalletPointsTrait;
use App\Events\CreateRefundRequestEvent;
use App\Events\UpdateRefundRequestEvent;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class RefundRepository extends BaseRepository
{
    use WalletPointsTrait;

    protected $order;
    protected $product;

    protected $fieldSearchable = [
        'user.name' => 'like',
        'user.email' => 'like',
        'store.store_name' => 'like',
        'order.order_number' => 'like',
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
        $this->order = new Order();
        $this->product = new Product();
        return Refund::class;
    }

    public function show($id)
    {
        try {

            return $this->model->findOrFail($id);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function getConsumerIdByOrderId($order_id)
    {
        return $this->order->findOrFail($order_id)->pluck('consumer_id')->first();
    }

    public function getOrder($order_id)
    {
        return $this->order->findOrFail($order_id)->first();
    }

    public function isRefundEnable($settings)
    {
        return $settings['refund']['status'];
    }

    public function isProductCanReturn($product_id)
    {
        return $this->product->where('id', $product_id)?->value('is_return');
    }

    public function getDeliveredDays($order)
    {
        return now()->diffInDays(Carbon::parse($order->delivered_at)->toDateString());
    }

    public function verifyStatus($order)
    {
        if ($order->payment_status == PaymentStatus::COMPLETED &&
            $order->order_status->name == OrderEnum::DELIVERED) {
            return true;
        }

        throw new Exception("Refund possible for completed payment and delivered order.", 400);
    }

    public function verifyRefund($consumer_id, $request)
    {
        $settings = Helpers::getSettings();
        if ($this->isRefundEnable($settings)) {
            if ($this->verifyProductRefundable($request->product_id)) {
                 $order = Order::findOrFail($request->order_id);
                if ($order) {
                    if ($this->verifyStatus($order)) {
                        if ($this->verifyDeliveryDays($order, $settings['refund']['refundable_days'])) {
                            if ($this->isNotAlreadyRequest($consumer_id, $request->product_id, $request->order_id)) {
                                if ($this->verifyPaymentType($consumer_id, $request->payment_type)) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }

        throw new Exception('The refund feature is currently not enabled.', 400);
    }

    public function verifyPaymentType($consumer_id, $paymentType)
    {
        switch ($paymentType) {
            case PaymentType::BANK:
            case PaymentType::PAYPAL:
                return $this->verifyPaymentAccount($consumer_id);
            case PaymentType::WALLET:
                return $this->verifyWallet($consumer_id);
        }
    }

    public function verifyWallet($consumer_id)
    {
        return $this->getWallet($consumer_id);
    }

    public function verifyPaymentAccount($user_id)
    {
        $paymentAccount = Helpers::getPaymentAccount($user_id);
        if (!$paymentAccount) {
            return $paymentAccount;
        }

        throw new Exception("Kindly create a payment account before claiming your refund.", 400);
    }

    public function isNotAlreadyRequest($consumer_id, $product_id, $order_id)
    {
        if (!$this->model->where('consumer_id', $consumer_id)->
            where('product_id', $product_id)->
            where('order_id', $order_id)->whereNUll('deleted_at')->first()) {
            return true;
        }

        throw new Exception('A refund request for this product has already been submitted.', 400);
    }

    public function verifyDeliveryDays($order, $refundableDays)
    {
        if ($this->getDeliveredDays($order) <= $refundableDays) {
            return true;
        }

        throw new Exception("Refund are not possible after {$refundableDays} days from delivery.", 400);
    }

    public function getConsumerOrderByProductId($consumer_id, $product_id)
    {
        return $this->order->where('consumer_id', $consumer_id)->whereRelation('products', function($products) use($product_id) {
            $products->Where('product_id', $product_id);
        })->first();
    }

    public function verifyIsPurchaseProduct($consumer_id, $product_id)
    {
        $order = $this->getConsumerOrderByProductId($consumer_id, $product_id);
        if (!$order) {
            throw new Exception('Only purchased products are eligible for refund requests.', 400);
        }

        if (!$order?->sub_orders->isEmpty()) {
            $tempOrder = null;
            foreach($order->sub_orders as $sub_order) {
                foreach($sub_order->products as $product) {
                    if ($product->id == $product_id) {
                        $tempOrder = $sub_order;
                    }
                }
            }

            $order = $tempOrder;
        }

        return $order;
    }

    public function verifyProductRefundable($product_id)
    {
        if (!$this->isProductCanReturn($product_id)) {
            throw new Exception('Refunds are not allowed for this product.', 400);
        }

        return true;
    }

    public function getRefundProductInOrder($order, $product_id)
    {
        foreach($order->products as $product) {
            if ($product->id == $product_id) {
                return $product->pivot;
            }
        }
    }

    public function store($request)
    {
        DB::beginTransaction();
        try {

            $consumer_id = Helpers::getCurrentUserId();
            if ($this->verifyRefund($consumer_id, $request)) {
                $order = Order::findOrFail($request->order_id);
                $product = $this->getRefundProductInOrder($order, $request->product_id);
                $refund = $this->model->create([
                    'product_id' => $product->product_id,
                    'variation_id' => $product->variation_id,
                    'consumer_id' => $consumer_id,
                    'store_id' => Helpers::getStoreIdByProductId($product->product_id),
                    'order_id' => $product->order_id,
                    'amount' => $product->subtotal,
                    'quantity' => $product->quantity,
                    'reason' => $request->reason,
                    'refund_type' => $request->payment_type,
                    'refund_image_id' => $request->refund_image_id
                ]);

                $refund->order_number = $order->order_number;
                $order->products()->updateExistingPivot($request->product_id, [
                    'refund_status' => RequestEnum::PENDING
                ]);

                event(new CreateRefundRequestEvent($refund));

                DB::commit();
                return $refund;
            }

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function update($request, $id)
    {
        DB::beginTransaction();
        try {

            $refund = $this->model->findOrFail($id);
            $refund->update([
                'status' => $request['status'],
            ]);

            $refund = $refund->fresh();
            if ($refund->status == RequestEnum::APPROVED) {
                if (isset($refund->variation_id)) {
                    Helpers::incrementVariationQuantity($refund->variation_id, $refund->quantity);
                } else {
                    Helpers::incrementProductQuantity($refund->product_id, $refund->quantity);
                }

                if ($refund->payment_type == PaymentType::WALLET) {
                    $this->creditWallet($refund->consumer_id, $refund->amount, WalletPointsDetail::ADMIN_CREDIT);
                }

                $refund->is_used = true;
                $refund->save();
            }

            $refund->total_pending_refunds = $this->model->where('status', RequestEnum::PENDING)->count();
            $order = Order::findOrFail($refund->order_id);
            $refund->order_number = $order->order_number;
            $order->products()->updateExistingPivot($refund->product_id, [
                'refund_status' => $refund->status
            ]);

            DB::commit();
            event(new UpdateRefundRequestEvent($refund));

            return $refund;

        } catch (Exception $e){

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function destroy($id)
    {
        try {

            return $this->model->findOrFail($id)->destroy($id);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}
