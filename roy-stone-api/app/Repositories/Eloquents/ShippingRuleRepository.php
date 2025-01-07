<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\ShippingRule;
use Illuminate\Support\Facades\DB;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class ShippingRuleRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'name' => 'like',
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
        return ShippingRule::class;
    }

   public function show($id)
   {
        try {

            return $this->model->findOrFail($id);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
   }

   public function store($request)
   {
        DB::beginTransaction();
        try {

            $shippingRule = $this->model->create([
                'name' => $request->name,
                'shipping_id' => $request->shipping_id,
                'rule_type' => $request->rule_type,
                'min' => $request->min,
                'max' => $request->max,
                'shipping_type' => $request->shipping_type,
                'amount' => $request->amount,
                'status' => $request->status,
            ]);

            DB::commit();
            return $shippingRule;

        } catch (Exception $e){

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
   }

   public function update($request, $id)
   {
        DB::beginTransaction();
        try {

            $shippingRule = $this->model->findOrFail($id);
            $shippingRule->update($request);

            DB::commit();
            return $shippingRule;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

   public function destroy($id)
   {
        try {

            return $this->model->findOrFail($id)->delete($id);

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function status($id, $status)
    {
        try {

            $shippingRule = $this->model->findOrFail($id);
            $shippingRule->update(['status' => $status]);

            return $shippingRule;

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}
