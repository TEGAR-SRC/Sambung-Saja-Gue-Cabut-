<?php

namespace App\Models;

use App\Helpers\Helpers;
use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Refund extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia;

    /**
     * The Refund that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'reason',
        'amount',
        'status',
        'store_id',
        'order_id',
        'quantity',
        'product_id',
        'consumer_id',
        'variation_id',
        'payment_type',
        'refund_image_id',
    ];

    protected $with = [
        'user:id,name,email',
        'store:id,store_name,slug,store_logo_id',
        'order:id,order_number',
        'refund_image'
    ];

    protected $casts = [
        'amount' => 'float',
        'quantity' => 'integer',
        'store_id' => 'integer',
        'order_id' => 'integer',
        'product_id' => 'integer',
        'consumer_id' => 'integer',
        'variation_id' => 'integer',
        'refund_image_id' => 'integer',
    ];

    protected $hidden = [
        'updated_at',
        'deleted_at'
    ];

    /**
     * @return Int
     */
    public function getId($request)
    {
        return ($request->id) ? $request->id : $request->route('refund')->id;
    }

    /**
     * @return BelongsTo
     */
    public function refund_image(): BelongsTo
    {
        return $this->belongsTo(Attachment::class, 'refund_image_id');
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
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'order_id');
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
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    /**
     * @return BelongsTo
     */
    public function variation(): BelongsTo
    {
        return $this->belongsTo(Variation::class, 'variation_id');
    }
}
