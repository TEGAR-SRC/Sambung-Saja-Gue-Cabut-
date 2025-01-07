<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\OrderStatus;
use Illuminate\Support\Facades\DB;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class OrderStatusRepository extends BaseRepository
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
       return OrderStatus::class;
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

            $orderStatus =  $this->model->create([
                'name' => $request->name,
                'sequence' => $request->sequence,
                'status' => $request->status,
            ]);

            DB::commit();
            return $orderStatus;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function update($request, $id)
    {
        DB::beginTransaction();
        try {

            $orderStatus = $this->model->findOrFail($id);
            if ($orderStatus->system_reserve) {
                throw new Exception('The selected order status is system reserved and cannot be changed.',403);
            }

            $orderStatus->update($request);

            DB::commit();
            return $orderStatus;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function destroy($id)
    {
        try {

            $orderStatus = $this->model->findOrFail($id);
            if ($orderStatus->system_reserve) {
                throw new Exception('The selected order status is system reserved and cannot be deleted.',403);
            }

            return $orderStatus->destroy($id);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function status($id, $status)
    {
        try {

            $orderStatus = $this->model->findOrFail($id);
            $orderStatus->whereNot('system_reserve', true)->update(['status' => $status]);

            return $orderStatus;

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function deleteAll($ids)
    {
        try {

            return $this->model->whereNot('system_reserve', true)->whereIn('id', $ids)->delete();

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}
