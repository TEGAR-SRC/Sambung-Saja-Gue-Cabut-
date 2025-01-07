<?php

namespace App\Listeners;

use App\Models\User;
use App\Enums\RoleEnum;
use App\Events\CreateWithdrawRequestEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Notifications\CreateWithdrawRequestNotification;
use Exception;

class CreateWithdrawRequestListener implements ShouldQueue
{
    /**
     * Handle the event.
     */
    public function handle(CreateWithdrawRequestEvent $event)
    {
        try {

            $admin = User::role(RoleEnum::ADMIN)->first();
            if (isset($admin)) {
                $admin->notify(new CreateWithdrawRequestNotification($event->withdrawRequest));
            }

        } catch (Exception $e) {

            //
        }
    }
}
