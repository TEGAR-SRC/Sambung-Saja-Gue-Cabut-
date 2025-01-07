<?php

namespace App\Policies;

use App\Models\User;
use App\Enums\RoleEnum;
use App\Models\AttributeValue;
use Illuminate\Auth\Access\HandlesAuthorization;

class AttributeValuePolicy
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
     * @param  \App\Models\AttributeValue  $attributeValue
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, AttributeValue $attributeValue)
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
        if ($user->can('attribute.create')) {
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\AttributeValue  $attributeValue
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, AttributeValue $attributeValue)
    {
        if ($user->can('attribute.edit') &&
            ($user->role->name != RoleEnum::VENDOR || $user->id == $attributeValue->created_by_id)) {
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\AttributeValue  $attributeValue
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, AttributeValue $attributeValue)
    {
        if ($user->can('attribute.destroy') &&
            ($user->role->name != RoleEnum::VENDOR || $user->id == $attributeValue->created_by_id)) {
            return true;
        }
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\AttributeValue  $attributeValue
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, AttributeValue $attributeValue)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\AttributeValue  $attributeValue
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, AttributeValue $attributeValue)
    {
        //
    }
}
