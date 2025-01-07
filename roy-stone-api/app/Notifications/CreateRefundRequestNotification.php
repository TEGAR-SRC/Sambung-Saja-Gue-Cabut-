<?php

namespace App\Notifications;

use App\Models\User;
use App\Enums\RoleEnum;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class CreateRefundRequestNotification extends Notification
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
        $admin = User::role(RoleEnum::ADMIN)->pluck('name')->first();
        return (new MailMessage)
            ->subject("Refund Request from {$consumer}")
            ->greeting("Hello {$admin},")
            ->line("A refund request has been submitted by {$consumer}.")
            ->line("Requested Amount: {$this->refund->amount}")
            ->line("Reason for Refund: {$this->refund->reason}")
            ->line("Your attention to this matter is greatly appreciated.");
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        //for admin
        $consumer = User::where('id', $this->refund->consumer_id)->pluck('name')->first();
        return [
            'title' => "New Refund Request",
            'message' => "A refund request has been received from a {$consumer}.",
            'type' => 'refund',
        ];
    }
}