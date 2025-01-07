<?php

namespace App\Policies;

use App\Models\User;
use App\Enums\RoleEnum;
use App\Models\Attachment;

class AttachmentPolicy
{
    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user)
    {
        if ($user->can('attachment.index')) {
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Attachment  $attachment
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Attachment $attachment)
    {
        if ($user->can('attachment.index')) {
            return true;
        }
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        if ($user->can('attachment.create')) {
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Attachment  $attachment
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Attachment $attachment)
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Attachment  $attachment
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Attachment $attachment)
    {
        if ($user->can('attachment.destroy') &&
            ($user->role->name != RoleEnum::VENDOR || $user->id == $attachment->created_by_id)) {
            return true;
        }
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Attachment  $attachment
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Attachment $attachment)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Attachment  $attachment
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Attachment $attachment)
    {
        //
    }
}
