<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\Currency;
use Illuminate\Support\Facades\DB;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class CurrencyRepository extends BaseRepository
{
    protected $fieldSearchable = [
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
       return Currency::class;
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

            $currency =  $this->model->create([
                'code' => $request->code,
                'symbol' => $request->symbol,
                'no_of_decimal' => $request->no_of_decimal,
                'exchange_rate' => $request->exchange_rate,
                'symbol_position' => $request->symbol_position,
                'thousands_separator' => $request->thousands_separator,
                'decimal_separator' => $request->decimal_separator,
                'status' => $request->status,
            ]);

            DB::commit();
            return $currency;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function update($request, $id)
    {
        DB::beginTransaction();
        try {

            $currency = $this->model->findOrFail($id);
            if ($currency->system_reserve) {
                throw new Exception('The selected currency is system reserved and cannot be changed.', 400);
            }

            $currency->update($request);

            DB::commit();
            return $currency;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }


    public function getTotalItems()
    {
        return $this->model->whereNull('deleted_at')->count();
    }

    public function destroy($id)
    {
        try {

            $totalItems = $this->getTotalItems();
            if ($totalItems <= 1) {
                throw new Exception('Cannot delete the last currency.', 403);
            }

            $currency = $this->model->findOrFail($id);
            if ($currency->system_reserve) {
                throw new Exception('This Currency Cannot be delete. It is System reserved.', 403);
            }

            return $currency->destroy($id);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function status($id, $status)
    {
        try {

            $currency = $this->model->findOrFail($id);
            $currency->update(['status' => $status]);

            return $currency;

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function deleteAll($ids)
    {
        try {

            $totalItems = $this->getTotalItems();
            $idsCount = count($ids);
            if ($idsCount >= $totalItems) {
                throw new Exception('Cannot delete the all currencies.', 403);
            }

            return $this->model->whereNot('system_reserve', true)->whereIn('id', $ids)->delete();

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}
