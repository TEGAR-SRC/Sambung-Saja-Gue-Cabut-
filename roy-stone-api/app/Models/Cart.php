<?php

namespace App\Models;

use App\Helpers\Helpers;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cart extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The Attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'wholesale_price',
        'product_id',
        'variation_id',
        'consumer_id',
        'quantity',
        'sub_total'
    ];

    protected $with = [
        'product',
        'variation'
    ];

    protected $casts = [
        'variation_id' => 'integer',
        'wholesale_price' => 'integer',
        'product_id' => 'integer',
        'consumer_id' => 'integer',
        'sub_total' => 'float',
        'quantity' => 'integer'
    ];

    public static function boot()
    {
        parent::boot();
        static::saving(function ($model) {
            $model->consumer_id = Helpers::getCurrentUserId();
        });
    }

    /**
     * @return Int
     */
    public function getId($request)
    {
        return ($request->id) ? $request->id : $request->route('cart')->id;
    }

    /**
     * @return BelongsTo
     */
    public function consumer(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return BelongsTo
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * @return BelongsTo
     */
    public function variation(): BelongsTo
    {
        return $this->belongsTo(Variation::class);
    }
}
