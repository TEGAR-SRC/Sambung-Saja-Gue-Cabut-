<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use App\Enums\PaymentType;
use App\Enums\RequestEnum;
use Illuminate\Support\Arr;
use App\Models\PaymentAccount;
use App\Models\WithdrawRequest;
use App\Enums\WalletPointsDetail;
use Illuminate\Support\Facades\DB;
use App\Http\Traits\WalletPointsTrait;
use App\Events\UpdateWithdrawRequestEvent;
use App\Events\CreateWithdrawRequestEvent;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class WithdrawRequestRepository extends BaseRepository
{
    use WalletPointsTrait;

    protected $paymentAccount;

    protected $fieldSearchable = [
        'user.name' => 'like',
        'amount' => 'like',
        'message' => 'like',
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
        $this->paymentAccount = new PaymentAccount();
        return WithdrawRequest::class;
    }

    public function show($id)
    {
        try {

            $roleName = Helpers::getCurrentRoleName();
            if ($roleName == RoleEnum::VENDOR || $roleName == RoleEnum::CONSUMER) {
                return $this->userPaymentAccount($id);
            }

            return $this->model->findOrFail($id);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function verifyPaymentAccount($request, $vendorPaymentAccount)
    {
        if (!$vendorPaymentAccount) {
            throw new Exception("Please create a payment account before applying for a withdrawal.", 400);
        }

        if ($request->payment_type == PaymentType::PAYPAL && !$vendorPaymentAccount->paypal_email) {
            throw new Exception("Please add a paypal email before applying for a withdrawal.", 400);
        }

        if ($request->payment_type == PaymentType::BANK && !$vendorPaymentAccount->paypal_email) {
            if (!$vendorPaymentAccount->bank_account_no || !$vendorPaymentAccount->swift
                || !$vendorPaymentAccount->bank_name
                || !$vendorPaymentAccount->bank_holder_name) {

                throw new Exception("Please complete a bank detail before applying for a withdrawal.", 400);
            }
        }
    }

    public function store($request)
    {
        DB::beginTransaction();
        try {

            $settings = Helpers::getSettings();
            $roleName = Helpers::getCurrentRoleName();
            $vendor_id =  $request->vendor_id;

            if ($roleName == RoleEnum::VENDOR) {
                $vendor_id = Helpers::getCurrentUserId();
                $vendorPaymentAccount = Helpers::getPaymentAccount($vendor_id);
                $this->verifyPaymentAccount($request, $vendorPaymentAccount);
            }

            $vendorWallet = $this->getVendorWallet($vendor_id);
            $vendorBalance = $vendorWallet->balance;
            $minWithdrawAmount = $settings['vendor_commissions']['min_withdraw_amount'];

            if ($minWithdrawAmount > $request->amount) {
                throw new Exception("Make sure your requested amount is at least $minWithdrawAmount.", 400);
            }

            if ($vendorBalance < $request->amount) {
                throw new Exception("Your wallet balance is not enough to process this withdrawal.", 400);
            }

            $withdrawRequest =  $this->model->create([
                'amount' => $request->amount,
                'message' => $request->message,
                'status' => RequestEnum::PENDING,
                'vendor_id' => $vendor_id,
                'payment_type' => $request->payment_type,
                'vendor_wallet_id'=> $vendorWallet->id
            ]);

            $vendorWallet = $this->debitVendorWallet($vendor_id ,$request->amount, WalletPointsDetail::WITHDRAW);
            event(new CreateWithdrawRequestEvent($withdrawRequest));
            $withdrawRequest->user;

            DB::commit();
            return $withdrawRequest;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function update($request, $id)
    {
        DB::beginTransaction();
        try {

            $roleName = Helpers::getCurrentRoleName();
            $withdrawRequest = $this->model->findOrFail($id);
            if ($roleName == RoleEnum::VENDOR) {
                throw new Exception("Unauthorized for $roleName", 403);
            }

            if (isset($request['is_used'])) {
                $request = Arr::except($request, ['is_used']);
            }

            $withdrawRequest->update($request);
            DB::commit();

            $withdrawRequest = $withdrawRequest->fresh();
            if (!$withdrawRequest->is_used) {
                if ($withdrawRequest->status == RequestEnum::REJECTED) {
                    $this->creditVendorWallet($withdrawRequest->vendor_id, $withdrawRequest->amount, WalletPointsDetail::REJECTED);
                }

                $withdrawRequest->is_used = true;
                $withdrawRequest->save();
            }

            $withdrawRequest->total_pending_withdraw_requests = $this->model->where('status','pending')->count();
            event(new UpdateWithdrawRequestEvent($withdrawRequest));
            return $withdrawRequest;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function destroy($id)
    {
        try {

            $roleName = Helpers::getCurrentRoleName();
            $paymentAccount = $this->model->findOrFail($id);
            if ($roleName == RoleEnum::VENDOR) {
                $paymentAccount = $this->userPaymentAccount($id);
            }

            return $paymentAccount->destroy($id);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}
