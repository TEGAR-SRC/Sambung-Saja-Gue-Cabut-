<?php

namespace App\Repositories\Eloquents;

use Exception;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Order;
use App\Models\Store;
use App\Models\Refund;
use App\Models\Product;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use App\Enums\OrderEnum;
use App\Models\Dashboard;
use App\Enums\PaymentStatus;
use App\Models\WithdrawRequest;
use App\Http\Traits\CommissionTrait;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;

class DashboardRepository extends BaseRepository
{
    use CommissionTrait;

    function model()
    {
        return Dashboard::class;
    }

    public function index($request)
    {
        try {

            $roleName = Helpers::getCurrentRoleName();
            return [
                'total_revenue' => $this->getTotalRevenue($roleName),
                'total_orders' => $this->getTotalOrders($roleName, $request),
                'total_users' => $this->getTotalUsers(),
                'total_products' => $this->getTotalProducts($roleName),
                'total_stores' => $this->getTotalStores(),
                'total_refunds' => $this->getTotalRefunds(),
                'total_withdraw_requests' => $this->getTotalWithdrawRequest(),
                'total_pending_orders' => $this->getTotalOrdersByStatus(OrderEnum::PENDING, $request),
                'total_processing_orders' => $this->getTotalOrdersByStatus(OrderEnum::PROCESSING, $request),
                'total_shipped_orders' => $this->getTotalOrdersByStatus(OrderEnum::SHIPPED, $request),
                'total_out_of_delivery_orders' => $this->getTotalOrdersByStatus(OrderEnum::OUT_FOR_DELIVERY, $request),
                'total_cancelled_orders' => $this->getTotalOrdersByStatus(OrderEnum::CANCELLED, $request),
                'total_delivered_orders' => $this->getTotalOrdersByStatus(OrderEnum::DELIVERED, $request),
            ];

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function getTotalOrdersByStatus($status, $request)
    {
        $roleName = Helpers::getCurrentRoleName();
        $orders = $this->getOrder($roleName, $request);
        $orders =  $orders->where('order_status_id', Helpers::getOrderStatusIdByName($status));
        return $this->filter($orders, $request)->count();
    }

    public function filter($orders, $request)
    {
        if ($request->filter_by) {
            $orders = Helpers::getFilterBy($orders, $request->filter_by);
        }

        if ($request->start_date && $request->end_date) {
            $orders = $orders->whereBetween('created_at',[$request->start_date, $request->end_date]);
        }

        return $orders;
    }

    public function getYearlyMonths()
    {
        $year = Carbon::now()->format('y');
        return collect(range(1, 12))->map(function ($month) use ($year) {
            return Carbon::createFromDate(null, $month, 1)->format('M \'' .$year);
        })->toArray();
    }

    public static function getMonthlyCompletedOrder($month, $year, $roleName)
    {
      $orders = Order::whereMonth('created_at',$month)->whereYear('created_at', $year)->whereNull('deleted_at');
      if ($roleName == RoleEnum::VENDOR) {
        return $orders->where('store_id', Helpers::getCurrentVendorStoreId())->get();
      }

      return $orders;
    }

    public function getMonthlyRevenues($roleName)
    {
        $months = range(1, 12);
        $perMonthRevenues = [];
        foreach($months as $month) {
            $perMonthRevenues[] =  (float) $this->getCompleteOrder($roleName)
                ->whereMonth('created_at',$month)
                ->whereYear('created_at', Carbon::now()->year)->sum('total');
        }

        return $perMonthRevenues;
    }

    public function chart()
    {
        try {

            $roleName = Helpers::getCurrentRoleName();
            $data['revenues'] =  $this->getMonthlyRevenues($roleName);
            $data['commissions'] = $this->getMonthlyCommissions(Carbon::now()->year, $roleName);
            $data['months'] =  $this->getYearlyMonths();
            return $data;

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function getTotalProducts($roleName)
    {
        $products = Product::whereNull('deleted_at')->get();
        if ($roleName == RoleEnum::VENDOR) {
            return $products->where('store_id', Helpers::getCurrentVendorStoreId())->count();
        }

        return $products->count();
    }

    public function getTotalStores()
    {
        return Store::whereNull('deleted_at')->count();
    }

    public function getTotalRefunds()
    {
        return Refund::whereNull('deleted_at')->count();
    }

    public function getTotalWithdrawRequest()
    {
        return WithdrawRequest::whereNull('deleted_at')->get()->count();
    }

    public function getTotalUsers()
    {
        $rolesToExclude = [RoleEnum::ADMIN, RoleEnum::VENDOR];
        return User::whereHas('roles', function ($query) use ($rolesToExclude) {
            $query->whereNotIn('name', $rolesToExclude);
        })->whereNull('deleted_at')->count();
    }

    public function getTotalOrders($roleName, $request)
    {
        return $this->getOrder($roleName, $request)->count();
    }

    public function getTotalRevenue($roleName)
    {
        return (float) $this->getCompleteOrder($roleName)?->sum('total');
    }

    public function getOrder($roleName, $request)
    {
        $orders = Order::whereNull('deleted_at')->whereNull('parent_id');
        if ($roleName == RoleEnum::VENDOR) {
            $childOrders = Order::whereNUll('deleted_at')->whereNotNull('parent_id')->where('store_id', Helpers::getCurrentVendorStoreId());
            $parentOrderIds = Order::whereNUll('deleted_at')->whereNull('parent_id')->where('store_id', Helpers::getCurrentVendorStoreId())->whereNotIn('id', $childOrders->pluck('parent_id')->toArray())->pluck('id')->toArray();
            $parentOrderIds = $childOrders->pluck('id')->toArray();

            $orderIds = array_merge($parentOrderIds, $parentOrderIds);
            $orders = Order::whereIn('id', $orderIds);
        }

        return $this->filter($orders, $request);
    }

    public function getCompleteOrder($roleName)
    {
        $orders = Order::whereNull('deleted_at')->where('payment_status', PaymentStatus::COMPLETED);
        if ($roleName == RoleEnum::VENDOR) {
            return $orders->whereNotNull('parent_id')->where('store_id', Helpers::getCurrentVendorStoreId());
        }

        return $orders->whereNull('parent_id');
    }
}
