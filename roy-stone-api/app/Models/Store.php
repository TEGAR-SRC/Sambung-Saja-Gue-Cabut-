<?php

namespace App\Models;

use App\Helpers\Helpers;
use Laravel\Sanctum\HasApiTokens;
use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Cviebrock\EloquentSluggable\Sluggable;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Store extends Model implements HasMedia
{
    use Sluggable, SoftDeletes, HasApiTokens, HasFactory, Notifiable, InteractsWithMedia;

    /**
     * The stores that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'store_name',
        'description',
        'slug',
        'status',
        'country_id',
        'state_id',
        'store_logo_id',
        'store_cover_id',
        'city',
        'address',
        'pincode',
        'hide_vendor_email',
        'hide_vendor_phone',
        'facebook',
        'twitter',
        'instagram',
        'youtube',
        'pinterest',
        'vendor_id',
        'is_approved',
        'created_by_id',
    ];

    protected $with = [
        'store_logo',
        'store_cover',
        'vendor:id,name,email,country_code,phone,status',
        'country:id,name',
        'state:id,name'
    ];

    protected $withCount = [
        'orders',
        'reviews',
        'products'
    ];

    protected $appends = [
        'product_images',
        'order_amount',
        'rating_count'
    ];

    protected $casts = [
        'country_id' => 'integer',
        'state_id' => 'integer',
        'store_logo_id' => 'integer',
        'vendor_id' => 'integer',
        'hide_vendor_email' => 'integer',
        'hide_vendor_phone' => 'integer',
        'status' => 'integer',
        'products_count' => 'integer',
        'is_approved' => 'integer',
        'reviews_count' => 'integer',
        'rating_count' => 'float'
    ];

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'store_name',
                'onUpdate' => true,
            ]
        ];
    }

    public static function boot()
    {
        parent::boot();
        static::saving(function ($model) {
            $model->created_by_id = Helpers::getCurrentUserId() ?? $model->vendor_id;
        });

        static::deleted(function($store) {
            $store->products()->delete();
            $store->vendor()->delete();
        });
    }

    public function getProductImagesAttribute()
    {
        return Helpers::getStoreWiseLastThreeProductImages($this->id);
    }

    public function getOrdersCountAttribute()
    {
        $request = app('request');
        return (int) Helpers::getStoreOrderCount($this->id, $request->filter_by);
    }

    public function getProductsCountAttribute()
    {
        $request = app('request');
        return (int) Helpers::getProductCountByStoreId($this->id, $request->filter_by);
    }

    public function getOrderAmountAttribute()
    {
        $request = app('request');
        return (float) Helpers::countStoreOrderAmount($this->id, $request->filter_by);
    }

    public function getRatingCountAttribute()
    {
        return (float) $this->reviews->avg('rating');
    }

    /**
     * @return Int
     */
    public function getId($request)
    {
        return ($request->id) ? $request->id : $request->route('store')->id;
    }

    /**
     * @return HasMany
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, 'store_id');
    }

    /**
     * @return HasMany
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'store_id');
    }

    /**
     * @return HasMany
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'store_id');
    }

    /**
     * @return BelongsTo
     */
    public function store_logo(): BelongsTo
    {
        return $this->belongsTo(Attachment::class, 'store_logo_id');
    }

    /**
     * @return BelongsTo
     */
    public function store_cover(): BelongsTo
    {
        return $this->belongsTo(Attachment::class, 'store_cover_id');
    }

    /**
     * @return BelongsTo
     */
    public function vendor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'vendor_id');
    }

    /**
     * @return BelongsTo
     */
    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'country_id');
    }

    /**
     * @return BelongsTo
     */
    public function state(): BelongsTo
    {
        return $this->belongsTo(State::class, 'state_id');
    }
}
