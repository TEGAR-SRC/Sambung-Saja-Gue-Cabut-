<?php

namespace App\Notifications;

use App\Models\Order;
use App\Enums\RoleEnum;
use App\Helpers\Helpers;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class CancelOrderNotification extends Notification
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
        return ['mail','database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        switch($this->roleName) {
            case RoleEnum::CONSUMER:
               return $this->toConsumerMail();
            case RoleEnum::VENDOR:
                return $this->toVendorMail();
            case RoleEnum::ADMIN:
                return $this->toAdminMail();
        }
    }

    public function toAdminMail(): MailMessage
    {
        return (new MailMessage)
            ->subject("Order #{$this->order->order_number} Cancelled - Action Required")
            ->line("Order #{$this->order->order_number} has been cancelled.")
            ->line("Please take necessary actions.")
            ->line("Order Payment Status: {$this->order->payment_status}")
            ->line("Order Status: {$this->order->order_status->name}");
    }

    public function toVendorMail(): MailMessage
    {
        return (new MailMessage)
            ->subject("Important: Order #{$this->order->order_number} Cancelled")
            ->line("We regret to inform you that order #{$this->order->order_number} has been cancelled.")
            ->line("Please review the order details and take necessary actions.")
            ->line("Order Payment Status: {$this->order->payment_status}")
            ->line("Order Status: {$this->order->order_status->name}");
    }

    public function toConsumerMail(): MailMessage
    {
        if ($this->order->consumer_id) {
            $consumer = Helpers::getConsumerById($this->order->consumer_id);
            if ($consumer) {
                return (new MailMessage)
                    ->subject("Your Order #{$this->order->order_number} has been cancelled")
                    ->greeting("Hello {$consumer->name},")
                    ->line("We regret to inform you that your order #{$this->order->order_number} has been cancelled.")
                    ->line("Order Payment Status: {$this->order->payment_status}")
                    ->line("Order Status: {$this->order->order_status->name}");
            }
        }
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        switch($this->roleName) {
            case RoleEnum::CONSUMER:
                $message = "Your order (#{$this->order->order_number}) has been cancelled.";
                break;
            case RoleEnum::VENDOR:
                $message = "Order (#{$this->order->order_number}) from your catalog has been cancelled.";
                break;
            case RoleEnum::ADMIN:
                $message = "Order #{$this->order->order_number} has been cancelled.";
                break;
        }

        return [
            'title' => "Order has been cancelled",
            'message' => $message,
            'type' => "order"
        ];
    }
}
