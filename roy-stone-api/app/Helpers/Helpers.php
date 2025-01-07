<?php

namespace App\Helpers;

use Carbon\Carbon;
use App\Models\Cart;
use App\Models\User;
use App\Models\Order;
use App\Models\Theme;
use App\Models\Store;
use App\Models\Coupon;
use App\Models\Notice;
use App\Models\Review;
use App\Models\Product;
use App\Models\Address;
use App\Models\Setting;
use App\Enums\RoleEnum;
use App\Models\Currency;
use App\Enums\OrderEnum;
use App\Models\Category;
use App\Models\Variation;
use App\Enums\SortByEnum;
use App\Enums\AmountEnum;
use App\Models\LicenseKey;
use App\Enums\StockStatus;
use App\Models\Attachment;
use App\Enums\ProductType;
use App\Models\OrderStatus;
use App\Enums\PositionEnum;
use App\Enums\PaymentStatus;
use App\Enums\PaymentMethod;
use App\Models\PaymentAccount;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image;
use Illuminate\Database\Eloquent\Builder;

class Helpers
{
  // Get Current User Values
  public static function isUserLogin()
  {
    return Auth::guard('api')->check();
  }

  public static function getCurrentUser()
  {
    if (self::isUserLogin()) {
      return Auth::guard('api')->user();
    }
  }

  public static function getCurrentUserId()
  {
    return self::getCurrentUser()?->id;
  }

  public static function getCurrentRoleName()
  {
    if (self::isUserLogin()) {
      return Auth::guard('api')->user()?->tokens->first()->role_type;
    }
  }

  public static function getCurrentVendorStoreId()
  {
    if (self::isUserLogin()) {
      return Auth::guard('api')->user()?->store?->id;
    }
  }

  // Attachments
  public static function createAttachment()
  {
    $attachment = new Attachment();
    $attachment->save();
    return $attachment;
  }

  public static function addMedia($model, $media, $collectionName)
  {
    return $model->addMedia($media)->toMediaCollection($collectionName);
  }

  public static function storeImage($request, $model, $collectionName)
  {
    foreach ($request as $media) {
      $attachments[] = self::addMedia($model, $media, $collectionName);
    }

    $model->delete($model->id);
    return $attachments;
  }

  public static function createWatermarkImage($watermark_id, $file_id, $position = PositionEnum::BOTTOM_RIGHT)
  {
    $watermark_image = Attachment::where('id', $watermark_id)?->whereNull('deleted_at')?->first();
    $file = Attachment::where('id', $file_id)?->whereNull('deleted_at')?->first();

    if ($watermark_image && $file) {
      $image = Image::make($file->getPath());
      $watermarkImg = Image::make($watermark_image?->getPath())->resize(100, null, function ($constraint) {
        $constraint->aspectRatio();
      })->opacity(50);

      $image->insert($watermarkImg, $position, 10, 10);
      $image = $image->save(public_path($file?->file_name));

      $attachments = self::createAttachment();
      $media = $attachments->copyMedia($image->basePath())->toMediaCollection('attachment');
      $attachments->delete($attachments?->id);
      if (File::exists($image?->basePath())) {
        File::delete($image?->basePath());
      }

      return $media?->id;
    }
    return $file_id;
  }

  public static function deleteImage($model)
  {
    return $model->delete($model->id);
  }

  // Get query base data
  public static function getSettings()
  {
    return Setting::value('values');
  }

  public static function getAdmin()
  {
    return User::whereHas('roles', function ($q) {
      $q->where('name', RoleEnum::ADMIN);
    })?->first();
  }

  public static function getAttachmentId($file_name)
  {
    return Attachment::where('file_name', $file_name)->pluck('id')->first();
  }

  public static function getRoleNameByUserId($user_id)
  {
    return User::find($user_id)?->role?->name;
  }

  public static function getCoupon($data)
  {
    return Coupon::where([['code', 'LIKE', '%' . $data . '%'], ['status', true]])
      ->orWhere('id', 'LIKE', '%' . $data . '%')
      ->with(['products', 'exclude_products'])
      ->first();
  }

  public static function getDefaultCurrencySymbol()
  {
    $settings = self::getSettings();
    return self::getCurrencySymbolById($settings['general']['default_currency_id']);
  }

