<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\Product;
use App\Helpers\Helpers;
use App\Models\Wishlist;
use Illuminate\Support\Facades\DB;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class WishlistRepository extends BaseRepository
{
    protected $products;

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
       $this->products = new Product();
       return Wishlist::class;
    }

    public function index($request)
    {
        try {

            $product_ids = $this->model->where('consumer_id', Helpers::getCurrentUserId())->pluck('product_id');
            return $this->products->whereIn('id', $product_ids)->paginate($request->paginate ?? count($product_ids));

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function store($request)
    {
        DB::beginTransaction();
        try {

            $wishlist = $this->getWishlistData($request->all());
            if (!$wishlist) {
                $wishlist =  $this->model->create([
                    'product_id' => $request->product_id,
                ]);
            }

            DB::commit();
            return $this->products->where('id', $wishlist->product_id)->first();

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function getWishlistData($product)
    {
        return $this->model->where([
            ['product_id', $product['product_id']],
            ['consumer_id', Helpers::getCurrentUserId()]
        ])->first();
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
