<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\Order;
use App\Helpers\Helpers;
use App\Enums\OrderEnum;
use App\Enums\PaymentStatus;
use App\Models\CommissionHistory;
use App\Http\Traits\CommissionTrait;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class CommissionHistoryRepository extends BaseRepository
{
    use CommissionTrait;

    protected $fieldSearchable = [
        'order.order_number' => 'like',
        'store.store_name' => 'like',
    ];

    public function boot()
    {
        try {

            $this->pushCriteria(app(RequestCriteria::class));

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    function model()
    {
        return CommissionHistory::class;
    }

    public function show($id)
    {
        try {

            return $this->model->findOrFail($id);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function verifyOrder($order)
    {
        if ($order->is_digital_only) {
            return true;
        }

        if ($order->is_digital_only) {
            return true;
        }
    }

    public function store()
    {
        try {

            $settings = Helpers::getSettings();
            $refundableDays = $settings['refund']['refundable_days'];
            $refundableDate = now()->subDays($refundableDays)->toDateString();
            $orderStatusId = Helpers::getOrderStatusIdByName(OrderEnum::DELIVERED);
            $physicalOrders = Order::where('payment_status', PaymentStatus::COMPLETED)
                    ->where('order_status_id', $orderStatusId)
                    ->where('is_digital_only', false)
                    ->whereNotNull('delivered_at')
                    ->whereDate('delivered_at', '<=', $refundableDate)
                    ->get();

            $digitalOrders = Order::where('payment_status', PaymentStatus::COMPLETED)
                ->where('order_status_id', $orderStatusId)
                ->where('is_digital_only', true)
                ->whereNotNull('delivered_at')
                ->get();

            if ($physicalOrders) {
                foreach($physicalOrders as $order) {
                    $this->adminVendorCommission($order);
                }
            }

            if ($digitalOrders) {
                foreach($physicalOrders as $order) {
                    $this->adminVendorCommission($order);
                }
            }

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}
