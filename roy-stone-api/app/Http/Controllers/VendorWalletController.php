<?php

namespace App\Http\Controllers;

use Exception;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use App\Http\Traits\WalletPointsTrait;
use App\Http\Requests\WalletPointsRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use App\Http\Requests\CreditDebitVendorWalletRequest;
use App\Repositories\Eloquents\VendorWalletRepository;

class VendorWalletController extends Controller
{
    use WalletPointsTrait;

    protected $repository;

    public function __construct(VendorWalletRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a Vendor Wallet Transactions.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(WalletPointsRequest $request)
    {
        try {

            return $this->filter($this->repository, $request);

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    /**
     * Credit Balance from Vendor Wallet.
     *
     * @return \Illuminate\Http\Response
     */
    public function credit(CreditDebitVendorWalletRequest $request)
    {
        return $this->repository->credit($request);
    }


    /**
     * Debit Balance from Vendor Wallet.
     *
     * @return \Illuminate\Http\Response
     */
    public function debit(CreditDebitVendorWalletRequest $request)
    {
        return $this->repository->debit($request);
    }

    public function filter($vendorWallet, $request)
    {
        $roleName = Helpers::getCurrentRoleName();
        $vendor = $request->vendor_id;
        if ($roleName == RoleEnum::VENDOR) {
            $vendor = Helpers::getCurrentUserId();
        }

        $vendorWallet = $this->repository->where('vendor_id',$vendor)->first();
        if (!$vendorWallet) {
            $vendorWallet = $this->getVendorWallet($vendor);
            $vendorWallet = $vendorWallet->fresh();
        }

        $transactions = $vendorWallet->transactions()->where('type', 'LIKE', "%{$request->search}%");
        if ($request->start_date && $request->end_date) {
            $transactions->whereBetween('created_at', [$request->start_date, $request->end_date]);
        }

        $paginate = $request->paginate ?? $vendorWallet->transactions()->count();
        $vendorWallet->setRelation('transactions', $transactions->paginate($paginate));

        return $vendorWallet;
    }
}
