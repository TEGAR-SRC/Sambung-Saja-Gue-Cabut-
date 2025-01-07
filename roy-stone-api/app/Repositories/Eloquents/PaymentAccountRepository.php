<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use App\Models\PaymentAccount;
use Illuminate\Support\Facades\DB;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class PaymentAccountRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'paypal_email' => 'like',
        'bank_name' => 'like',
        'bank_holder_name' => 'like',
        'bank_account_no' => 'like',
        'swift' => 'like',
        'ifsc' => 'like',
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
        return PaymentAccount::class;
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

    public function store($request)
    {
        DB::beginTransaction();
        try {

            $paymentAccount = $this->model->updateOrCreate(
                ['user_id' => Helpers::getCurrentUserId()], $request->all()
            );

            DB::commit();
            return $paymentAccount;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function userPaymentAccount($id)
    {
        $paymentAccount = $this->model->where([['user_id', Helpers::getCurrentUserId()],['id', $id]])->first();
        if (!$paymentAccount) {
            throw new Exception ('Payment Account not exists for current user', 400);
        }

        return $paymentAccount;
    }

    public function destroy($id)
    {
        try {

            $roleName = Helpers::getCurrentRoleName();
            $paymentAccount = $this->model->findOrFail($id);

            if ($roleName == RoleEnum::VENDOR || $roleName == RoleEnum::CONSUMER) {
                $paymentAccount = $this->userPaymentAccount($id);
            }

            return $paymentAccount->destroy($id);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}
