<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\Wallet;
use App\Enums\WalletPointsDetail;
use App\Http\Traits\WalletPointsTrait;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class WalletRepository extends BaseRepository
{
    use WalletPointsTrait;

    protected $fieldSearchable = [
        'transactions.type' =>'like',
        'transactions.detail' =>'like',
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
        return Wallet::class;
    }

    public function credit($request)
    {
        try {

            $wallet = $this->creditWallet($request->consumer_id, $request->balance, WalletPointsDetail::ADMIN_CREDIT);
            if ($wallet) {
                $wallet->setRelation('transactions', $wallet->transactions()
                    ->paginate($request->paginate ?? $wallet->transactions()->count()));
            }

            return $wallet;

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function debit($request)
    {
        try {

            $wallet = $this->debitWallet($request->consumer_id, $request->balance, WalletPointsDetail::ADMIN_DEBIT);
            if ($wallet) {
                $wallet->setRelation('transactions', $wallet->transactions()
                    ->paginate($request->paginate ?? $wallet->transactions()->count()));
            }

            return $wallet;

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

}
