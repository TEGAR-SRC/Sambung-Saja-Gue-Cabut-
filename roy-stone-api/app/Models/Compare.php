<?php

namespace App\Models;

use App\Helpers\Helpers;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Compare extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The Attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'product_id',
        'variation_id',
        'consumer_id',
        'category_id'
    ];

    protected $casts = [
        'variation_id' => 'integer',
        'product_id' => 'integer',
        'consumer_id' => 'integer',
        'category_id' => 'integer'
    ];

    protected $with = ['consumer', 'product', 'variation'];

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
        return ($request->id) ? $request->id : $request->route('compare')->id;
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
