<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Coupon;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use Illuminate\Http\Request;
use App\Http\Requests\CreateCouponRequest;
use App\Http\Requests\UpdateCouponRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use App\Repositories\Eloquents\CouponRepository;

class CouponController extends Controller
{
    public $repository;

    public function __construct(CouponRepository $repository)
    {
        $this->authorizeResource(Coupon::class, 'coupon', [
            'except' => [ 'index', 'show' ],
        ]);

        return $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $coupons = $this->filter($this->repository, $request);
            return $coupons->latest('created_at')->paginate($request->paginate ?? $coupons->count());

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
       //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateCouponRequest $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Coupon $coupon)
    {
        return $this->repository->show($coupon->id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCouponRequest $request, Coupon $coupon)
    {
        return $this->repository->update($request->all(), $coupon->getId($request));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Coupon $coupon)
    {
        return $this->repository->destroy($coupon->getId($request));
    }

    /**
     * Update Status the specified resource from storage.
     *
     * @param  int  $id
     * @param int $status
     * @return \Illuminate\Http\Response
     */
    public function status(Request $request)
    {
        return $this->repository->status($request->id, $request->status);
    }

    public function deleteAll(Request $request)
    {
        return $this->repository->deleteAll($request->ids);
    }

    public function filter($coupons, $request)
    {
        if (Helpers::isUserLogin()) {
            $roleName = Helpers::getCurrentRoleName();
            if ($roleName == RoleEnum::VENDOR) {
                $coupons = $coupons->where('created_by_id', Helpers::getCurrentUserId());
            }
        }

        if ($request->ids) {
            $ids = explode(',',$request->ids);
            $coupons = $coupons->whereIn('id',$ids);
        }

        if ($request->field && $request->sort) {
            $coupons = $coupons->orderBy($request->field, $request->sort);
        }

        if (isset($request->status)) {
            $coupons = $coupons->where('status',$request->status);
        }

        return $coupons;
    }
}
