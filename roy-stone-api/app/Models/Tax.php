<?php

namespace App\Models;

use App\Helpers\Helpers;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tax extends Model
{
    use HasFactory;

    /**
     * The Taxes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'name',
        'rate',
        'status',
        'created_by_id'
    ];

    protected $casts = [
        'status' => 'integer',
    ];

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
        return ($request->id) ? $request->id : $request->route('tax')->id;
    }

    /**
     * @return HasMany
     */
    public function product(): HasMany
    {
        return $this->hasMany(Product::class, 'tax_id');
    }
}
