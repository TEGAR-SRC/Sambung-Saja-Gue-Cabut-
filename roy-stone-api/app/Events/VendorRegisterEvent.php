<?php

namespace App\Events;

use App\Models\Store;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;

class VendorRegisterEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $store;

    /**
     * Create a new event instance.
     */
    public function __construct(Store $store)
    {
        $this->store = $store;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn()
    {

    }
}
