<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Address extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'city',
        'title',
        'phone',
        'street',
        'pincode',
        'user_id',
        'state_id',
        'is_default',
        'country_id',
        'country_code',
    ];

    protected $casts = [
        'phone' => 'integer',
        'is_default' => 'integer',
        'country_id' => 'integer',
        'state_id' => 'integer',
    ];

    protected $hidden = [
        'deleted_at',
        'created_at',
        'updated_at'
    ];

    protected $with = [
        'country',
        'state'
    ];

    /**
     * @return Int
     */
    public function getId($request)
    {
        return ($request->id) ? $request->id : $request->route('address')->id;
    }

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * @return BelongsTo
     */
    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'country_id')->select(['id', 'name']);
    }

    /**
     * @return BelongsTo
     */
    public function state(): BelongsTo
    {
        return $this->belongsTo(State::class, 'state_id');
    }
}

