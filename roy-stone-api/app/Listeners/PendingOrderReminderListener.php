<?php

namespace App\Listeners;

use App\Models\User;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use App\Events\PendingOrderReminderEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Notifications\PendingOrderReminderNotification;
use Exception;

class PendingOrderReminderListener implements ShouldQueue
{
    /**
     * Handle the event.
     */
    public function handle(PendingOrderReminderEvent $event)
    {
        try {

            $admin = User::role(RoleEnum::ADMIN)->first();
            if (isset($admin)) {
                $admin->notify(new PendingOrderReminderNotification($event->order, RoleEnum::ADMIN));
            }

            if (!$event->order?->parent_id) {
                if ($event->order?->store_id) {
                    $vendor = Helpers::getStoreById($event->order?->store_id)?->vendor;
                    $vendor->notify(new PendingOrderReminderNotification($event->order, RoleEnum::VENDOR));
                }
            } else if (!empty($event->order->sub_orders)) {
                foreach ($event->order->sub_orders as $sub_order) {
                    if (isset($sub_order->store_id)) {
                        $vendor = Helpers::getStoreById($sub_order->store_id)?->vendor;
                        $vendor->notify(new PendingOrderReminderNotification($sub_order, RoleEnum::VENDOR));
                    }
                }
            }

        } catch (Exception $e) {

            //
        }
    }
}
