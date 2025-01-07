<?php

namespace App\Policies;

use App\Models\User;
use App\Models\HomePage;
use Illuminate\Auth\Access\HandlesAuthorization;

class HomePagePolicy
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
     * @param  \App\Models\HomePage  $homePage
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, HomePage $homePage)
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
        //
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\HomePage  $homePage
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, HomePage $homePage)
    {
        if ($user->can('theme.edit')) {
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\HomePage  $homePage
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, HomePage $homePage)
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\HomePage  $homePage
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, HomePage $homePage)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\HomePage  $homePage
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, HomePage $homePage)
    {
        //
    }
}
