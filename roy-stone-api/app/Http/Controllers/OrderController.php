<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Order;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use Illuminate\Http\Request;
use App\Http\Requests\TrackOrderRequest;
use App\Http\Requests\CreateOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Requests\CancelOrderRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use App\Repositories\Eloquents\OrderRepository;

class OrderController extends Controller
{
    public $repository;

    public function __construct(OrderRepository $repository)
    {
        $this->repository = $repository;
        $this->authorizeResource(Order::class, 'order', [
            'except' => ['show', 'store'],
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $orders = $this->repository->whereNull('deleted_at')->whereNull('parent_id')->with('sub_orders');
            $orders = $this->filter($orders, $request);
            return $orders->latest('created_at')->paginate($request->paginate  ?? $orders->count());

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateOrderRequest $request)
    {
        return $this->repository->placeOrder($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->repository->show($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        return $this->repository->update($request->all(), $order->getId($request));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Order $order)
    {
        return $this->repository->destroy($order->getId($request));
    }

    /**
     * Update Status the specified resource from storage.
     *
     * @param  int  $id
     * @param int $status
     * @return \Illuminate\Http\Response
     */
    public function status($id, $status)
    {
        return $this->repository->status($id, $status);
    }

    public function trackOrder(TrackOrderRequest $request)
    {
        return $this->repository->trackOrder($request);
    }

    public function verifyPayment(Request $request)
    {
        return $this->repository->verifyPayment($request);
    }

    public function rePayment(Request $request)
    {
        return $this->repository->rePayment($request);
    }

    public function getInvoiceUrl(Request $request)
    {
        return $this->repository->getInvoiceUrl($request->order_number);
    }

    public function getInvoice(Request $request)
    {
        return $this->repository->getInvoice($request);
    }

    public function statusReminder()
    {
        return $this->repository->statusReminder();
    }

    public function cancel(CancelOrderRequest $request)
    {
        return $this->repository->cancel($request);
    }

    public function filter($orders, $request)
    {
        $roleName = Helpers::getCurrentRoleName();
        if ($roleName == RoleEnum::CONSUMER) {
            $orders = $orders->where('consumer_id', Helpers::getCurrentUserId());
        }

        if ($roleName == RoleEnum::VENDOR) {
            $childOrders = $this->repository->whereNUll('deleted_at')->whereNotNull('parent_id')->where('store_id', Helpers::getCurrentVendorStoreId());
            $parentOrderIds = $this->repository->whereNUll('deleted_at')->whereNull('parent_id')->where('store_id', Helpers::getCurrentVendorStoreId())->whereNotIn('id', $childOrders->pluck('parent_id')->toArray())->pluck('id')->toArray();
            $parentOrderIds = $childOrders->pluck('id')->toArray();
            $orderIds = array_merge($parentOrderIds, $parentOrderIds);
            $orders = $this->repository->whereIn('id', $orderIds);
        }

        if ($request->field && $request->sort) {
            $orders = $orders->orderBy($request->field, $request->sort);
        }

        if ($request->status) {
            $orders = $orders->where('order_status_id', Helpers::getOrderStatusIdByName($request->status));
        }

        if ($request->start_date && $request->end_date) {
            $orders = $orders->whereBetween('created_at',[$request->start_date, $request->end_date]);
        }

        return $orders;
    }
}
