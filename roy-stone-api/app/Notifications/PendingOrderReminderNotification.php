<?php

namespace App\Notifications;

use App\Models\Order;
use App\Enums\RoleEnum;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class PendingOrderReminderNotification extends Notification
{
    use Queueable;

    private $order;
    private $roleName;

    /**
     * Create a new notification instance.
     */
    public function __construct(Order $order, $roleName)
    {
        $this->order = $order;
        $this->roleName = $roleName;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        switch($this->roleName) {
            case RoleEnum::VENDOR:
                return $this->toVendorMail();
            case RoleEnum::ADMIN:
                return $this->toAdminMail();
        }
    }

    public function toAdminMail(): MailMessage
    {
        return  (new MailMessage)
            ->subject("Attention Needed: Order #{$this->order->order_number}")
            ->line('An order has been pending for more than 24 hours and requires your attention.')
            ->line('Order Payment Status: ' . $this->order->payment_status)
            ->line('Current Order Status: ' . $this->order->order_status->name)
            ->line('Please review the order status and take necessary action.');
    }

    public function toVendorMail(): MailMessage
    {
        return (new MailMessage)
            ->subject("Action Required: Order #{$this->order->order_number}")
            ->line('An order has been pending for more than 24 hours and requires your attention.')
            ->line('Order Payment Status: ' . $this->order->payment_status)
            ->line('Current Order Status: ' . $this->order->order_status->name)
            ->line('Please update the order status as soon as possible.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        switch ($this->roleName) {
            case RoleEnum::VENDOR:
                $message = "Order #{$this->order->order_number} has been pending for over 24 hours. Please update the order status promptly.";
                $title = "Urgent: Order Update Required";
                break;
            case RoleEnum::ADMIN:
                $message = "Order #{$this->order->order_number} has been pending for more than 24 hours. Please review and take necessary action.";
                $title = "Action Needed: Pending Order";
                break;
        }

        return [
            'title' => $title,
            'message' => $message,
            'type' => "order"
        ];
    }
}
