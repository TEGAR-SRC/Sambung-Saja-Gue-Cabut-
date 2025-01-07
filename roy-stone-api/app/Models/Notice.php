<?php

namespace App\Models;

use App\Helpers\Helpers;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Notice extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The Blogs that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
        'priority',
        'created_by_id'
    ];

    protected $appends = [
        'is_read',
    ];

    protected $casts = [
        'is_read' => 'integer',
    ];

    public static function boot()
    {
        parent::boot();
        static::saving(function ($model) {
            $model->created_by_id = Helpers::getCurrentUserId();
        });
    }

    public function getIsReadAttribute()
    {
        return Helpers::isReadNotice($this->id);
    }

    /**
     * @return Int
     */
    public function getId($request)
    {
        return ($request->id) ? $request->id : $request->route('notice')->id;
    }

    /**
     * @return BelongsToMany
     */
    public function reader(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'notice_reads')->withPivot('is_read');
    }
}
