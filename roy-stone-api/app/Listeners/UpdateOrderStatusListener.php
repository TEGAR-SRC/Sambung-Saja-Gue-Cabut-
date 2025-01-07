<?php

namespace App\Listeners;

use Exception;
use App\Helpers\Helpers;
use App\Events\UpdateOrderStatusEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Notifications\UpdateOrderStatusNotification;

class UpdateOrderStatusListener implements ShouldQueue
{
    /**
     * Handle the event.
     */
    public function handle(UpdateOrderStatusEvent $event)
    {
        try {

            if ($event->order->consumer_id) {
                $consumer = Helpers::getConsumerById($event->order->consumer_id);
                if ($consumer) {
                    $consumer->notify(new UpdateOrderStatusNotification($event->order, $consumer));
                }
            }

        } catch (Exception $e) {

            //
        }
    }
}
