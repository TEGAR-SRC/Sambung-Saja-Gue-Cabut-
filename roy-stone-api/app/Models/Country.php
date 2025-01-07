<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Country extends Model
{
    use HasFactory;

    /**
     * The Countries that are mass assignable.
     *
     * @var array
     */

    /**
     * @return HasMany
     */
    public function state(): HasMany
    {
        return $this->hasMany(State::class, 'country_id');
    }

    /**
     * @return HasMany
     */
    public function tax(): HasMany
    {
        return $this->hasMany(Tax::class, 'country_id');
    }

    /**
     * @return HasMany
     */
    public function store(): HasMany
    {
        return $this->hasMany(Store::class, 'country_id');
    }

    /**
     * @return HasMany
     */
    public function shipping(): HasMany
    {
        return $this->hasMany(Shipping::class, 'country_id');
    }

    /**
     * @return HasMany
     */
    public function address(): HasMany
    {
        return $this->hasMany(Address::class, 'country_id');
    }

}
