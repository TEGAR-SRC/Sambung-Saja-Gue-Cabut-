<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\VendorWallet;
use App\Enums\WalletPointsDetail;
use App\Http\Traits\WalletPointsTrait;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class VendorWalletRepository extends BaseRepository
{
    use WalletPointsTrait;

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
        return VendorWallet::class;
    }

    public function credit($request)
    {
        try {

            $vendorWallet = $this->creditVendorWallet($request->vendor_id, $request->balance, WalletPointsDetail::ADMIN_CREDIT);
            if ($vendorWallet) {
                $vendorWallet->setRelation('transactions', $vendorWallet->transactions()
                    ->paginate($request->paginate ?? $vendorWallet->transactions()->count()));
            }

            return $vendorWallet;

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function debit($request)
    {
        try {

            $vendorWallet = $this->debitVendorWallet($request->vendor_id, $request->balance, WalletPointsDetail::ADMIN_DEBIT);
            if ($vendorWallet) {
                $vendorWallet->setRelation('transactions', $vendorWallet->transactions()
                    ->paginate($request->paginate ?? $vendorWallet->transactions()->count()));
            }

            return $vendorWallet;

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

}
