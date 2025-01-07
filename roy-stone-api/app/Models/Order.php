<?php

namespace App\Models;

use App\Helpers\Helpers;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'note',
        'total',
        'status',
        'amount',
        'store_id',
        'tax_total',
        'coupon_id',
        'parent_id',
        'invoice_url',
        'consumer',
        'consumer_id',
        'order_number',
        'delivered_at',
        'points_amount',
        'created_by_id',
        'payment_status',
        'is_guest',
        'is_digital_only',
        'wallet_balance',
        'shipping_total',
        'payment_method',
        'order_status_id',
        'delivery_interval',
        'billing_address',
        'shipping_address',
        'delivery_description',
        'coupon_total_discount',
    ];

    protected $with = [
        'order_status:id,name,sequence,slug',
        'order_status_activities'
    ];

    protected $hidden = [
        'store',
        'deleted_at',
        'updated_at',
        'delivered_at',
    ];

    protected $casts = [
        'amount' => 'float',
        'shipping_total' => 'float',
        'tax_total' => 'float',
        'total' => 'float',
        'consumer_id' => 'integer',
        'consumer' => 'json',
        'order_number' => 'integer',
        'store_id' => 'integer',
        'coupon_id' => 'integer',
        'order_status_id' => 'integer',
        'is_digital_only' => 'integer',
        'is_guest' => 'integer',
        'shipping_address' => 'json',
        'billing_address' => 'json',
        'points_amount' => 'float',
        'wallet_balance' => 'float',
        'coupon_total_discount' => 'float',
        'status' => 'integer',
        'created_by_id' => 'integer',
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
        return ($request->id) ? $request->id : $request->route('order')?->id;
    }

    /**
     * @return HasOne
     */
    public function order_status(): HasOne
    {
        return $this->hasOne(OrderStatus::class, 'id', 'order_status_id');
    }

    /**
     * @return HasMany
     */
    public function sub_orders(): HasMany
    {
        return $this->hasMany(Order::class, 'parent_id');
    }

    /**
     * @return HasMany
     */
    public function order_status_activities(): HasMany
    {
        return $this->hasMany(OrderStatusActivity::class, 'order_id');
    }

    /**
     * @return HasMany
     */
    public function order_transactions(): HasMany
    {
        return $this->hasMany(OrderTransaction::class, 'order_id');
    }

    /**
     * @return HasMany
     */
    public function commission_history(): HasMany
    {
        return $this->hasMany(CommissionHistory::class, 'order_id');
    }

    /**
     * @return HasMany
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class, 'order_id');
    }

    /**
     * @return BelongsTo
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'parent_id');
    }

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'consumer_id');
    }

    /**
     * @return BelongsTo
     */
    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class, 'store_id');
    }

    /**
     * @return BelongsTo
     */
    public function coupon(): BelongsTo
    {
        return $this->belongsTo(Coupon::class, 'coupon_id');
    }

    /**
     * @return BelongsTo
     */
    public function created_by(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * @return BelongsTo
     */
    public function orderStatus(): BelongsTo
    {
        return $this->belongsTo(OrderStatus::class, 'status');
    }

    /**
     * @return BelongsTo
     */
    public function download_file(): HasMany
    {
        return $this->hasMany(DownloadFile::class, 'order_id');
    }

    /**
     * @return BelongsToMany
     */
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'order_products')->using(OrderProductPivot::class)->withPivot(config('enums.order.pivot'));
    }
}
