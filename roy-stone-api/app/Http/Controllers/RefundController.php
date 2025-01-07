<?php

namespace App\Http\Controllers;

use App\Enums\RoleEnum;
use App\Models\Refund;
use App\Helpers\Helpers;
use Illuminate\Http\Request;
use App\Http\Requests\CreateRefundRequest;
use App\Http\Requests\UpdateRefundRequest;
use App\Repositories\Eloquents\RefundRepository;

class RefundController extends Controller
{
    public $repository;

    public function __construct(RefundRepository $repository)
    {
        $this->authorizeResource(Refund::class, 'refund',[
            'except' => 'destroy'
        ]);

        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $refunds = $this->filter($this->repository, $request);
        return $refunds->latest('created_at')->paginate($request->paginate ?? $this->repository->count());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateRefundRequest $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Refund $refund)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Refund $refund)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRefundRequest $request, Refund $refund)
    {
        return $this->repository->update($request->all(), $refund->getId($request));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Refund $refund)
    {
        //
    }

    public function filter($refunds)
    {
        $roleName = Helpers::getCurrentRoleName();
        if ($roleName == RoleEnum::VENDOR) {
            $refunds = $refunds->where('store_id',Helpers::getCurrentVendorStoreId());
        }

        if ($roleName == RoleEnum::CONSUMER) {
            $refunds = $refunds->where('consumer_id',Helpers::getCurrentUserId());
        }

        return $refunds;
    }
}
