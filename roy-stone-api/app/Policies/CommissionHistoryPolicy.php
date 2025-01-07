<?php

namespace App\Policies;

use App\Models\CommissionHistory;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CommissionHistoryPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user)
    {
        if ($user->can('commission_history.index')) {
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, CommissionHistory $commissionHistory)
    {
        if ($user->can('commission_history.index')) {
            return true;
        }
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, CommissionHistory $commissionHistory)
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, CommissionHistory $commissionHistory)
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, CommissionHistory $commissionHistory)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, CommissionHistory $commissionHistory)
    {
        //
    }
}
