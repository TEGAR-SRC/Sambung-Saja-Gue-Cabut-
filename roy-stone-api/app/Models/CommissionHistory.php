<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CommissionHistory extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The Attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'admin_commission',
        'vendor_commission',
        'order_id',
        'store_id'
    ];

    protected $with = [
        'order',
        'store'
    ];

    protected $casts = [
        'admin_commission' => 'float',
        'vendor_commission' => 'float',
        'order_id' => 'integer',
        'store_id' => 'integer',
    ];

    /**
     * @return HasOne
     */
    public function store(): HasOne
    {
        return $this->hasOne(Store::class,'id', 'store_id');
    }

    /**
     * @return BelongsTo
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
}
