<?php

namespace App\Policies;

use App\Models\User;
use App\Enums\RoleEnum;
use App\Models\Currency;
use Illuminate\Auth\Access\HandlesAuthorization;

class CurrencyPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Currency  $currency
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Currency $currency)
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        if ($user->can('currency.create')) {
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Currency  $currency
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Currency $currency)
    {
        if ($user->can('currency.edit') &&
            ($user->role->name != RoleEnum::VENDOR || $user->id == $currency->created_by_id)) {
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Currency  $currency
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Currency $currency)
    {
        if ($user->can('currency.destroy') &&
            ($user->role->name != RoleEnum::VENDOR || $user->id == $currency->created_by_id)) {
            return true;
        }
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Currency  $currency
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Currency $currency)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Currency  $currency
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Currency $currency)
    {
        //
    }
}
