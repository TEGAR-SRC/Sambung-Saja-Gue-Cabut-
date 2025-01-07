<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Subscribe;

class SubscribePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Subscribe $subscribe)
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Subscribe $subscribe)
    {
        if ($user->can('subscribe.edit')) {
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Subscribe $subscribe)
    {
        if ($user->can('subscribe.destroy')) {
            return true;
        }
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Subscribe $subscribe)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Subscribe $subscribe)
    {
        //
    }
}
