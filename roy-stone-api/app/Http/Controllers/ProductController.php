<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Product;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use App\Enums\OrderEnum;
use App\Enums\SortByEnum;
use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Requests\CreateProductRequest;
use App\GraphQL\Exceptions\ExceptionHandler;
use App\Repositories\Eloquents\ProductRepository;

class ProductController extends Controller
{
    public $repository;

    public function __construct(ProductRepository $repository)
    {
        $this->authorizeResource(Product::class,'product', [
            'except' => [ 'index', 'show' ],
        ]);

        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $product = $this->filter($this->repository, $request);
            $products = $product->latest('created_at')->paginate($request->paginate);
            return ProductResource::collection($products);

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateProductRequest $request)
    {
        return $this->repository->store($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return $this->repository->show($product->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        return $this->repository->update($request->all(), $product->getId($request));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Product $product)
    {
        return $this->repository->destroy($product->getId($request));
    }

    /**
     * Update Status the specified resource from storage.
     *
     * @param  int  $id
     * @param int $status
     * @return \Illuminate\Http\Response
     */
    public function status(Request $request)
    {
        return $this->repository->status($request->id, $request->status);
    }

    public function approve(Request $request)
    {
        return $this->repository->approve($request->id, $request->status);
    }

    public function deleteAll(Request $request)
    {
        return $this->repository->deleteAll($request->ids);
    }

    public function import()
    {
        return $this->repository->import();
    }

    public function getProductsExportUrl(Request $request)
    {
        return $this->repository->getProductsExportUrl($request);
    }

    public function export()
    {
        return $this->repository->export();
    }

    public function replicate(Request $request)
    {
        return $this->repository->replicate($request->ids);
    }

    public function getProductBySlug($slug)
    {
        return $this->repository->getProductBySlug($slug);
    }

    public function getMinifyProduct(Request $request)
    {
        return $this->repository->getMinifyProduct($request);
    }

    public function getProductByRating($ratings, $product)
    {
        return $product->where(function($query) use ($ratings) {
            foreach ($ratings as $rating) {
                $query->orWhere(function($query) use ($rating) {
                    $query->whereHas('reviews', function($query) use ($rating) {
                        $query->select('product_id')
                            ->groupBy('product_id')
                            ->havingRaw('AVG(rating) >= ?', [$rating])
                            ->havingRaw('AVG(rating) < ?', [$rating + 1]);
                    });
                });
            }
        });
    }

    public function collection(Request $request)
    {
        return $this->repository->collection($request);
    }

    public function filter($product, $request)
    {
        if (Helpers::isUserLogin()) {
            $roleName = Helpers::getCurrentRoleName();
            if ($roleName != RoleEnum::CONSUMER) {
                $product = $this->repository->with(['digital_files','license_keys', 'variations.digital_files', 'variations.license_keys']);
            }

            if ($roleName == RoleEnum::VENDOR) {
                $product = $product->where('store_id', Helpers::getCurrentVendorStoreId());
            }
        }

        if ($request->top_selling && $request->filter_by) {
            $product = $product->whereHas('orders',function (Builder $order) {
                $order->whereHas('order_status',function (Builder $order_status) {
                    $order_status->where('name', OrderEnum::DELIVERED);
                });
            });
        }

        if ($request->rating) {
            $ratings = explode(',', $request->rating);
            $product = $this->getProductByRating($ratings, $product);
        }

        if (isset($request->trending)) {
            $product = $product->where('is_trending',$request->trending);
        }

        if (isset($request->min) && isset($request->max)) {
            $product = $product->whereBetween('sale_price', [$request->min, $request->max]);
        }

        if ($request->category) {
            $slugs = explode(',', $request->category);
            $product = $product->whereHas('categories', function (Builder $categories) use($slugs) {
                $categories->WhereIn('slug', $slugs);
            });
        }

        if ($request->tag) {
            $slugs = explode(',', $request->tag);
            $product = $product->whereHas('tags', function (Builder $tags) use ($slugs) {
                $tags->WhereIn('slug', $slugs);
            });
        }

        if ($request->brand) {
            $slugs = explode(',', $request->brand);
            $product = $product->whereHas('brand', function (Builder $brands) use ($slugs) {
                $brands->where('slug', $slugs);
            });
        }

        if ($request->field && $request->sort) {
            $product = $product->orderBy($request->field, $request->sort);
        }

        if (isset($request->status)) {
            $product = $product->where('status',$request->status);
        }

        if ($request->is_digital) {
            $product = $product->where('is_digital', $request->is_digital);
        }
        

        if ($request->sortBy) {
            if (isset($request->field) && ($request->sortBy == SortByEnum::ASC || $request->sortBy == SortByEnum::DESC)) $product->orderBy($request->field, $request->sortBy);
            if ($request->sortBy == SortByEnum::ATOZ) $product->orderBy('name');
            if ($request->sortBy == SortByEnum::ZTOA) $product->orderBy('name', SortByEnum::DESC);
            if ($request->sortBy == SortByEnum::HIGH_TO_LOW) $product->orderBy('sale_price', SortByEnum::DESC);
            if ($request->sortBy == SortByEnum::LOW_TO_HIGH) $product->orderBy('sale_price');
            if ($request->sortBy == SortByEnum::DISCOUNT_HIGH_TO_LOW) $product->orderBy('discount', SortByEnum::DESC);
        }

        if ($request->store_id) {
            $product = $product->where('store_id', $request->store_id);
        }

        if ($request->brand_id) {
            $product = $product->where('brand_id', $request->brand_id);
        }

        if ($request->store_slug) {
            $slug = $request->store_slug;
            $product = $product->whereHas('store', function (Builder $stores) use ($slug) {
                $stores->where('slug', $slug);
            });
        }

        if ($request->category_id) {
            $category_id = $request->category_id;
            $product = $product->whereRelation('categories', function($categories) use ($category_id) {
                $categories->where('category_id', $category_id);
            });
        }

        if ($request->tag_id) {
            $tag_id = $request->tag_id;
            $product = $product->whereRelation('tags', function($tags) use ($tag_id){
                $tags->where('tag_id', $tag_id);
            });
        }

        if ($request->attribute) {
            $slugs = explode(',', $request->attribute);
            $product = $product->whereHas('variations', function (Builder $attributes) use($slugs) {
                $attributes->whereHas('attribute_values', function (Builder $attributeValues) use ($slugs) {
                    $attributeValues->WhereIn('slug', $slugs);
                });
            });
        }

        if ($request->price) {
            $ranges = explode(',', $request->price);
            foreach($ranges as $range) {
                $values = explode('-', $range);
                if (count($values) > 1) {
                    $min = head($values);
                    $max = last($values);
                    $product = $product->whereBetween('sale_price', [$min, $max]);

                } else {
                    $max = head($values);
                    $product = $product->where('sale_price', '>=', $max);
                }
            }
        }

        if ($request->store_ids) {
            $store_ids = explode(',', $request->store_ids);
            $product = $product->whereIn('store_id', $store_ids);
        }

        if ($request->category_ids) {
            $category_ids = explode(',', $request->category_ids);
            $product = $product->whereRelation('categories', function($categories) use($category_ids) {
                $categories->WhereIn('category_id', $category_ids);
            });
        }

        if ($request->tag_ids) {
            $tag_ids = explode(',', $request->tag_ids);
            $product = $product->whereRelation('tags', function($tags) use ($tag_ids) {
                $tags->WhereIn('tag_id', $tag_ids);
            });
        }

        if ($request->brand_ids) {
            $brand_ids = explode(',', $request->brand_ids);
            $product = $product->whereRelation('brand', function($brands) use ($brand_ids) {
                $brands->WhereIn('brand_id', $brand_ids);
            });
        }

        if ($request->product_type) {
            $product = $product->where('product_type', $request->product_type);
        }

        if ($request->ids) {
            $ids = explode(',', $request->ids);
            $with_union_products = (boolean) $request->with_union_products;
            if ($with_union_products) {
                $product_ids = Helpers::getProductsByIds($ids)?->pluck('id')?->toArray();
                $limit = $request->paginate - count($product_ids);
                $with_union_product_ids = $product
                    ->whereNull('deleted_at')
                    ->whereNotIn('id', $ids)
                    ->inRandomOrder()
                    ->limit($limit)
                    ?->pluck('id')?->toArray();

                $ids = array_map('intval', $ids);
                $ids = array_merge($ids, $with_union_product_ids);
            }

            $product = Helpers::getProductsByIds($ids);
        }
        
        if (isset($request->is_approved)) {
            $product = $product->where('is_approved', $request->is_approved);
        }
        
        if ($request->sale_starts_at && $request->sale_expired_at) {
            $orders = $product->where('sale_starts_at','>=' , $request->sale_starts_at)->where('sale_expired_at','<=',$request->sale_expired_at);
        }

        return $product->with([
            'store:id,store_name,slug',
            'product_thumbnail:id,name,disk,file_name,mime_type',
            'product_galleries:id,name,disk,file_name,mime_type',
            'attributes'
        ]);
    }
}