  public static function getCurrencySymbolById($id)
  {
    return Currency::where('id', $id)->pluck('symbol')->first();
  }

  public static function getActiveTheme()
  {
    return Theme::where('status', true)->pluck('slug');
  }

  public static function getStoreById($store_id)
  {
    return Store::where('id', $store_id)->whereNull('deleted_at')->first();
  }

  public static function getVendorIdByStoreId($store_id)
  {
    return self::getStoreById($store_id)?->vendor_id;
  }

  public static function getStoreIdByProductId($product_id)
  {
    return Product::where('id', $product_id)->value('store_id');
  }

  public static function getAddressById($address_id)
  {
    return Address::where('id', $address_id)->first();
  }

  public static function getProductByStoreSlug($store_slug)
  {
    return Product::whereHas('store', function (Builder $stores) use ($store_slug) {
      $stores->where('slug', $store_slug);
    });
  }

  public static function getRelatedProductId($model, $category_id, $product_id = null)
  {
    return $model->whereRelation(
      'categories',
      function ($categories) use ($category_id) {
        $categories->Where('category_id', $category_id);
      }
    )->whereNot('id', $product_id)->inRandomOrder()->limit(6)->pluck('id')->toArray();
  }

  public static function getDefaultCurrencyCode()
  {
    $settings = Helpers::getSettings();
    $currency_id = $settings['general']['default_currency_id'];
    return Currency::whereId($currency_id)->pluck('code')->first();
  }

  public static function getCurrencyExchangeRate($currencyCode)
  {
    return Currency::where('code', $currencyCode)?->pluck('exchange_rate')?->first();
  }

  public static function currencyConvert($currencySymbol, $amount)
  {
    $exchangeRate = self::getCurrencyExchangeRate($currencySymbol) ?? 1;
    $price = $amount * $exchangeRate;
    return self::roundNumber($price);
  }

  public static function getConsumerOrderByProductId($consumer_id, $product_id)
  {
    return Order::where('consumer_id', $consumer_id)->whereHas('products', function ($products) use ($product_id) {
      $products->where('product_id', $product_id);
    });
  }

  public static function getStoreWiseLastThreeProductImages($store_id)
  {
    return Product::where('store_id', $store_id)->whereNull('deleted_at')
      ->latest()->limit(3)->with('product_thumbnail')->get()
      ->pluck('product_thumbnail.original_url')
      ->toArray();
  }

  public static function getProductsByIds($ids)
  {
    return Product::whereNull('deleted_at')?->whereIn('id', $ids);
  }

  public static function roundNumber($numb)
  {
    return number_format($numb, 2, '.', '');
  }

  public static function formatDecimal($value)
  {
    return floor($value * 100) / 100;
  }

  public static function removeCart(Order $order)
  {
    if (self::isUserLogin()) {
      $productIds = $order->products->pluck('pivot.product_id')->toArray();
      $variationIds = $order->products->pluck('pivot.variation_id')->toArray();

      $query = Cart::where('consumer_id', self::getCurrentUserId());
      if (!empty($productIds)) {
        $query->whereIn('product_id', $productIds);
      }

      if (!empty($variationIds)) {
        $query->orWhereIn('variation_id', $variationIds);
      }

      $query->delete();
    }
  }

  public static function getProductPrice($product_id)
  {
    return Product::where('id', $product_id)->first(['price', 'discount']);
  }

  public static function getVariationPrice($variation_id)
  {
    return Variation::where('id', $variation_id)->first(['price', 'discount']);
  }

  public static function getSalePrice($product)
  {
    $productPrices = self::getPrice($product);
    return $productPrices->price - (($productPrices->price * $productPrices->discount) / 100);
  }

  public static function isWholesaleProduct($product_id)
  {
    return Product::where('id', $product_id)->whereNull('deleted_at')?->first()->wholesales;
  }

  public static function getWholesalePriceTypeById($product_id)
  {
    return Product::where('id', $product_id)->whereNull('deleted_at')?->value('wholesale_price_type');
  }

  public static function isOptimumWholesaleQty($quantity, $wholesale)
  {
    return (max(min($quantity, $wholesale->max_qty), $wholesale->min_qty) == $quantity);
  }

