<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\Address;
use App\Helpers\Helpers;
use Illuminate\Support\Facades\DB;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class AddressRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'title' => 'like',
        'street' => 'like',
        'state.name' => 'like',
        'country.name' => 'like'
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
        return Address::class;
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

            $address = $this->model->create([
                'title' => $request->title,
                'street' => $request->street,
                'city' => $request->city,
                'country_code' => $request->country_code,
                'phone' => (string) $request->phone,
                'pincode' => $request->pincode,
                'country_id' => $request->country_id,
                'state_id' => $request->state_id,
                'user_id' => $request->user_id ?? Helpers::getCurrentUserId()
            ]);

            $address->country;
            $address->state;

            DB::commit();
            return $address;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function update($request, $id)
    {
        DB::beginTransaction();
        try {

            if (isset($request['is_default'])) {
                $address = $this->model->query()
                    ?->where('user_id', $request['user_id'] ?? Helpers::getCurrentUserId())
                    ->update(['is_default' =>  false]);
            }

            $address = $this->model->findOrFail($id);
            $address->update($request);

            DB::commit();
            return $address;

        } catch (Exception $e){

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
}






