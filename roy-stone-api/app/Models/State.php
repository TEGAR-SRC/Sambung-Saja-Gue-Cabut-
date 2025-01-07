<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class State extends Model
{
    use HasFactory;

    /**
     * The States that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'country_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    /**
     * @return HasMany
     */
    public function taxes(): HasMany
    {
        return $this->hasMany(Tax::class, 'state_id');
    }

    /**
     * @return HasMany
     */
    public function store(): HasMany
    {
        return $this->hasMany(Store::class, 'state_id');
    }

    /**
     * @return HasMany
     */
    public function address(): HasMany
    {
        return $this->hasMany(Address::class, 'state_id');
    }

    /**
     * @return BelongsTo
     */
    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'country_id');
    }
}
