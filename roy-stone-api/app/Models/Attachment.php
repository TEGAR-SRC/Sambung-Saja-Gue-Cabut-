<?php

namespace App\Models;

use App\Helpers\Helpers;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Attachment extends Media implements HasMedia
{
    use HasFactory,SoftDeletes, InteractsWithMedia;

    protected $table = 'attachments';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
    */

    protected $fillable = [
        'name',
        'file_name',
        'collection_name',
        'model_id',
        'model_type',
        'order_column',
        'disk',
        'conversions_disk',
        'mime_type',
        'size',
        'custom_properties',
        'generated_conversions',
        'responsive_images',
        'manipulations',
        'original_url',
        'preview_url',
        'created_by_id'
    ];

    protected $casts = [
        'custom_properties' => 'json',
        'generated_conversions' => 'json',
        'responsive_images' => 'json',
        'manipulations' => 'json',
    ];

    protected $visible = [
        'id',
        'name',
        'file_name',
        'disk',
        'mime_type',
        'original_url',
        'created_by_id',
        'asset_url',
        'created_at',
    ];

    protected $appends = [
        'asset_url' ,
        'original_url'
    ];

    public static function boot()
    {
        parent::boot();
        static::saving(function ($model) {
            $model->model_id = $model->id;
            $model->created_by_id = Helpers::getCurrentUserId() ?? Helpers::getAdmin()?->id;
        });
    }

    /**
     * Get Media relative path
     */
    public function getAssetUrlAttribute()
    {
        return str_replace(env('APP_URL'),"",$this->original_url);
    }

    /**
     * @return Int
     */
    public function getId($request)
    {
        return ($request->id) ? $request->id : $request->route('attachment')->id;
    }

    /**
     * @return HasMany
     */
    public function review_image(): HasMany
    {
        return $this->hasMany(Review::class, 'review_image_id');
    }

    /**
     * @return HasMany
     */
    public function category_image(): HasMany
    {
        return $this->hasMany(Category::class, 'category_image_id');
    }

    /**
     * @return HasMany
     */
    public function category_icon(): HasMany
    {
        return $this->hasMany(Category::class, 'category_icon_id');
    }
}
