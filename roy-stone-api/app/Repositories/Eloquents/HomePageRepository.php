<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\HomePage;
use Illuminate\Support\Facades\DB;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;

class HomePageRepository extends BaseRepository
{

    function model()
    {
       return HomePage::class;
    }

    public function update($request, $id)
    {
        DB::beginTransaction();
        try {

            $homePage = $this->model->findOrFail($id);
            $homePage->update($request);

            DB::commit();
            return $homePage;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}
