<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\Product;
use App\Models\Compare;
use App\Helpers\Helpers;
use Illuminate\Support\Facades\DB;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class CompareRepository extends BaseRepository
{
    protected $product;

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
       $this->product = new Product();
       return Compare::class;
    }

    public function index($request)
    {
        try {

            $product_ids = $this->model->where('consumer_id', Helpers::getCurrentUserId())->pluck('product_id');
            return $this->product->whereIn('id', $product_ids)->paginate($request->paginate ?? count($product_ids));

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function store($request)
    {
        DB::beginTransaction();
        try {

            $product = $this->product->findOrFail($request->product_id);
            $category_id = $product->categories->pluck('id')->first();
            $comparedProducts = $this->model->where('consumer_id', Helpers::getCurrentUserId())->get();

            if (!$comparedProducts->isEmpty()) {
                $comparedCategory = $comparedProducts->Where('category_id', $category_id);
                if ($comparedCategory->isEmpty()) {
                    throw new Exception('You can only compare similar products.', 400);
                }

                foreach($comparedProducts as $comparedProduct) {
                    if ($comparedProduct->product_id == $request->product_id) {
                        throw new Exception('The selected product is already present in your compare list.', 400);
                    }
                }
            }

            $compare = $this->model->create([
                'product_id' => $request->product_id,
                'category_id' =>  $category_id
            ]);

            DB::commit();
            return $compare;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function destroy($id)
    {
        try {

            return $this->model->where([
                ['product_id', $id],
                ['consumer_id', Helpers::getCurrentUserId()]
            ])->delete();

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}
