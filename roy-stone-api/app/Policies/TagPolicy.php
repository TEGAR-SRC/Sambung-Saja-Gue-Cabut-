<?php

namespace App\Policies;

use App\Models\Tag;
use App\Models\User;
use App\Enums\RoleEnum;
use Illuminate\Auth\Access\HandlesAuthorization;

class TagPolicy
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
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Tag $tag)
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
        if ($user->can('tag.create')) {
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Tag $tag)
    {
        if ($user->can('tag.edit') &&
            ($user->role->name != RoleEnum::VENDOR || $user->id == $tag->created_by_id)) {
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Tag $tag)
    {
        if ($user->can('tag.destroy') &&
            ($user->role->name != RoleEnum::VENDOR || $user->id == $tag->created_by_id)) {
            return true;
        }
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Tag $tag)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Tag $tag)
    {
        //
    }
}
