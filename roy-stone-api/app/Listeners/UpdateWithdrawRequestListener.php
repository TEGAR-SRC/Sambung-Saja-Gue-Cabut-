<?php

namespace App\Listeners;

use Exception;
use App\Models\User;
use App\Events\UpdateWithdrawRequestEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Notifications\UpdateWithdrawRequestNotification;

class UpdateWithdrawRequestListener implements ShouldQueue
{
    /**
     * Handle the event.
     */
    public function handle(UpdateWithdrawRequestEvent $event): void
    {
        try {

            $vendor = User::where('id', $event->withdrawRequest->vendor_id)->first();
            if (isset($vendor)) {
                $vendor->notify(new UpdateWithdrawRequestNotification($event->withdrawRequest));
            }

        } catch (Exception $e) {

            //
        }
    }
}
