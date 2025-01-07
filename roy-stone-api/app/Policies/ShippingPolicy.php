<?php

namespace App\Policies;

use App\Models\User;
use App\Enums\RoleEnum;
use App\Models\Shipping;
use Illuminate\Auth\Access\HandlesAuthorization;

class ShippingPolicy
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
        if ($user->can('shipping.index')) {
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Shipping  $shipping
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Shipping $shipping)
    {
        if ($user->can('shipping.index')) {
            return true;
        }
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        if ($user->can('shipping.create')) {
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Shipping  $shipping
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Shipping $shipping)
    {
        if ($user->can('shipping.edit') &&
            ($user->role->name != RoleEnum::VENDOR || $user->id == $shipping->created_by_id)) {
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Shipping  $shipping
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Shipping $shipping)
    {
        if ($user->can('shipping.destroy') &&
            ($user->role->name != RoleEnum::VENDOR || $user->id == $shipping->created_by_id)) {
            return true;
        }
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Shipping  $shipping
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Shipping $shipping)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Shipping  $shipping
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Shipping $shipping)
    {
        //
    }
}
