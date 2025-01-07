<?php

namespace App\Policies;

use App\Models\AppSetting;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class AppSettingPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user)
    {
        if ($user->can('app_setting.index')) {
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, AppSetting $appSetting)
    {
        if ($user->can('app_setting.index')) {
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
    public function update(User $user, AppSetting $appSetting)
    {
        if ($user->can('app_setting.edit')) {
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, AppSetting $appSetting)
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, AppSetting $appSetting)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, AppSetting $appSetting)
    {
        //
    }
}
