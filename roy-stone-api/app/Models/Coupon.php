<?php

namespace App\Models;

use App\Helpers\Helpers;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Coupon extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The Coupons that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
        'code',
        'used',
        'type',
        'amount',
        'status',
        'content',
        'end_date',
        'min_spend',
        'is_expired',
        'start_date',
        'is_unlimited',
        'is_apply_all',
        'created_by_id',
        'is_first_order',
        'usage_per_coupon',
        'usage_per_customer',
    ];

    protected $casts = [
        'min_spend' => 'integer',
        'usage_per_customer' => 'integer',
        'is_expired' => 'integer',
        'is_first_order' => 'integer',
        'is_unlimited' => 'integer',
        'status' => 'integer',
    ];

    public static function boot()
    {
        parent::boot();
        static::saving(function ($model) {
            $model->created_by_id = Helpers::getCurrentUserId();
        });
    }

    /**
     * @return Int
     */
    public function getId($request)
    {
        return ($request->id) ? $request->id : $request->route('coupon')->id;
    }

    /**
     * @return BelongsTo
     */
    public function created_by(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * @return BelongsToMany
     */
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'product_coupons');
    }

    /**
     * @return BelongsToMany
     */
    public function exclude_products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'exclude_product_coupons');
    }
}
