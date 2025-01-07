<?php

namespace App\Observers;

use App\Enums\RoleEnum;
use Spatie\Permission\Models\Role;

class RoleObserver
{
    /**
     * Handle the Role "created" event.
     */
    public function created(Role $role): void
    {
        //
    }

    /**
     * Handle the Role "updated" event.
     */
    public function updated(Role $role): void
    {
        //
    }

    /**
     * Handle the Role "deleted" event.
     */
    public function deleted(Role $role): void
    {
        $users = $role->users()->get();
        foreach($users as $user) {
            $user->assignRole(RoleEnum::CONSUMER);
        }
    }

    /**
     * Handle the Role "restored" event.
     */
    public function restored(Role $role): void
    {
        //
    }

    /**
     * Handle the Role "force deleted" event.
     */
    public function forceDeleted(Role $role): void
    {
        //
    }
}
