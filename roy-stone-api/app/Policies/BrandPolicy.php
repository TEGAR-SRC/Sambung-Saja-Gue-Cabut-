<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Brand;
use App\Enums\RoleEnum;

class BrandPolicy
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
    public function view(User $user, Brand $brand)
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user)
    {
        if ($user->can('brand.create')) {
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Brand $brand)
    {
        if ($user->can('brand.edit')  &&
            ($user->role->name != RoleEnum::VENDOR || $user->id == $brand->created_by_id)) {
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Brand $brand)
    {
        if ($user->can('brand.destroy')  &&
            ($user->role->name != RoleEnum::VENDOR || $user->id == $brand->created_by_id)) {
            return true;
        }
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Brand $brand)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Brand $brand)
    {
        //
    }
}
