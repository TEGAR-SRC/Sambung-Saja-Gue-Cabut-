<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Wholesale extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The Attribute Values that are mass assignable.
     *
     * @var array
     */
    public $fillable = [
        'min_qty',
        'max_qty',
        'value',
        'product_id',
    ];

    protected $casts = [
        'product_id' => 'integer',
        'max_qty' => 'integer',
        'min_qty' => 'integer',
        'value' => 'double',
    ];

    protected $hidden = [
        'deleted_at',
        'updated_at',
        'created_at',
    ];

    /**
     * @return BelongsTo
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
