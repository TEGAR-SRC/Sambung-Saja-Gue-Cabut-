<?php

namespace App\Models;

use App\Helpers\Helpers;
use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Brand extends Model implements HasMedia
{
    use Sluggable, HasFactory,SoftDeletes, InteractsWithMedia;

    /**
     * The Categories that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'slug',
        'brand_image_id',
        'brand_meta_image_id',
        'brand_banner_id',
        'meta_title',
        'meta_description',
        'status',
        'created_by_id'
    ];

    protected $with = [
        'brand_image:id,name,disk,mime_type,file_name',
        'brand_meta_image:id,name,disk,mime_type,file_name',
        'brand_banner:id,name,disk,mime_type,file_name',
    ];

    protected $casts = [
        'status' => 'integer',
        'brand_image_id' => 'integer',
        'brand_meta_image_id' => 'integer',
        'brand_banner_id' => 'integer',
    ];

    public static function boot()
    {
        parent::boot();
        static::saving(function ($model) {
            $model->created_by_id = Helpers::getCurrentUserId();
        });
    }

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name',
                'onUpdate' => true,
            ]
        ];
    }

    /**
     * @return Int
     */
    public function getId($request)
    {
        return ($request->id) ? $request->id : $request->route('brand')?->id;
    }

    /**
     * @return BelongsTo
     */
    public function brand_image(): BelongsTo
    {
        return $this->belongsTo(Attachment::class, 'brand_image_id');
    }

    /**
     * @return BelongsTo
     */
    public function brand_meta_image(): BelongsTo
    {
        return $this->belongsTo(Attachment::class, 'brand_meta_image_id');
    }

    /**
     * @return BelongsTo
     */
    public function brand_banner(): BelongsTo
    {
        return $this->belongsTo(Attachment::class, 'brand_banner_id');
    }

    /**
     * @return HasMany
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'brand_id');
    }
}
