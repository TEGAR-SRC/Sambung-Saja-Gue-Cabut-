<?php

namespace App\Http\Controllers;

use Exception;
use App\Helpers\Helpers;
use Illuminate\Http\Request;
use App\Models\PaymentAccount;
use App\GraphQL\Exceptions\ExceptionHandler;
use App\Http\Requests\UpdatePaymentAccountRequest;
use App\Repositories\Eloquents\PaymentAccountRepository;

class PaymentAccountController extends Controller
{
    public $repository;

    public function __construct(PaymentAccountRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            return $this->repository->where('user_id', Helpers::getCurrentUserId())->first();

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
    public function store(UpdatePaymentAccountRequest $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(PaymentAccount $paymentAccount)
    {
        return $this->repository->show($paymentAccount->id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PaymentAccount $paymentAccount)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePaymentAccountRequest $request, PaymentAccount $paymentAccount)
    {

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, PaymentAccount $paymentAccount)
    {
       //
    }
}