  public static function getSubTotal($product)
  {
    $price = self::getSalePrice($product);
    if (!$product['variation_id']) {
      $wholesales = self::isWholesaleProduct($product['product_id']);
      if ($wholesales) {
        $productWholesaleType = self::getWholesalePriceTypeById($product['product_id']);
        foreach ($wholesales as $wholesale) {
          if (self::isOptimumWholesaleQty($product['quantity'], $wholesale)) {
            switch ($productWholesaleType) {
              case AmountEnum::FIXED:
                $price = $wholesale->value;
                break;
              case AmountEnum::PERCENTAGE:
                $price -= ($price * ($wholesale->value / 100));
                break;
            }
          }
        }
      }
    }

    return $price * $product['quantity'];
  }

  public static function getTotalAmount($products)
  {
    $subtotal = [];
    foreach ($products as $product) {
      $subtotal[] = self::getSubTotal($product);
    }

    return array_sum($subtotal);
  }

  public static function getPrice($product)
  {
    if (isset($product['variation_id'])) {
      return self::getVariationPrice($product['variation_id']);
    }

    return self::getProductPrice($product['product_id']);
  }

  public static function pointIsEnable()
  {
    $settings = self::getSettings();
    return $settings['activation']['point_enable'];
  }

  public static function walletIsEnable()
  {
    $settings = self::getSettings();
    return $settings['activation']['wallet_enable'];
  }

  public static function isMultiVendorEnable()
  {
    $settings = self::getSettings();
    return $settings['activation']['multivendor'];
  }

  public static function couponIsEnable()
  {
    $settings = self::getSettings();
    return $settings['activation']['coupon_enable'];
  }

  public static function getCategoryCommissionRate($categories)
  {
    return Category::whereIn('id', $categories)->pluck('commission_rate');
  }

  public static function getOrderStatusIdByName($name)
  {
    return OrderStatus::where('name', $name)->value('id');
  }

  public static function getPaymentAccount($user_id)
  {
    return PaymentAccount::where('user_id', $user_id)->first();
  }

  public static function getConsumerById($consumer_id)
  {
    return User::whereNull('deleted_at')->where('id', $consumer_id)->first();
  }

  public static function getTopSellingProducts($product)
  {
    $orders_count = $product->withCount(['orders'])->get()->sum('orders_count');
    $product = $product->orderByDesc('orders_count');
    if (!$orders_count) {
      $product = (new Product)->newQuery();
      $product->whereRaw('1 = 0');
      return $product;
    }

    return $product;
  }

  public static function getTopVendors($store)
  {
    $store = $store->orderByDesc('orders_count');
    $orders_count = $store->withCount(['orders'])->get()->sum('orders_count');
    if (!$orders_count) {
      $store = (new Store)->newQuery();
      $store->whereRaw('1 = 0');
      return $store;
    }

    return $store;
  }

  public static function getVariationStock($variation_id)
  {
    return Variation::where([['id', $variation_id], ['stock_status', 'in_stock'], ['quantity', '>', 0], ['status', true]])->first();
  }

  public static function getProductStock($product_id)
  {
    return Product::where([['id', $product_id], ['stock_status', 'in_stock'], ['quantity', '>', 0], ['status', true]])->first();
  }

  public static function getCountUsedPerConsumer($consumer, $coupon)
  {
    return Order::where([['consumer_id', $consumer], ['coupon_id', $coupon]])->count();
  }

  public static function getOrderByOrderNumber($order_number)
  {
    return Order::with(config('enums.order.with'))->where('order_number', $order_number)->first();
  }

  public static function decrementProductQuantity($product_id, $quantity)
  {
    $product = Product::findOrFail($product_id);
    $product->decrement('quantity', $quantity);
    $product = $product->fresh();
    if ($product->quantity <= 0) {
      $product->quantity = 0;
      self::updateProductStockStatus($product_id, StockStatus::OUT_OF_STOCK);
    }
  }

  public static function updateProductStockStatus($id, $stock_status)
  {
    return Product::where('id', $id)->update(['stock_status' => $stock_status]);
  }

  public static function incrementProductQuantity($product_id, $quantity)
  {
    $product = Product::findOrFail($product_id);
    if ($product->stock_status == StockStatus::OUT_OF_STOCK) {
      self::updateProductStockStatus($product_id, StockStatus::IN_STOCK);
    }
    $product->increment('quantity', $quantity);
  }

