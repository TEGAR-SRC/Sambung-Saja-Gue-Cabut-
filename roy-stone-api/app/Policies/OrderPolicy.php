<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Order;
use App\Helpers\Helpers;
use Illuminate\Auth\Access\HandlesAuthorization;

class OrderPolicy
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
        if ($user->can('order.index')) {
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user)
    {
        if ($user->can('order.index')) {
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
        if (Helpers::isUserLogin()) {
            if ($user->can('order.create')) {
                return true;
            }

            return false;
        }

        return true;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Order $order)
    {
        if ($user->can('order.edit')) {
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Order $order)
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Order $order)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Order $order)
    {
        //
    }
}
