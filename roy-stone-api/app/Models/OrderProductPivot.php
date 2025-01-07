<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OrderProductPivot extends Pivot
{
    use HasFactory, SoftDeletes;

    protected $table = 'order_products';

    /**
     * The Attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'order_id',
        'wholesale_price',
        'product_id',
        'variation_id',
        'quantity',
        'tax',
        'single_price',
        'shipping_cost',
        'refund_status',
        'product_type',
        'subtotal'
    ];

    protected $casts = [
        'order_id' => 'integer',
        'product_id' => 'integer',
        'variation_id' => 'integer',
        'quantity' => 'integer',
        'single_price' => 'float',
        'shipping_cost' => 'float',
        'wholesale_price' => 'float',
        'subtotal' => 'float',
    ];

    protected $with = [
        'variation:id,name'
    ];

    public function toArray()
    {
        return [
            'order_id' => $this->order_id,
            'wholesale_price' => $this->wholesale_price,
            'variation' => $this->variation,
            'quantity' => $this->quantity,
            'single_price' => $this->single_price,
            'shipping_cost' => $this->shipping_cost,
            'refund_status' => $this->refund_status,
            'product_id' => $this->product_id,
            'product_type' => $this->product_type,
            'subtotal' => $this->subtotal,
        ];
    }

    /**
     * @return BelongsTo
     */
    public function variation(): BelongsTo
    {
        return $this->belongsTo(Variation::class, 'variation_id');
    }
}
