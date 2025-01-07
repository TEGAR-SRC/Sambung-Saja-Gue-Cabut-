<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Store;
use App\Enums\RoleEnum;
use Illuminate\Auth\Access\HandlesAuthorization;

class StorePolicy
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
     * @param  \App\Models\Store  $store
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Store $store)
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
        return true;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Store  $store
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Store $store)
    {
        if ($user->can('store.edit') &&
            ($user->role->name != RoleEnum::VENDOR || $user->id == $store->created_by_id)) {
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Store  $store
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Store $store)
    {
        if ($user->can('store.destroy') &&
            ($user->role->name != RoleEnum::VENDOR || $user->id == $store->created_by_id)) {
            return true;
        }
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Store  $store
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Store $store)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Store  $store
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Store $store)
    {
        //
    }
}
