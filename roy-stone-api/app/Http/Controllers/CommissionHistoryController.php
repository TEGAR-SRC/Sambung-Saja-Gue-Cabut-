<?php

namespace App\Http\Controllers;

use Exception;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use Illuminate\Http\Request;
use App\Models\CommissionHistory;
use App\GraphQL\Exceptions\ExceptionHandler;
use App\Repositories\Eloquents\CommissionHistoryRepository;

class CommissionHistoryController extends Controller
{
    public $repository;

    public function __construct(CommissionHistoryRepository $repository)
    {
        $this->authorizeResource(CommissionHistory::class, 'commissionHistory');
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {

            $commissionHistories = $this->filter($this->repository, $request);
            return $commissionHistories->latest('created_at')->paginate($request->paginate ?? $commissionHistories->count());

        }  catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
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
    public function store()
    {
        return $this->repository->store();
    }

    /**
     * Display the specified resource.
     */
    public function show(CommissionHistory $commissionHistory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CommissionHistory $commissionHistory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CommissionHistory $commissionHistory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CommissionHistory $commissionHistory)
    {
        //
    }

    public function filter($commissionHistories, $request)
    {
        $roleName = Helpers::getCurrentRoleName();
        if ($roleName == RoleEnum::VENDOR) {
            $commissionHistories = $commissionHistories->where('store_id', Helpers::getCurrentVendorStoreId());
        }

        if ($request->field && $request->sort) {
            $commissionHistories = $commissionHistories->orderBy($request->field, $request->sort);
        }

        if ($request->start_date && $request->end_date) {
            $commissionHistories = $commissionHistories->whereBetween('created_at',[$request->start_date, $request->end_date]);
        }

        return $commissionHistories;
    }
}
