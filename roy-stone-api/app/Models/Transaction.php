<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transaction extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The Attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'wallet_id',
        'point_id',
        'order_id',
        'detail',
        'amount',
        'type',
        'from',
    ];

    protected $casts = [
        'wallet_id' => 'integer',
        'point_id' => 'integer',
        'order_id' => 'integer',
        'amount' => 'float',
        'from' => 'integer',
    ];

    protected $hidden = [
        'updated_at',
        'deleted_at',
    ];

    /**
     * @return Int
     */
    public function getId($request)
    {
        return ($request->id) ? $request->id : $request->route('wallet')->id;
    }

    /**
     * @return HasOne
     */
    public function order(): HasOne
    {
        return $this->hasOne(Order::class,'id', 'order_id')->select('id', 'order_number');
    }

    /**
     * @return HasOne
     */
    public function point(): HasOne
    {
        return $this->hasOne(Transaction::class, 'point_id');
    }

    /**
     * @return HasOne
     */
    public function from(): HasOne
    {
        return $this->hasOne(User::class, 'from');
    }

    /**
     * @return HasMany
     */
    public function wallet(): HasMany
    {
        return $this->hasMany(Transaction::class, 'wallet_id');
    }
}
