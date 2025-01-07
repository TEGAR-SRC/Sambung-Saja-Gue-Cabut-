<?php

namespace App\Policies;

use App\Enums\RoleEnum;
use App\Models\User;
use App\Models\LicenseKey;

class LicenseKeyPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user)
    {
        if ($user->can('license_key.index')) {
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, LicenseKey $licenseKey)
    {
        if ($user->can('license_key.index')) {
            return true;
        }
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        if ($user->can('license_key.create')) {
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, LicenseKey $licenseKey)
    {
        if ($user->can('license_key.edit') &&
        ($user->role->name != RoleEnum::VENDOR || $user->id == $licenseKey->created_by_id)) {
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, LicenseKey $licenseKey)
    {
        if ($user->can('license_key.destroy') &&
        ($user->role->name != RoleEnum::VENDOR || $user->id == $licenseKey->created_by_id)) {
            return true;
        }
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, LicenseKey $licenseKey)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, LicenseKey $licenseKey)
    {
        //
    }
}
