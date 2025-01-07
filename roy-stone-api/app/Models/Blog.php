<?php

namespace App\Models;

use App\Helpers\Helpers;
use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Blog extends Model implements HasMedia
{
    use Sluggable, HasFactory, SoftDeletes, InteractsWithMedia;

    /**
     * The Blogs that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'slug',
        'description',
        'content',
        'blog_thumbnail_id',
        'blog_meta_image_id',
        'meta_title',
        'meta_description',
        'is_featured',
        'is_sticky',
        'status',
        'created_by_id'
    ];

    protected $with = [
        'blog_thumbnail',
        'blog_meta_image',
        'categories:id,name,slug',
        'created_by:id,name,email',
        'tags:id,name,slug'
    ];

    protected $casts = [
        'blog_thumbnail_id' => 'integer',
        'blog_meta_image_id' => 'integer',
        'is_sticky' => 'integer',
        'is_featured' => 'integer',
        'status' => 'integer',
    ];

    protected $hidden = [
        'meta_description',
        'content',
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

    /**
     * @return Int
     */
    public function getId($request)
    {
        return ($request->id) ? $request->id : $request->route('blog')->id;
    }

    /**
     * @return BelongsTo
     */
    public function blog_thumbnail(): BelongsTo
    {
        return $this->belongsTo(Attachment::class, 'blog_thumbnail_id');
    }

    /**
     * @return BelongsTo
     */
    public function blog_meta_image(): BelongsTo
    {
        return $this->belongsTo(Attachment::class, 'blog_meta_image_id');
    }

    /**
     * @return BelongsTo
     */
    public function created_by(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_id');
    }

    /**
     * @return BelongsToMany
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'blog_categories');
    }

    /**
     * @return BelongsToMany
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'blog_tags');
    }
}
