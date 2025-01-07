<?php

namespace App\Models;

use App\Helpers\Helpers;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ShippingRule extends Model
{
    use HasFactory, HasRoles;

    /**
     * The Shipping Rules that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'min',
        'max',
        'name',
        'amount',
        'status',
        'rule_type',
        'shipping_id',
        'shipping_type',
        'created_by_id',
    ];

    protected $casts = [
        'shipping_id' => 'integer',
        'min' => 'float',
        'max' => 'float',
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
        return ($request->id) ? $request->id : $request->route('shippingRule')->id;
    }

    /**
     * @return BelongsTo
     */
    public function shipping(): BelongsTo
    {
        return $this->belongsTo(Shipping::class, 'shipping_id');
    }
}
