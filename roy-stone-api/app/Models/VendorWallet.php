<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class VendorWallet extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The Attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'vendor_id',
        'balance',
    ];

    protected $casts = [
        'vendor_id' => 'integer',
        'balance' => 'float',
    ];

    /**
     * @return HasMany
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(VendorTransaction::class, 'vendor_wallet_id')->orderBy('created_at','desc');
    }

    /**
    * @return BelongsTo
     */
    public function vendor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'vendor_id');
    }
}
