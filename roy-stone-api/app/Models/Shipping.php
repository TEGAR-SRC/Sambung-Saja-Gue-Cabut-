<?php

namespace App\Models;

use App\Helpers\Helpers;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Shipping extends Model
{
    use HasFactory, HasRoles;

    /**
     * The Shippings that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'status',
        'country_id',
        'created_by_id',
    ];

    protected $with = [
        'country',
        'shipping_rules'
    ];

    protected $casts = [
        'country_id' => 'integer',
        'status' => 'integer',
    ];

    public static function boot()
    {
        parent::boot();
        static::saving(function ($model) {
            $model->created_by_id = Helpers::getCurrentUserId();
        });

        static::deleted(function ($shipping){
            $shipping->shipping_rules()->delete();
        });
    }

    /**
     * @return Int
     */
    public function getId($request)
    {
        return ($request->id) ? $request->id : $request->route('shipping')->id;
    }

    /**
     * @return HasMany
     */
    public function shipping_rules(): HasMany
    {
        return $this->hasMany(ShippingRule::class, 'shipping_id');
    }

    /**
    * @return BelongsTo
     */
    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'country_id');
    }
}
