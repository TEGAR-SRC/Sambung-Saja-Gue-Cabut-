<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\User;
use App\Models\Store;
use App\Models\Badge;
use App\Models\Refund;
use App\Models\Product;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use App\Enums\BadgeEnum;
use App\Enums\RequestEnum;
use App\Models\WithdrawRequest;
use App\Models\QuestionAndAnswer;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;

class BadgeRepository extends BaseRepository
{
    protected $user;
    protected $stores;
    protected $refunds;
    protected $products;
    protected $questionAnswers;
    protected $withdrawRequests;

    function model()
    {
        $this->user = new User();
        $this->stores = new Store();
        $this->refunds = new Refund();
        $this->products = new Product();
        $this->withdrawRequests = new WithdrawRequest();
        $this->questionAnswers = new QuestionAndAnswer();
        return Badge::class;
    }

    public function getProduct($roleName)
    {
        if ($roleName == RoleEnum::VENDOR) {
           return $this->products->where('store_id',Helpers::getCurrentVendorStoreId());
        }

        return $this->products->whereNull('deleted_at')->get();
    }

    public function countProduct($user, $roleName)
    {
        $products = $this->getProduct($roleName);
        if ($this->isAuthorized($user, 'product.edit') ) {
            return [
                "total_products" => $products->count(),
                "total_approved_products" => $products->where('is_approved', true)->count(),
                "total_in_approved_products" => $products->where('is_approved', false)->count(),
            ];
        }
    }

    public function getStore($roleName)
    {
        if ($roleName == RoleEnum::VENDOR) {
            return $this->stores->findOrFail(Helpers::getCurrentVendorStoreId());
        }

        return $this->stores->whereNull('deleted_at')->get();
    }

    public function countStore($user, $roleName)
    {
        $stores = $this->getStore($roleName);
        if ($this->isAuthorized($user, 'store.edit')) {
            return [
                "total_stores" => $stores->count(),
                "total_approved_stores" => $stores->where('is_approved',true)->count(),
                "total_in_approved_stores" => $stores->where('is_approved',false)->count(),
            ];
        }
    }

    public function getRefund($roleName)
    {
        if ($roleName == RoleEnum::VENDOR) {
            return $this->refunds->where('store_id', Helpers::getCurrentVendorStoreId());
        }

        return $this->refunds->whereNull('deleted_at')->get();
    }

    public function countRefund($user, $roleName)
    {
        $refunds = $this->getRefund($roleName);
        if ($this->isAuthorized($user, 'refund.action')) {
            return [
                "total_refunds" => $refunds->count(),
                "total_pending_refunds" => $refunds->where('status', RequestEnum::PENDING)->count(),
                "total_approved_refunds" => $refunds->where('status', RequestEnum::APPROVED)->count(),
                "total_rejected_refunds" =>  $refunds->where('status', RequestEnum::REJECTED)->count(),
            ];
        }
    }

    public function getWithdrawRequest($roleName)
    {
        if ($roleName == RoleEnum::VENDOR) {
            return $this->withdrawRequests->where('vendor_id', Helpers::getCurrentUserId());
        }

        return $this->withdrawRequests->whereNull('deleted_at')->get();
    }

    public function countWithdrawRequest($user, $roleName)
    {
        $withdrawRequests = $this->getWithdrawRequest($roleName);
        if ($this->isAuthorized($user, 'withdraw_request.action')) {
            return [
                "total_withdraw_requests" => $withdrawRequests->count(),
                "total_pending_withdraw_requests" => $withdrawRequests->where('status', RequestEnum::PENDING)->count(),
                "total_approved_withdraw_requests" => $withdrawRequests->where('status', RequestEnum::APPROVED)->count(),
                "total_rejected_withdraw_requests" => $withdrawRequests->where('status', RequestEnum::REJECTED)->count(),
            ];
        }
    }

    public function countQuestionAnswer($user)
    {
        if ($this->isAuthorized($user, 'questions_and_answers.edit')) {
            return [
                "total_question_and_answers" => $this->questionAnswers->count(),
                "total_pending_question_and_answers" => $this->questionAnswers->whereNull('deleted_at')->whereNull('answer')->count(),
            ];
        }
    }

    public function isAuthorized($user, $permission)
    {
        $roleName = Helpers::getCurrentRoleName();
        if ($user->can($permission) && ($roleName != RoleEnum::VENDOR)) {
            return true;
        }

        return false;
    }

    public function countDefault($user, $roleName)
    {
        return [
            'product' => $this->countProduct($user, $roleName),
            'store' => $this->countStore($user, $roleName),
            'refund' => $this->countRefund($user, $roleName),
            'question_and_answer' => $this->countQuestionAnswer($user),
            'withdraw_request' => $this->countWithdrawRequest($user, $roleName)
        ];
    }

    public function index($request)
    {
        try {

            $roleName = Helpers::getCurrentRoleName();
            $userId = Helpers::getCurrentUserId();
            $user = $this->user->findOrFail($userId);

            switch($request->type) {
                case BadgeEnum::PRODUCT:
                    $badge[BadgeEnum::PRODUCT] = $this->countProduct($user, $roleName);
                    break;

                case BadgeEnum::STORE:
                    $badge[BadgeEnum::STORE] = $this->countStore($user, $roleName);
                    break;

                case BadgeEnum::REFUND:
                    $badge[BadgeEnum::REFUND] = $this->countRefund($user,$roleName);
                    break;

                case BadgeEnum::WITHDRAW_REQUEST:
                    $badge[BadgeEnum::WITHDRAW_REQUEST] = $this->countWithdrawRequest($user, $roleName);
                    break;

                case BadgeEnum::QUESTION_AND_ANSWER:
                    $badge[BadgeEnum::QUESTION_AND_ANSWER] = $this->countWithdrawRequest($user, $roleName);
                    break;

                default:
                    $badge = $this->countDefault($user, $roleName);
            }

            return $badge;

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}
