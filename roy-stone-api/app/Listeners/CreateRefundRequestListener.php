<?php

namespace App\Listeners;

use Exception;
use App\Models\User;
use App\Enums\RoleEnum;
use App\Events\CreateRefundRequestEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Notifications\CreateRefundRequestNotification;

class CreateRefundRequestListener implements ShouldQueue
{
    /**
     * Handle the event.
     */
    public function handle(CreateRefundRequestEvent $event)
    {
        try {

            $admin = User::role(RoleEnum::ADMIN)->first();
            if (isset($admin)) {
                $admin->notify(new CreateRefundRequestNotification($event->refund));
            }

        } catch (Exception $e) {

            //
        }
    }
}
