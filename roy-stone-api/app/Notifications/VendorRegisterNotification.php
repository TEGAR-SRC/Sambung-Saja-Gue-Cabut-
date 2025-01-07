<?php

namespace App\Notifications;

use App\Enums\RoleEnum;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class VendorRegisterNotification extends Notification
{
    use Queueable;

    private $store;

    /**
     * Create a new notification instance.
     */
    public function __construct($store)
    {
        $this->store = $store;
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
        $admin = User::role(RoleEnum::ADMIN)->pluck('name')->first();
        return (new MailMessage)
            ->subject('New Store Just Joined!')
            ->greeting("Hi {$admin},")
            ->line("We're thrilled to share some exciting news with you!")
            ->line("A brand new store has joined our platform:")
            ->line("Store Name: {$this->store->store_name}")
            ->line("Discover their incredible products and deals today!")
            ->line("Stay tuned for updates on recent check request approvals and rejections.");
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        // for admin
        return [
            'title' => "New vendor registered!",
            'message' => "Exciting News! A new vendor, {$this->store->store_name}, has joined our website. Discover their incredible products and deals today. Also, stay tuned for updates on recent check request approvals and rejections.",
            'type' => "store"
        ];
    }
}
