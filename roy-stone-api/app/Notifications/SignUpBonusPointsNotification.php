<?php

namespace App\Notifications;

use App\Helpers\Helpers;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class SignUpBonusPointsNotification extends Notification
{
    use Queueable;

    private $user;

    /**
     * Create a new notification instance.
     */
    public function __construct($user)
    {
        $this->user = $user;
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
        $settings = Helpers::getSettings();
        return (new MailMessage)
            ->subject('Congratulations on Your Sign-Up Bonus!')
            ->greeting('Hello ' . $this->user->name . ',')
            ->line('Woohoo! You\'ve just received ' . $settings['wallet_points']['signup_points'] . ' bonus points as a thank you for joining us!')
            ->line('Keep exploring, shopping, and enjoying our platform. Your points are just the beginning of a fantastic experience!')
            ->line('Thank you for becoming a part of our platform. Here\'s to exciting times ahead!')
            ->line('Enjoy your rewards!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        //for consumer
        $settings = Helpers::getSettings();
        return [
            'title' => "Wohoo!, You received the SignUp Bonus",
            'message' => "Welcome aboard! You've earned a signup bonus of {$settings['wallet_points']['signup_points']} credits. Enjoy your rewards!",
            'type' => "points"
        ];
    }
}
