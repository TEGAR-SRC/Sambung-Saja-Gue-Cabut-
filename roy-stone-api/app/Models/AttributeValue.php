<?php

namespace App\Models;

use App\Helpers\Helpers;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class AttributeValue extends Model
{
    use Sluggable, HasFactory, HasRoles, SoftDeletes;

    /**
     * The Attribute Values that are mass assignable.
     *
     * @var array
     */
    public $fillable = [
        'value',
        'slug',
        'status',
        'hex_color',
        'attribute_id',
        'created_by_id'
    ];

    protected $casts = [
        'status' => 'integer',
    ];

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'value',
                'onUpdate' => true,
            ]
        ];
    }

    public static function boot()
    {
        parent::boot();
        static::saving(function ($model) {
            $model->created_by_id = Helpers::getCurrentUserId();
        });
    }

    /**
     * @return Int
     */
    public function getId($request)
    {
        return ($request->id) ? $request->id : $request->route('attribute_value')?->id;
    }

    /**
     * @return BelongsTo
     */
    public function attribute(): BelongsTo
    {
        return $this->belongsTo(Attribute::class, 'attribute_id');
    }

    /**
     * @return BelongsToMany
     */
    public function variations(): BelongsToMany
    {
        return $this->belongsToMany(Variation::class, 'variation_attribute_values');
    }
}
