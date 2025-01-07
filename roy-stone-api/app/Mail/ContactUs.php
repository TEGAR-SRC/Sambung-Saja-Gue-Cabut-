<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactUs extends Mailable
{
    use Queueable, SerializesModels;

    public $contact;

    /**
     * Create a new message instance.
     */
    public function __construct($contact)
    {
        $this->contact = $contact;
    }

     /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject("Contact Us - {$this->contact->subject}")->markdown('emails.contact-us');
    }
}
