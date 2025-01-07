<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\AppSetting;
use Illuminate\Support\Facades\DB;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;

class AppSettingRepository extends BaseRepository
{
    function model()
    {
       return AppSetting::class;
    }

    public function update($request, $id)
    {
        DB::beginTransaction();
        try {

            $appSettings = $this->model->first();
            $appSettings->update($request);

            DB::commit();
            return $appSettings;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}
