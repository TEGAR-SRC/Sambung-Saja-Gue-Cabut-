<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\User;
use App\Models\Notice;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Builder;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class NoticeRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'title' => 'like',
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
        return Notice::class;
    }

    public function show($id)
    {
        try {

            return  $this->model->findOrFail($id);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function getAllVendorIds()
    {
        $vendorIds = User::role(RoleEnum::VENDOR)?->whereNull('deleted_at')->pluck('id')?->toArray();
        return $this->getActiveStoreVendorIds($vendorIds);
    }

    public function getActiveStoreVendorIds($vendorIds)
    {
        $Ids = [];
        foreach($vendorIds as $vendor_id) {
            $store_id = Helpers::getVendorIdByStoreId($vendor_id);
            if ($store_id) {
                $Ids[] = $vendor_id;
            }
        }
        return $Ids;
    }

    public function store($request)
    {
        DB::beginTransaction();
        try {

            $notice = $this->model->create([
                'title' => $request->title,
                'description'=> $request->description,
                'priority' => $request->priority,
            ]);

            $vendorIds = $this->getAllVendorIds();
            $notice->reader()->attach($vendorIds);

            DB::commit();
            return $notice;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function update($request, $id)
    {
        DB::beginTransaction();
        try {

            $notice = $this->model->findOrFail($id);
            $notice->update($request);

            $notice->reader()->sync([]);
            $notice->reader()->sync($this->getAllVendorIds());

            DB::commit();

            $notice = $notice->fresh();
            return $notice;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function destroy($id)
    {
        try {

            return $this->model->findOrFail($id)->destroy($id);

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function deleteAll($ids)
    {
        try {

            return $this->model->whereIn('id', $ids)->delete();

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function markAsRead($id)
    {
        DB::beginTransaction();
        try {

            $notice = $this->model->findOrFail($id);
            $user_id = Helpers::getCurrentUserId();
            $notice->reader()->updateExistingPivot($user_id, ['is_read' => true]);

            DB::commit();
            return $notice;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function recentNotice()
    {
        try {

            $user_id = Helpers::getCurrentUserId();
            return $this->model->whereHas('reader',  function (Builder $vendors) use ($user_id) {
                $vendors->where('user_id', $user_id);
            })->latest('updated_at')?->first();

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}