  public static function updateVariationStockStatus($id, $stock_status)
  {
    return Variation::findOrFail($id)->update(['stock_status' => $stock_status]);
  }

  public static function decrementVariationQuantity($variation_id, $quantity)
  {
    $variation = Variation::findOrFail($variation_id);
    $variation->decrement('quantity', $quantity);
    $variation = $variation->fresh();
    if ($variation->quantity <= 0) {
      $variation->quantity = 0;
      self::updateVariationStockStatus($variation_id, StockStatus::OUT_OF_STOCK);
    }
  }

  public static function incrementVariationQuantity($variation_id, $quantity)
  {
    $variation = Variation::findOrFail($variation_id);
    if ($variation->stock_status == StockStatus::OUT_OF_STOCK) {
      self::updateVariationStockStatus($variation_id, StockStatus::IN_STOCK);
    }
    $variation->increment('quantity', $quantity);
  }

  public static function isAlreadyReviewed($consumer_id, $product_id)
  {
    return Review::where([
      ['consumer_id', $consumer_id],
      ['product_id', $product_id]
    ])->first();
  }

  public static function countOrderAmount($product_id, $filter_by)
  {
    return (float) self::getCompletedOrderByProductId($product_id, $filter_by)->get()->sum('total');
  }

  public static function getStoreOrderCount($store_id, $filter_by)
  {
    return (int) self::getCompleteOrderByStoreId($store_id, $filter_by)?->get()->count();
  }

  public static function countStoreOrderAmount($store_id, $filter_by)
  {
    return (int) self::getCompleteOrderByStoreId($store_id, $filter_by)?->sum('total');
  }

  public static function getProductCountByStoreId($store_id, $filter_by)
  {
    return self::getProductByStoreId($store_id, $filter_by)?->count();
  }

  public static function getProductByStoreId($store_id, $filter_by)
  {
    $product = Product::where('store_id', $store_id)->whereNull('deleted_at');
    return self::getFilterBy($product, $filter_by);
  }

  public static function getCompleteOrderByStoreId($store_id, $filter_by)
  {
    $order = Order::where('store_id', $store_id)->where('payment_status', PaymentStatus::COMPLETED);
    return self::getFilterBy($order, $filter_by);
  }

  public static function getFilterBy($model, $filter_by)
  {
    switch ($filter_by) {
      case SortByEnum::TODAY:
        $model = $model->where('created_at', Carbon::now());
        break;

      case SortByEnum::LAST_WEEK:
        $startWeek = Carbon::now()->subWeek()->startOfWeek();
        $endWeek = Carbon::now()->subWeek()->endOfWeek();
        $model = $model->whereBetween('created_at', [$startWeek, $endWeek]);
        break;

      case SortByEnum::LAST_MONTH:
        $model = $model->whereMonth('created_at', Carbon::now()->subMonth()->month);
        break;

      case SortByEnum::THIS_YEAR:
        $model = $model->whereYear('created_at', Carbon::now()->year);
        break;
    }

    return $model;
  }

  public static function getCompletedOrderByProductId($product_id, $filter_by)
  {
    $order = Order::whereHas('products', function ($query) use ($product_id) {
      $query->where('product_id', $product_id);
    })->whereNull('deleted_at')->where('payment_status', PaymentStatus::COMPLETED);

    return self::getFilterBy($order, $filter_by);
  }

  public static function getOrderCount($product_id, $filter_by)
  {
    return self::getCompletedOrderByProductId($product_id, $filter_by)?->count();
  }

  public static function isOrderCompleted($order)
  {
    if (
      $order->payment_status == PaymentStatus::COMPLETED &&
      $order->order_status->name == OrderEnum::DELIVERED
    ) {
      return true;
    }

    return false;
  }

  public static function user_review($consumer_id, $product_id)
  {
    return Review::where('consumer_id', $consumer_id)->where('product_id', $product_id)->whereNull('deleted_at')->first();
  }

