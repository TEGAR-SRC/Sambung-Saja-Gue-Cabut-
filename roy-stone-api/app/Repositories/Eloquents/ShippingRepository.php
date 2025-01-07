<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\Shipping;
use Illuminate\Support\Facades\DB;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;

class ShippingRepository extends BaseRepository
{
    function model()
    {
        return Shipping::class;
    }

   public function show($id)
   {
        try {

            return $this->model->with(['country','shipping_rules'])->findOrFail($id);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

   public function store($request)
   {
        DB::beginTransaction();
        try {

            $shippings = [];
            foreach($request->country_id as $country) {
                $shipping = $this->model->create([
                    'country_id' => $country,
                    'status' => $request->status,
                ]);
                $shipping->country;
                $shippings[] = $shipping;
            }

            DB::commit();
            return $shippings;

        } catch (Exception $e){

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
   }

   public function update($request, $id)
   {
        DB::beginTransaction();
        try {

            $shipping = $this->model->findOrFail($id);
            $shipping->update($request);

            DB::commit();
            $shipping->country;

            return $shipping;

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

            $shipping = $this->model->findOrFail($id);
            $shipping->update(['status' => $status]);

            return $shipping;

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}
