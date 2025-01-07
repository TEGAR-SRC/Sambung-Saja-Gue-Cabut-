<?php

namespace App\Models;

use App\Helpers\Helpers;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Menu extends Model
{
    use HasFactory, SoftDeletes, Sluggable;

    /**
     * The values that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'link_type',
        'mega_menu',
        'set_page_link',
        'mega_menu_type',
        'sort',
        'slug',
        'path',
        'type',
        'item_image_id',
        'badge_text',
        'badge_color',
        'is_target_blank',
        'parent_id',
        'banner_image_id',
    ];

    protected $with = [
        'item_image:id,name,disk,mime_type,file_name',
        'banner_image:id,name,disk,mime_type,file_name',
    ];

    protected $casts = [
        'mega_menu' => 'integer',
        'parent_id' => 'integer',
        'banner_image_id' => 'integer',
        'item_image_id' => 'integer',
        'is_target_blank' => 'integer',
    ];

    protected $appends = [
        'product_ids',
        'blog_ids',
    ];

    protected $hidden = [
        'deleted_at',
        'updated_at',
        'products',
        'blogs',
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
                'source' => 'title',
                'onUpdate' => true,
            ]
        ];
    }

    public function getProductIdsAttribute()
    {
        return collect($this->products)->pluck('id')->toArray();
    }

    public function getBlogIdsAttribute()
    {
        return collect($this->blogs)->pluck('id')->toArray();
    }

    /**
     * @return Int
     */
    public function getId($request)
    {
        return ($request->id) ? $request->id : $request->route('menu')?->id;
    }

    /**
     * @return HasMany
     */
    public function child(): HasMany
    {
        return $this->hasMany(Menu::class, 'parent_id')->with('child')->orderBy('sort');
    }

    /**
     * @return BelongsTo
     */
    public function banner_image(): BelongsTo
    {
        return $this->belongsTo(Attachment::class, 'banner_image_id');
    }

    /**
     * @return BelongsTo
     */
    public function item_image(): BelongsTo
    {
        return $this->belongsTo(Attachment::class, 'item_image_id');
    }

    /**
     * @return BelongsToMany
     */
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'menu_products');
    }

    /**
     * @return BelongsToMany
     */
    public function blogs(): BelongsToMany
    {
        return $this->belongsToMany(Blog::class, 'menu_blogs');
    }
}
