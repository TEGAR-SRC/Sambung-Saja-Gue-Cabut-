<?php

namespace App\Models;

use App\Helpers\Helpers;
use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Review extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia;

    /**
     * The Review that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'rating',
        'store_id',
        'product_id',
        'consumer_id',
        'description',
        'review_image_id',
    ];

    protected $with = [
        'review_image',
        'consumer:id,name,email,profile_image_id'
    ];

    protected $casts = [
        'product_id' => 'integer',
        'consumer_id' => 'integer',
        'store_id' => 'integer',
        'review_image_id' => 'integer',
        'rating' => 'integer',
    ];

    protected $hidden = [
        'updated_at',
        'deleted_at'
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
        return ($request->id) ? $request->id : $request->route('review')->id;
    }

    /**
     * @return BelongsTo
     */
    public function review_image(): BelongsTo
    {
        return $this->belongsTo(Attachment::class, 'review_image_id');
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
    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class, 'store_id');
    }

    /**
     * @return BelongsTo
     */
    public function consumer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'consumer_id');
    }
}
