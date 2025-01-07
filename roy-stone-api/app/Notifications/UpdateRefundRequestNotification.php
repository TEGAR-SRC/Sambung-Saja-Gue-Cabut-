<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class UpdateRefundRequestNotification extends Notification
{
    use Queueable;

    private $refund;

    /**
     * Create a new notification instance.
     */
    public function __construct($refund)
    {
        $this->refund = $refund;
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
        $consumer = User::where('id', $this->refund->consumer_id)->pluck('name')->first();
        return (new MailMessage)
            ->subject('Refund Request Status Updated')
            ->greeting('hello ' . $consumer . ',')
            ->line('We would like to inform you that the status of your refund request has been updated:')
            ->line('Your refund request for ' . $this->refund->amount . ' has been ' . $this->refund->status . '.')
            ->line('If you require any further assistance, please don’t hesitate to contact us.')
            ->line('Thank you.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        //for consumer
        return [
            'title' => "Refund request updated!",
            'message' => "Your Refund request status has been {$this->refund->status}",
            'type' => "refund"
        ];
    }
}
