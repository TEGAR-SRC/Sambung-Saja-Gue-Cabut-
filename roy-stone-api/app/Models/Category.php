<?php

namespace App\Models;

use App\Helpers\Helpers;
use Spatie\MediaLibrary\HasMedia;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Cviebrock\EloquentSluggable\Sluggable;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model implements HasMedia
{
    use Sluggable, HasFactory, SoftDeletes, HasRoles, InteractsWithMedia;

    /**
     * The Categories that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'category_image_id',
        'category_icon_id',
        'category_meta_image_id',
        'meta_title',
        'meta_description',
        'status',
        'type',
        'parent_id',
        'commission_rate',
        'created_by_id'
    ];

    protected $with = [
        'category_image:id,name,disk,mime_type,file_name',
        'category_meta_image:id,name,disk,mime_type,file_name',
        'category_icon:id,name,disk,mime_type,file_name'
    ];

    protected $withCount = [
        'blogs',
        'products'
    ];

    protected $casts = [
        'status' => 'integer',
        'parent_id' => 'integer',
        'category_image_id' => 'integer',
        'category_meta_image_id' => 'integer',
        'blogs_count' => 'integer',
        'products_count' => 'integer',
        'commission_rate' =>  'float',
        'category_icon_id' => 'integer',
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
     * Get the Parent Categories.
     */
    public function scopeParent(Builder $query, bool $parent): Builder
    {
        if ($parent) {
            return $query->whereNull('parent_id');
        }

        return $query;
    }

    /**
     * @return Int
     */
    public function getId($request)
    {
        return ($request->id) ? $request->id : $request->route('category')->id;
    }

    /**
     * @return HasMany
     */
    public function subcategories(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id')->with('subcategories');
    }

    /**
     * @return BelongsTo
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    /**
     * @return BelongsTo
     */
    public function category_image(): BelongsTo
    {
        return $this->belongsTo(Attachment::class, 'category_image_id');
    }

        /**
     * @return BelongsTo
     */
    public function category_meta_image(): BelongsTo
    {
        return $this->belongsTo(Attachment::class, 'category_meta_image_id');
    }

    /**
     * @return BelongsTo
     */
    public function category_icon(): BelongsTo
    {
        return $this->belongsTo(Attachment::class, 'category_icon_id');
    }

    /**
     * @return BelongsToMany
     */
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'product_categories');
    }

    /**
     * @return BelongsToMany
     */
    public function blogs(): BelongsToMany
    {
        return $this->belongsToMany(Blog::class, 'blog_categories');
    }
}
