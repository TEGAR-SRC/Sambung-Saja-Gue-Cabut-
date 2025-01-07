<?php

namespace App\Repositories\Eloquents;

use Exception;
use App\Models\Order;
use App\Models\Review;
use App\Models\Product;
use App\Helpers\Helpers;
use Illuminate\Support\Facades\DB;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class ReviewRepository extends BaseRepository
{
    protected $order;
    protected $product;

    protected $fieldSearchable = [
        'rating' => 'like',
        'description' => 'like',
        'store.store_name' => 'like',
        'consumer.name' => 'like',
        'consumer.email' => 'like',
        'product.name' => 'like',
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
        $this->order = new Order();
        $this->product = new Product();
        return Review::class;
    }

    public function show($id)
    {
        try {

            return $this->model->findOrFail($id);

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function getStoreIdByProductId($id)
    {
        return $this->product->findOrFail($id)->store_id;
    }

    public function store($request)
    {
        DB::beginTransaction();
        try {

            $consumer_id = Helpers::getCurrentUserId();
            $store_id = $this->getStoreIdByProductId($request->product_id);
            $orders = Helpers::getConsumerOrderByProductId($consumer_id, $request->product_id)->get();
            foreach($orders as $order) {
                if ($order) {
                    if (Helpers::isOrderCompleted($order)) {
                        if (!Helpers::isAlreadyReviewed($consumer_id, $request->product_id)) {
                            $review = $this->model->create([
                                'product_id' => $request->product_id,
                                'consumer_id' => $consumer_id,
                                'store_id' => $store_id,
                                'review_image_id' => $request->review_image_id,
                                'rating' => $request->rating,
                                'description' => $request->description
                            ]);

                            $review->review_image;
                            $review->consumer;

                            DB::commit();
                            return $review;
                        }

                        throw new Exception('A review for this product has already been submitted.', 400);
                    }

                    throw new Exception('Review possible for completed payment and delivered order.', 400);
                }
            }

            throw new Exception('Please purchase the product before adding a review.', 400);

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function update($request, $id)
    {
        DB::beginTransaction();
        try {

            $review = $this->model->findOrFail($id);
            $review->update([
                'rating' => $request['rating'],
                'review_image_id' => $request['review_image_id'],
                'description' => $request['description'],
            ]);

            DB::commit();
            return $review;

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

    public function deleteAll($ids)
    {
        try {

            return $this->model->whereIn('id', $ids)?->delete();

        } catch (Exception $e){

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}