  public static function canReview($consumer_id, $product_id)
  {
    $orders = self::getConsumerOrderByProductId($consumer_id, $product_id)?->get();
    if ($orders) {
      foreach($orders as $order) {
        if (self::isOrderCompleted($order)) {
          return true;
        }
      }
    }

    return false;
  }

  public static function getReviewRatings($product_id)
  {
    $review = Review::where('product_id', $product_id)->get();
    return [
      $review->where('rating', 1)->count(),
      $review->where('rating', 2)->count(),
      $review->where('rating', 3)->count(),
      $review->where('rating', 4)->count(),
      $review->where('rating', 5)->count(),
    ];
  }

  public static function updateProductStock(Order $order)
  {
    if ($order?->payment_status == PaymentStatus::COMPLETED || $order?->payment_method == PaymentMethod::COD ) {
      if ($order?->order_status->name == OrderEnum::CANCELLED) {
        foreach ($order->products as $product) {
          $product = $product->pivot;
          if (isset($product->variation_id)) {
            self::incrementVariationQuantity($product->variation_id, $product->quantity);
          } else {
            self::incrementProductQuantity($product->product_id, $product->quantity);
          }
        }

      } else {
        foreach ($order->products as $product) {
          $product = $product->pivot;
          if (isset($product->variation_id)) {
            self::decrementVariationQuantity($product->variation_id, $product->quantity);
          } else {
            self::decrementProductQuantity($product->product_id, $product->quantity);
          }
        }
      }
    }
  }

  // digital products
  public static function getLicenseKeyIdByKey($license_key)
  {
    return LicenseKey::where('license_key', $license_key)->whereNull('deleted_at')->pluck('id')?->first();
  }

  public static function isPhysicalProduct($product_id)
  {
    return (self::getProductTypeById($product_id) == ProductType::PHYSICAL);
  }

  public static function isDigitalProduct($product_id)
  {
    return (self::getProductTypeById($product_id) == ProductType::DIGITAL);
  }

  public static function isPhysicalOnly($products)
  {
    foreach ($products as $product) {
      if (!self::isPhysicalProduct($product['product_id'])) {
        return false;
      }
    }
    return true;
  }

  public static function isDigitalOnly($products)
  {
    foreach ($products as $product) {
      if (!self::isDigitalProduct($product['product_id'])) {
        return false;
      }
    }
    return true;
  }

  public static function getProductTypeById($product_id)
  {
    return Product::where('id', $product_id)?->value('product_type');
  }

  public static function isLicensableProduct($product)
  {
    if (isset($product['variation_id'])) {
      return Variation::where('id', $product['variation_id'])?->value('is_licensable');
    }

    return Product::where('id', $product['product_id'])?->value('is_licensable');
  }

  public static function getProductLicenseType($product_id)
  {
    return Product::where('id', $product_id)?->value('license_type');
  }

  public static function isAutoGenerateLicense($product)
  {
    if (isset($product['variation_id'])) {
      return Variation::where('id', $product['variation_id'])?->value('is_licensekey_auto');
    }

    return Product::where('id', $product['product_id'])?->value('is_licensekey_auto');
  }

  public static function isInSameTypeProducts($products)
  {
    return count(array_unique(data_get($products, '*.product_type'))) === 1;
  }

  public static function explodeLicenseKeys($separator, $license_keys)
  {
    switch ($separator) {
      case 'new_line':
        return explode('\n', $license_keys);

      case 'double_new_line':
        return explode('\n\n', $license_keys);

      case 'comma':
        return explode(',', $license_keys);

      case 'semicolon':
        return explode(';', $license_keys);

      case 'pipe':
        return explode('|', $license_keys);

      default:
        return [];
    }
  }

  public static function isReadNotice($notice_id)
  {
    $notice = Notice::where('id', $notice_id)->whereNull('deleted_at')->with('reader')->first();
    return (int) $notice->reader->find(self::getCurrentUserId())?->pivot?->is_read;
  }

  public static function isGuestCheckoutEnabled()
  {
    $settings = self::getSettings();
    return $settings['activation']['guest_checkout'];
  }

  public static function isSMSLoginEnable()
  {
      $settings = self::getSettings();
      return $settings['activation']['login_number'];
  }

  public static function getDefaultSMSMethod()
  {
      $settings = self::getSettings();
      return $settings['sms_methods']['default_sms_method'];
  }
}
