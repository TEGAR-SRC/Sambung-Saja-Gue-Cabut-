<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WithdrawRequest extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The Attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'amount',
        'message',
        'status',
        'vendor_wallet_id',
        'is_used',
        'payment_type',
        'vendor_id'
    ];

    protected $casts = [
        'amount' => 'float',
        'message' => 'string',
        'order_id' => 'integer',
        'vendor_wallet_id' => 'integer',
        'vendor_id' => 'integer',
    ];

    protected $with = [
        'user',
    ];

    /**
     * @return Int
     */
    public function getId($request)
    {
        return ($request->id) ? $request->id : $request->route('withdrawRequest')->id;
    }

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'vendor_id');
    }
}
