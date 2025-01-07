<?php

namespace App\Repositories\Eloquents;

use App\Enums\RoleEnum;
use Exception;
use App\Models\Coupon;
use Illuminate\Support\Facades\DB;
use App\GraphQL\Exceptions\ExceptionHandler;
use App\Helpers\Helpers;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class CouponRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'title' => 'like',
        'code' => 'like',
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
        return Coupon::class;
    }

    public function verifySingleCoupon(Coupon $coupon)
    {
        $roleName = Helpers::getCurrentRoleName();
        if ($roleName == RoleEnum::VENDOR) {
            if ($coupon->created_by_id != Helpers::getCurrentUserId()) {
                return false;
            }
        }

        return true;
    }

    public function show($id)
    {
        try {

            $coupon = $this->model->with(['products','exclude_products'])->findOrFail($id);
            if ($this->verifySingleCoupon($coupon)) {
                return $coupon;
            }

            throw new Exception("This action is unauthorized", 403);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function store($request)
    {
        DB::beginTransaction();
        try {

            $coupon =  $this->model->create([
                'title' => $request->title,
                'description' => $request->description,
                'code' => $request->code,
                'type' => $request->type,
                'amount'=> $request->amount,
                'min_spend' => $request->min_spend,
                'is_unlimited' => $request->is_unlimited,
                'usage_per_coupon' => $request->usage_per_coupon,
                'usage_per_customer' => $request->usage_per_customer,
                'status' => $request->status,
                'is_expired' => $request->is_expired,
                'is_apply_all' => $request->is_apply_all,
                'is_first_order'=> $request->is_first_order,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ]);

            if (isset($request['products'])){
                $coupon->products()->attach($request['products']);
                $coupon->products;
            }

            if (isset($request['exclude_products'])){
                $coupon->exclude_products()->attach($request['exclude_products']);
                $coupon->exclude_products;
            }

            DB::commit();
            return $coupon;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function update($request, $id)
    {
        DB::beginTransaction();
        try {

            $coupon = $this->model->findOrFail($id);
            $coupon->update($request);

            if (!$request['is_apply_all']) {
                $coupon->exclude_products()->sync([]);
                if (isset($request['products'])){
                    $coupon->products()->sync($request['products']);
                    $coupon->products;
                }
            }

            if ($request['is_apply_all']) {
                $coupon->products()->sync([]);
                if (isset($request['exclude_products'])){
                    $coupon->exclude_products()->sync($request['exclude_products']);
                    $coupon->exclude_products;
                }
            }

            DB::commit();
            $coupon = $coupon->fresh();

            return $coupon;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function destroy($id)
    {
        try {

            return $this->model->findOrFail($id)->destroy($id);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function status($id, $status)
    {
        try {

            $coupon = $this->model->findOrFail($id);
            $coupon->update(['status' => $status]);

            return $coupon;

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function deleteAll($ids)
    {
        try {

            return $this->model->whereIn('id', $ids)->delete();

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}
