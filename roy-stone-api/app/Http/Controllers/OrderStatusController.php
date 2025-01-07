<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\OrderStatus;
use Illuminate\Http\Request;
use App\GraphQL\Exceptions\ExceptionHandler;
use App\Http\Requests\CreateOrderStatusRequest;
use App\Http\Requests\UpdateOrderStatusRequest;
use App\Repositories\Eloquents\OrderStatusRepository;

class OrderStatusController extends Controller
{
    protected $repository;

    public function __construct(OrderStatusRepository $repository)
    {
        $this->repository = $repository;
        $this->authorizeResource(OrderStatus::class, 'orderStatus', [
            'except' => 'index', 'show'
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

            $orderStatus = $this->repository;
            $orderStatus = $this->filter($orderStatus, $request);
            return $orderStatus->oldest('sequence')->paginate($request->paginate ?? $orderStatus->count());

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateOrderStatusRequest $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(OrderStatus $orderStatus)
    {
        return $this->repository->show($orderStatus->id);
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
    public function update(UpdateOrderStatusRequest $request, OrderStatus $orderStatus)
    {
        return $this->repository->update($request->all(), $orderStatus->getId($request));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request,  OrderStatus $orderStatus)
    {
        return  $this->repository->destroy($orderStatus->getId($request));
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

    public function deleteAll(Request $request)
    {
        return $this->repository->deleteAll($request->ids);
    }

    public function filter($orderStatus, $request)
    {
        if ($request->field && $request->sort) {
           $orderStatus = $orderStatus->orderBy($request->field, $request->sort);
        }

        if (isset($request->status)) {
            $orderStatus = $orderStatus->where('status',$request->status);
        }

        return $orderStatus;
    }
}
