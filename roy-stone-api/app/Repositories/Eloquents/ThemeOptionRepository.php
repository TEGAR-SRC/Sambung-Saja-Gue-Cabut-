<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\ThemeOption;
use Illuminate\Support\Facades\DB;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;

class ThemeOptionRepository extends BaseRepository
{
    function model()
    {
       return ThemeOption::class;
    }

    public function update($request, $id)
    {
        DB::beginTransaction();
        try {

            $themeOptions = $this->model->first();
            $themeOptions->update($request);

            DB::commit();
            return $themeOptions;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}
