<?php

namespace App\Policies;

use App\Models\User;
use App\Enums\RoleEnum;
use App\Models\OrderStatus;
use Illuminate\Auth\Access\HandlesAuthorization;

class OrderStatusPolicy
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
        //
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\OrderStatus  $orderStatus
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, OrderStatus $orderStatus)
    {
        //
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        if ($user->can('order_status.create')) {
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\OrderStatus  $orderStatus
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, OrderStatus $orderStatus)
    {
        if ($user->can('order_status.edit') &&
            ($user->role->name != RoleEnum::VENDOR || $user->id == $orderStatus->created_by_id)) {
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\OrderStatus  $orderStatus
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, OrderStatus $orderStatus)
    {
        if ($user->can('order_status.destory') &&
            ($user->role->name != RoleEnum::VENDOR || $user->id == $orderStatus->created_by_id)) {
            return true;
        }
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\OrderStatus  $orderStatus
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, OrderStatus $orderStatus)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\OrderStatus  $orderStatus
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, OrderStatus $orderStatus)
    {
        //
    }
}
