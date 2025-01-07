<?php

namespace App\Models;

use App\Helpers\Helpers;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Page extends Model
{
    use Sluggable, HasFactory, SoftDeletes;

    /**
     * The Pages that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'slug',
        'content',
        'meta_title',
        'meta_description',
        'page_meta_image_id',
        'status',
        'created_by_id'
    ];

    protected $with = [
        'page_meta_image',
    ];

    protected $casts = [
        'page_meta_image_id' => 'integer',
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
        return ($request->id) ? $request->id : $request->route('page')->id;
    }

    /**
     * @return BelongsTo
     */
    public function created_by(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_id');
    }

    /**
     * @return BelongsTo
     */
    public function page_meta_image(): BelongsTo
    {
        return $this->belongsTo(Attachment::class, 'page_meta_image_id');
    }
}
