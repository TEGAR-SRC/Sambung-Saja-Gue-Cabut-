<?php

namespace App\Notifications;

use App\Helpers\Helpers;
use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class UpdateOrderStatusNotification extends Notification
{
    use Queueable;

    private $order;
    private $consumer;

    /**
     * Create a new notification instance.
     */
    public function __construct(Order $order, $consumer)
    {
        $this->order = $order;
        $this->consumer = $consumer;
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
        if ($this->order->consumer_id) {
            $consumer = Helpers::getConsumerById($this->order?->consumer_id);
            if ($consumer) {
                return (new MailMessage)
                    ->subject("Order ID: #{$this->order?->order_number} has been {$this->order?->order_status?->name}")
                    ->greeting("Hello {$consumer->name},")
                    ->line("We wanted to provide you with an update regarding your recent order, ID. #{$this->order?->order_number}.")
                    ->line("Your order status has been updated to {$this->order?->order_status?->name}. ")
                    ->line('Please feel free to reach out to us if you have any questions or need assistance.')
                    ->line('Thank you for choosing us for your shopping experience. We value your trust and support!');
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
        // for consumer
        return [
            'title' => "Order status updated!",
            'message' => "Order Update: Your order #{$this->order->order_number} has been updated and current order status is in {$this->order->order_status->name}. Thank you for your patience!",
            'type' => "order"
        ];
    }
}
