<?php

namespace App\Listeners;

use Exception;
use App\Models\User;
use App\Events\UpdateRefundRequestEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Notifications\UpdateRefundRequestNotification;

class UpdateRefundRequestListener implements ShouldQueue
{
    /**
     * Handle the event.
     */
    public function handle(UpdateRefundRequestEvent $event): void
    {
        try {

            $consumer = User::where('id', $event->refund->consumer_id)->first();
            if (isset($consumer)) {
                $consumer->notify(new UpdateRefundRequestNotification($event->refund));
            }

        } catch (Exception $e) {

            //
        }
    }
}
