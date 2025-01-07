<?php

namespace App\Repositories\Eloquents;

use Exception;
use Carbon\Carbon;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use App\Models\Variation;
use App\Models\Attribute;
use App\Enums\ProductType;
use App\Enums\StockStatus;
use App\Imports\ProductImport;
use App\Models\AttributeValue;
use App\Exports\ProductsExport;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use App\GraphQL\Exceptions\ExceptionHandler;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class ProductRepository extends BaseRepository
{
    protected $variations;

    protected $fieldSearchable = [
        'name' => 'like',
        'sku' => 'like',
        'variations.sku' => 'like',
        'stock_status' => 'like',
        'store.store_name' => 'like'
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
        $this->variations = new Variation();
        return Product::class;
    }

    public function verifySingleProduct(Product $product)
    {
        $roleName = Helpers::getCurrentRoleName();
        if ($roleName == RoleEnum::VENDOR) {
            if ($product->store_id != Helpers::getCurrentVendorStoreId()) {
                return false;
            }
        }

        return true;
    }

    public function show($id)
    {
        try {

            $product = Product::with(config('enums.product.with'))
                ->when(Helpers::isUserLogin() && Helpers::getCurrentRoleName() != RoleEnum::CONSUMER, function ($query) {
                    $query->with(['digital_files', 'license_keys', 'variations.digital_files', 'variations.license_keys']);
            })->findOrFail($id);

            $product->makeVisible(config('enums.product.visible'));
            $product->setAppends(config('enums.product.appends'));
            if ($this->verifySingleProduct($product)) {
                return $product;
            }

            throw new Exception("This action is unauthorized", 403);

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function getMinPriceVariation($request, $price)
    {
        return head(array_filter($request['variations'], function ($variation) use ($price) {
            return $variation['price'] == $price;
        }));
    }

    public function store($request)
    {
        DB::beginTransaction();
        try {

            $roleName = Helpers::getCurrentRoleName();
            if ($roleName != RoleEnum::ADMIN) {
                $settings = Helpers::getSettings();
                if ($roleName == RoleEnum::VENDOR && !Helpers::isMultiVendorEnable()) {
                    throw new Exception('The multi-vendor feature is currently deactivated.', 403);
                }

                $isAutoApprove = $settings['activation']['product_auto_approve'];
            }

            if (isset($request['variations']) && !empty($request['variations']) && $request->type == 'classified') {
                $price = min(array_column($request['variations'], 'price'));
                $minPriceVariation = $this->getMinPriceVariation($request, $price);
                $discount = $minPriceVariation['discount'];
                $sale_price = round($price - (($price * $discount) / 100), 2);
                $quantity = max(array_column($request['variations'], 'quantity'));
                $stock_status = StockStatus::OUT_OF_STOCK;

                if ($quantity > 0) {
                    $stock_status = StockStatus::IN_STOCK;
                }
            }

            if (isset($request->quantity)) {
                $stock_status = StockStatus::OUT_OF_STOCK;
                if ($request->quantity > 0) {
                    $stock_status = StockStatus::IN_STOCK;
                }
            }

            if (isset($request->discount)) {
                $mrpPrice = $request->price ?? $price;
                $sale_price = round($mrpPrice - (($mrpPrice * $request->discount) / 100), 2);
            }

            if (isset($request->product_thumbnail_id)) {
                if ($request->watermark) {
                    if ($request->watermark_position && $request->watermark_image_id) {
                        $watermark_id = $request->watermark_image_id;
                        $file_id = $request->product_thumbnail_id;
                        $position = $request->watermark_position;
                        $request->product_thumbnail_id = Helpers::createWatermarkImage($watermark_id, $file_id, $position);
                    }
                }
            }

            if (isset($request->license_keys)) {
                if (!empty($request->license_keys)) {
                    $quantity = count($request->license_keys);
                }
            }

            $product = $this->model->create([
                'name' => $request->name,
                'short_description' => $request->short_description,
                'description' => $request->description,
                'type' => $request->type,
                'unit' => $request->unit,
                'quantity' => $quantity ?? $request->quantity,
                'weight' => $request->weight,
                'price' => $price ?? $request->price,
                'sale_price' => $sale_price ?? $request->price,
                'discount' => $discount ?? $request->discount,
                'sku' => $request->sku,
                'is_external' => $request->is_external,
                'external_url' => $request->external_url,
                'external_button_text' => $request->external_button_text,
                'is_featured' => $request->is_featured,
                'shipping_days' => $request->shipping_days,
                'is_free_shipping' => $request->is_free_shipping,
                'is_sale_enable' => $request->is_sale_enable,
                'sale_starts_at' => $request->sale_starts_at,
                'sale_expired_at' => $request->sale_expired_at,
                'is_trending' => $request->is_trending,
                'stock_status' => $stock_status ?? $request->stock_status,
                'meta_title' => $request->meta_title,
                'is_return' => $request->is_return,
                'meta_description' => $request->meta_description,
                'is_random_related_products' => $request->is_random_related_products,
                'product_meta_image_id' => $request->product_meta_image_id,
                'product_thumbnail_id'  => $request->product_thumbnail_id,
                'size_chart_image_id' => $request->size_chart_image_id,
                'estimated_delivery_text' => $request->estimated_delivery_text,
                'return_policy_text' => $request->return_policy_text,
                'safe_checkout' => $request->safe_checkout,
                'secure_checkout' => $request->secure_checkout,
                'social_share' => $request->social_share,
                'encourage_order' => $request->encourage_order,
                'encourage_view' => $request->encourage_view,
                'tax_id' => $request->tax_id,
                'status' => $request->status,
                'is_approved' => $isAutoApprove ?? true,
                'store_id' => $request->store_id,
                'is_licensable' => $request->is_licensable,
                'preview_url' =>  $request->preview_url,
                'brand_id' => $request->brand_id,
                'product_type' => $request->product_type,
                'watermark' => $request->watermark,
                'watermark_position' => $request->watermark_position,
                'watermark_image_id' => $request->watermark_image_id,
                'wholesale_price_type' => $request->wholesale_price_type,
                'separator' => $request->separator,
                'preview_type' => $request->preview_type,
                'is_licensekey_auto' => $request->is_licensekey_auto,
                'preview_audio_file_id' => $request->preview_audio_file_id,
                'preview_video_file_id' => $request->preview_video_file_id
            ]);

            $this->relationProductModels($request, $product);
            if (isset($request['variations']) && !empty($request['variations']) && $request->type == 'classified') {
                foreach ($request['variations'] as $index => $variation) {
                    $this->createProductVariation($product, $variation);
                    if ($index == 0) {
                        $product->digital_files()->attach($variation['digital_file_ids']);
                    }
                }

                $product->variations;
            }

            DB::commit();
            return $product;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function update($request, $id)
    {
        DB::beginTransaction();
        try {

            if (isset($request['variations']) && !empty($request['variations']) && $request['type'] == 'classified') {
                $request['price'] = min(array_column($request['variations'], 'price'));
                $minPriceVariation = $this->getMinPriceVariation($request,  $request['price']);
                $request['discount'] = $minPriceVariation['discount'];
                $request['quantity'] = max(array_column($request['variations'], 'quantity'));
            }

            if (isset($request['quantity'])) {
                $request['stock_status'] = StockStatus::OUT_OF_STOCK;
                if ($request['quantity'] > 0) {
                    $request['stock_status'] = StockStatus::IN_STOCK;
                }
            }

            if (isset($request['discount'])) {
                $request['sale_price'] = round($request['price'] - (($request['price'] * $request['discount']) / 100), 2);
            }

            if (isset($request['license_keys'])) {
                if (!empty($request['license_keys'])) {
                    $request['quantity'] = count($request['license_keys']);
                }
            }

            $product = $this->model->findOrFail($id);
            $product->update($request);

            if (isset($request['product_thumbnail_id'])) {
                if ($request['watermark']) {
                    if (isset($request['watermark_position']) && isset($request['watermark_image_id'])) {
                        $watermark_id = $request['watermark_image_id'];
                        $file_id = $request['product_thumbnail_id'];
                        $position = $request['watermark_position'];
                        $product->product_thumbnail_id = Helpers::createWatermarkImage($watermark_id, $file_id, $position);
                        $product->save();
                    }

                    $product->watermark_image()->associate($request['watermark_image_id']);
                    $product->watermark_image;
                }

                $product->product_thumbnail()->associate($request['product_thumbnail_id']);
                $product->product_thumbnail;
            }

            if (isset($request['product_meta_image_id'])) {
                $product->product_meta_image()->associate($request['product_meta_image_id']);
                $product->product_meta_image;
            }

            if (isset($request['product_galleries_id'])) {
                $gallery_ids = null;
                if ($request['watermark']) {
                    if (isset($request['watermark_position']) && isset($request['watermark_image_id'])) {
                        foreach ($request['product_galleries_id'] as $gallery_id) {
                            $watermark_id = $request['watermark_image_id'];
                            $position = $request['watermark_position'];
                            $gallery_ids[] = Helpers::createWatermarkImage($watermark_id, $gallery_id, $position);
                        }
                    }
                }

                $product->product_galleries()->sync([]);
                $product->product_galleries()->sync($gallery_ids ?? $request['product_galleries_id'], false);
                $product->product_galleries;
            }

            if (isset($request['categories'])) {
                $product->categories()->sync($request['categories']);
                $product->categories;
            }

            if (isset($request['tags'])) {
                $product->tags()->sync($request['tags']);
                $product->tags;
            }

            if (isset($request['attributes_ids'])) {
                $product->attributes()->sync($request['attributes_ids']);
                $product->attributes;
            }

            if (isset($request['related_products'])) {
                $product->similar_products()->sync($request['related_products']);
                $product->similar_products;
            }

            if (isset($request['cross_sell_products'])) {
                $product->cross_products()->sync($request['cross_sell_products']);
                $product->cross_products;
            }

            if ($request['is_random_related_products']) {
                $rand_category_id = $request['categories'][array_rand($request['categories'])];
                $request['related_products'] = Helpers::getRelatedProductId($product, $rand_category_id, $product->id);
                $product->similar_products()->sync($request['related_products']);
            }

            if ($request['wholesale_prices']) {
                $product = $this->updateOrCreateWholesaleProduct($product, $request['wholesale_prices']);
                $product->wholesales;
            }

            if ($request['product_type'] == ProductType::DIGITAL &&
                isset($request['digital_file_ids']) && !isset($request['variation'])) {
                $product->digital_files()->sync($request['digital_file_ids']);
            }

            if ($request['type'] == 'simple' && $request['is_licensable'] &&
                !$request['is_licensekey_auto'] && $request['license_keys']) {
                $product = $this->updateOrCreateProductLicenseKeys($product, $request['license_keys']);
            }

            if (isset($request['variations']) && !empty($request['variations']) && $request['type'] == 'classified') {
                foreach ($request['variations'] as $index => $variation) {
                    $variation['sale_price'] = $variation['price'];
                    if (isset($variation['discount'])) {
                        $variation['sale_price'] = round($variation['price'] - (($variation['price'] * $variation['discount']) / 100), 2);
                    }

                    if (isset($variation['quantity'])) {
                        $variation['stock_status'] = StockStatus::OUT_OF_STOCK;
                        if ($variation['quantity'] > 0) {
                            $variation['stock_status'] = StockStatus::IN_STOCK;
                        }
                    }

                    if (empty($variation['id']) && isset($variation['name'])) {
                        $variationData = $product->variations()->create($variation);
                        $variationsIds[] = $variationData->id;
                        $variationData->attribute_values()->attach($variation['attribute_values']);
                    } else if (isset($variation['id']) && isset($variation['attribute_values'])) {
                        $variationData = $this->variations->findOrFail($variation['id']);
                        $variationsIds[] = $variation['id'];
                        $variationData->update($variation);
                        $variationData?->attribute_values()->sync($variation['attribute_values']);
                    }

                    if (isset($variation['variation_galleries_id'])) {
                        $variationData->variation_galleries()->sync([]);
                        $variationData->variation_galleries()->sync($variation['variation_galleries_id'], false);
                        $variationData->variation_galleries;
                    }

                    if ($request['product_type'] == ProductType::DIGITAL && isset($variation['digital_file_ids'])) {
                        $variationData->digital_files()->sync($variation['digital_file_ids'], [
                            'product_id' => $product?->id
                        ]);

                        if ($index == 0) {
                            $product->digital_files()->sync([]);
                            $product->digital_files()->sync($variation['digital_file_ids']);
                        }
                    }

                    if ($variation['is_licensable'] && !$variation['is_licensekey_auto'] && $variation['license_keys']) {
                        $this->updateOrCreateProductLicenseKeys($product, $variation['license_keys'], $variationData?->id);
                    }
                }
                $product->wholesales()?->delete();
                $product->variations()->whereNotIn('id', $variationsIds)->delete();
                $product->variations;
            }

            if ($request['type'] == 'simple' && isset($request['variations'])) {
                $product->variations()?->delete();
            }

            $product->tax;
            DB::commit();

            $product = $product->fresh();
            return $product;

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

    public function status($id, $status)
    {
        try {

            $product = $this->model->with(config('enums.product.with'))
                ->findOrFail($id)
                ->makeVisible(config('enums.product.visible'))
                ->setAppends(config('enums.product.appends'));

            $product->update(['status' => $status]);
            return $product;

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function approve($id, $approve)
    {
        try {

            $product = $this->model->with(config('enums.product.with'))
                ->findOrFail($id)
                ->makeVisible(config('enums.product.visible'))
                ->setAppends(config('enums.product.appends'));

            $product->update(['is_approved' => $approve]);
            $product->total_in_approved_products = $this->model->where('is_approved', false)->count();

            return $product;

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

    public function import()
    {
        DB::beginTransaction();
        try {

            $productImport = new ProductImport();
            Excel::import($productImport, request()->file('products'));
            DB::commit();

            return $productImport->getImportedProducts();

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function getProductsExportUrl()
    {
        try {

            return route('products.export');

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function export()
    {
        try {

            return Excel::download(new ProductsExport, 'products.csv');

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function getReplicateProductName($name)
    {
        $i = 1;
        do {

            $name = $name . str_repeat(' (COPY)', $i++);

        } while ($this->model->where('name', $name)->exists());

        return $name;
    }

    public function getVariationSKU($sku)
    {
        $i = 0;
        do {

            $sku = $sku . str_repeat(' (COPY)', $i++);

        } while ($this->model->variations()->where("sku", $sku)->exists());

        return $sku;
    }

    public function getUniqueLicenseKey($license_key)
    {
        $i = 0;
        do {

            $license_key = $license_key . str_repeat(' (COPY)', $i++);

        } while ($this->model->license_keys()->where("license_key", $license_key)->exists());

        return $license_key;
    }

    public function relationProductModels($request, $product)
    {
        $related_product_ids = null;
        if (!is_null($request->related_products) && $request->is_random_related_products) {
            if (isset($request->categories) && is_array($request->categories)) {
                $rand_category_id = $request->categories[array_rand($request->categories)];
                $related_product_ids = Helpers::getRelatedProductId($this->model, $rand_category_id);
                $product->similar_products()->attach($related_product_ids);
                $product->related_products;
            }
        }

        if (isset($request->product_galleries_id)) {
            $gallery_ids = null;
            if ($request->watermark) {
                if (isset($request->watermark_position) && isset($request->watermark_image_id)) {
                    foreach ($request->product_galleries_id as $gallery_id) {
                        $watermark_id = $request->watermark_image_id;
                        $position = $request->watermark_position;
                        $gallery_ids[] = Helpers::createWatermarkImage($watermark_id, $gallery_id, $position);
                    }
                }
            }
            $product->product_galleries()->attach($gallery_ids ?? $request->product_galleries_id);
            $product->product_galleries;
        }

        if (isset($request->categories)) {
            $product->categories()->attach($request->categories);
            $product->categories;
        }

        if (isset($request->tags)) {
            $product->tags()->attach($request->tags);
            $product->tags;
        }

        if (isset($request->attributes_ids) || isset($request->attributes)) {
            $product->attributes()->attach($request->attributes_ids ?? $request->attributes);
            $product->attributes;
        }

        if (!is_null($request->related_products) && !$request->is_random_related_products) {
            $product->similar_products()->attach($request->related_products ?? $related_product_ids);
            $product->related_products;
        }

        if (isset($request->cross_sell_products)) {
            $product->cross_products()->attach($request->cross_sell_products);
            $product->cross_products;
        }

        if ($request->wholesale_prices) {
            $product = $this->updateOrCreateWholesaleProduct($product, $request->wholesale_prices);
            $product->wholesales;
        }

        if (
            $request->product_type == ProductType::DIGITAL &&
            isset($request->digital_file_ids) && !$request->variation
        ) {
            $product->digital_files()->attach($request->digital_file_ids);
        }

        if (
            $request->type == 'simple' && $request->is_licensable &&
            !$request->is_licensekey_auto && $request->license_keys
        ) {
            $product = $this->updateOrCreateProductLicenseKeys($product, $request->license_keys);
        }
    }

    public function updateOrCreateProductLicenseKeys($product, $license_keys, $variation_id = null)
    {
        $licenseKeyIds = [];
        foreach ($license_keys as $license_key) {
            $licenseKey = $product->license_keys()->updateOrCreate(['license_key' => $license_key], [
                'license_key' => $this->getUniqueLicenseKey($license_key),
                'variation_id' => $variation_id
            ]);

            $licenseKeyIds[] = $licenseKey?->id;
        }

        $product->license_keys()->whereNotIn('id', $licenseKeyIds)?->delete();
        return $product;
    }

    public function updateOrCreateWholesaleProduct($product, $wholesalePrices)
    {
        $wholesaleIds = [];
        foreach ($wholesalePrices as $wholesalePrice) {
            $wholesale = $product->wholesales()->updateOrCreate(['id' => $wholesalePrice['id'] ?? null], [
                'min_qty' => $wholesalePrice['min_qty'],
                'max_qty' => $wholesalePrice['max_qty'],
                'value' =>  $wholesalePrice['value'],
            ]);

            $wholesaleIds[] = $wholesale?->id;
        }

        $product->wholesales()->whereNotIn('id', $wholesaleIds)?->delete();
        return $product;
    }

    public function createProductVariation($product, $variation)
    {
        if (isset($variation['attribute_values'])) {
            $variation['sale_price'] = $variation['price'];
            if (isset($variation['discount'])) {
                $variation['sale_price'] = round($variation['price'] - (($variation['price'] * $variation['discount']) / 100), 2);
            }

            if (isset($variation['quantity'])) {
                $variation['stock_status'] = StockStatus::OUT_OF_STOCK;
                if ($variation['quantity'] > 0) {
                    $variation['stock_status'] = StockStatus::IN_STOCK;
                }
            }

            if (isset($variation['license_keys'])) {
                if (!empty($variation['license_keys'])) {
                    $variation['quantity'] = count($variation['license_keys']);
                }
            }

            $variationData = $product->variations()->create([
                'name' => $variation['name'],
                'price' => $variation['price'],
                'quantity' => $variation['quantity'],
                'sku' =>  $this->getVariationSKU($variation['sku']),
                'sale_price' => $variation['sale_price'],
                'discount' => $variation['discount'] ?? null,
                'stock_status' => $variation['stock_status'],
                'variation_image_id' => $variation['variation_image_id'] ?? null,
                'separator' => $variation['separator'],
                'is_licensable' => $variation['is_licensable'],
                'is_licensekey_auto' => $variation['is_licensekey_auto'],
                'status' => $variation['status'],
                'product_id' => $product['id']
            ]);

            $variationData->attribute_values()->attach($variation['attribute_values']);
            if ($product['product_type'] == ProductType::DIGITAL && (isset($variation['digital_file_ids']) || $variation?->digital_files) ) {
                $variationData->digital_files()->attach(($variation['digital_file_ids'] ?? $variation?->digital_files) , [
                    'product_id' => $product['id']
                ]);
            }

            if ($variation['is_licensable'] && !$variation['is_licensekey_auto'] && $variation['license_keys']) {
                $this->updateOrCreateProductLicenseKeys($product, $variation['license_keys'], $variationData?->id);
            }

            if (isset($variation['variation_galleries_id'])) {
                $variationData->variation_galleries()->attach($variation['variation_galleries_id']);
                $variationData->variation_galleries;
            }

            $product?->wholesales()?->delete();
        }
    }

    public function replicate($ids)
    {
        DB::beginTransaction();
        try {

            foreach ($ids as $id) {
                $product = $this->model->findOrFail($id);
                $clone = $product->replicate(['orders_count', 'reviews_count']);
                $clone->name = $this->getReplicateProductName($clone->name);
                $clone->created_at = Carbon::now();
                $clone->save();

                $this->relationProductModels($product, $clone);
                if (isset($product->variations) && $product->type == 'classified') {
                    foreach ($product->variations as $index => $variation) {
                        $this->createProductVariation($clone, $variation);
                        if ($index == 0) {
                            $product->digital_files()->attach($variation['digital_file_ids']);
                        }
                    }

                    $clone->variations;
                }

                $products[] = $clone->fresh();
            }

            DB::commit();
            return $products;

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function getProductBySlug($slug)
    {
        try {

            return $this->model->where('slug', $slug)
                ->with(config('enums.product.with'))
                ->firstOrFail()
                ->setAppends(config('enums.product.appends'))
                ->makeVisible(config('enums.product.visible'));

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function getMinifyProduct($request)
    {
        try {

            $query = $this->model->without(config('enums.product.without'))
                ->with(['categories:id,name,slug'])
                ->select([
                    'id',
                    'name',
                    'slug',
                    'product_thumbnail_id'
                ]);

            if ($request->category_id) {
                $query->when($request->category_id, function ($q) use ($request) {
                    $q->whereHas('categories', function ($categories) use ($request) {
                        $categories->where('category_id', $request->category_id);
                    });
                });
            }

            $products = $query->get();
            $products->makeHidden(config('enums.product.withoutAppends'));

            return $products;

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function collection($request)
    {
        try {

            $brands = $this->getBrandsCollections($request);
            $attributes = $this->getAttributesCollections($request);
            $categories = $this->getCategoriesCollections($request);

            return [
                'brands' => $brands,
                'attributes' => $attributes,
                'categories' => $categories
            ];

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function getBrandsCollections($request)
    {
        $doesntHaveBrandIds = Brand::doesntHave('products')->pluck('id');
        $brands = Brand::whereNull('deleted_at')->whereNotIn('id', $doesntHaveBrandIds);

        if ($request?->brand) {
            $slugs = explode(',', $request->brand);
            $brands = $brands->whereIn('slug', $slugs);
        }

        return $brands->get();
    }

    public function getCategoriesCollections($request)
    {
        $doesntHaveCategoryIds = Category::doesntHave('products')->pluck('id');
        $categories = Category::whereNull('deleted_at')->whereNotIn('id', $doesntHaveCategoryIds);

        if ($request?->category) {
            $slugs = explode(',', $request->category);
            $categories = $categories->whereIn('slug', $slugs);
        }

        return $categories->get();
    }

    public function getAttributesCollections($request)
    {
        $doesntHaveAttributeIds = Attribute::doesntHave('products')->pluck('id');
        $attributeIds = Attribute::whereNull('deleted_at')->whereNotIn('id', $doesntHaveAttributeIds)->pluck('id');

        $doesntHaveAttributeValueIds = AttributeValue::doesntHave('variations')->pluck('id');
        $attributeValueIds = AttributeValue::whereNull('deleted_at')->whereNotIn('id', $doesntHaveAttributeValueIds)->pluck('id');

        $attributes = Attribute::withWhereHas('attribute_values', function ($query) use ($attributeValueIds) {
            $query->whereIn('id', $attributeValueIds);
        })->whereIn('id', $attributeIds);

        if ($request?->attribute) {
            $slugs = explode(',', $request->attribute);
            $attributes = $attributes->whereIn('slug', $slugs);
        }

        return $attributes->get();
    }
}
