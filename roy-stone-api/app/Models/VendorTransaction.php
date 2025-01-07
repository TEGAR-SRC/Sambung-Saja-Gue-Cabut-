<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class VendorTransaction extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The Attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'type',
        'from',
        'amount',
        'detail',
        'vendor_id',
        'vendor_wallet_id',
    ];

    protected $casts = [
        'vendor_wallet_id' => 'integer',
        'vendor_id' => 'integer',
        'amount' => 'float',
        'from' => 'integer',
    ];

    protected $hidden = [
        'updated_at',
        'deleted_at',
    ];

    /**
     * @return HasMany
     */
    public function vendor_wallet(): HasMany
    {
        return $this->hasMany(VendorWallet::class, 'vendor_wallet_id');
    }
}
