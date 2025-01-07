<?php

namespace App\Providers;

use App\Events\PlaceOrderEvent;
use App\Events\VendorRegisterEvent;
use App\Listeners\PlaceOrderListener;
use Illuminate\Auth\Events\Registered;
use App\Events\SignUpBonusPointsEvent;
use App\Events\UpdateOrderStatusEvent;
use App\Events\UpdateRefundRequestEvent;
use App\Events\CreateRefundRequestEvent;
use App\Listeners\VendorRegisterListener;
use App\Events\UpdateWithdrawRequestEvent;
use App\Events\CreateWithdrawRequestEvent;
use App\Listeners\UpdateOrderStatusListener;
use App\Listeners\SignUpBonusPointsListener;
use App\Listeners\CreateRefundRequestListener;
use App\Listeners\UpdateRefundRequestListener;
use App\Listeners\CreateWithdrawRequestListener;
use App\Listeners\UpdateWithdrawRequestListener;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        VendorRegisterEvent::class => [
            VendorRegisterListener::class,
        ],
        SignUpBonusPointsEvent::class => [
            SignUpBonusPointsListener::class,
        ],
        PlaceOrderEvent::class => [
            PlaceOrderListener::class
        ],
        UpdateOrderStatusEvent::class => [
            UpdateOrderStatusListener::class
        ],
        CreateWithdrawRequestEvent::class => [
            CreateWithdrawRequestListener::class
        ],
        UpdateWithdrawRequestEvent::class => [
            UpdateWithdrawRequestListener::class
        ],
        CreateRefundRequestEvent::class => [
            CreateRefundRequestListener::class
        ],
        UpdateRefundRequestEvent::class => [
            UpdateRefundRequestListener::class
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     *
     * @return bool
     */
    public function shouldDiscoverEvents()
    {
        return false;
    }
}
