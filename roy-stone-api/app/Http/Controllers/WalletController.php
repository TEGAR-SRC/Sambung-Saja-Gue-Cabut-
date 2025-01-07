<?php

namespace App\Http\Controllers;

use Exception;
use App\Helpers\Helpers;
use App\Http\Traits\WalletPointsTrait;
use App\Http\Requests\WalletPointsRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use App\Http\Requests\CreditDebitWalletRequest;
use App\Repositories\Eloquents\WalletRepository;

class WalletController extends Controller
{
    use WalletPointsTrait;

    public $repository;

    public function __construct(WalletRepository $repository)
    {
        return $this->repository = $repository;
    }

    /**
     * Display a Consumer Wallet Transactions.
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
     * Credit Balance from Consumer Wallet.
     *
     * @return \Illuminate\Http\Response
     */
    public function credit(CreditDebitWalletRequest $request)
    {
        return $this->repository->credit($request);
    }

    /**
     * Debit Balance from Consumer Wallet.
     *
     * @return \Illuminate\Http\Response
     */
    public function debit(CreditDebitWalletRequest $request)
    {
        return $this->repository->debit($request);
    }

    public function filter($wallet, $request)
    {
        $consumer_id = $request->consumer_id ?? Helpers::getCurrentUserId();
        $wallet = $wallet->where('consumer_id',$consumer_id)->first();

        if (!$wallet) {
            $wallet = $this->getWallet($request->consumer_id ?? Helpers::getCurrentUserId());
            $wallet = $wallet->fresh();
        }

        $transactions = $wallet->transactions()->where('type', 'LIKE', "%{$request->search}%");
        if ($request->start_date && $request->end_date) {
            $transactions->whereBetween('created_at', [$request->start_date, $request->end_date]);
        }

        $paginate = $request->paginate ?? $wallet->transactions()->count();
        $wallet->setRelation('transactions', $transactions->paginate($paginate));

        return $wallet;
    }
}
