<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Refund;
use App\Enums\RoleEnum;

class RefundPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user)
    {
        if ($user->can('refund.index')) {
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Refund $refund)
    {
        if ($user->can('refund.index')) {
            return true;
        }
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user)
    {
        if ($user->can('refund.create')) {
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Refund $refund)
    {
        if ($user->can('refund.action') &&
            ($user->role->name != RoleEnum::VENDOR || $user->id == $refund->created_by_id)) {
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Refund $refund)
    {
       //
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Refund $refund)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Refund $refund)
    {
        //
    }
}
