<?php

namespace App\Providers;

use App\Facades\AppMethods;
use App\Observers\RoleObserver;
use Spatie\Permission\Models\Role;
use Illuminate\Support\ServiceProvider;

class RoleObserverServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('App',function() {
            return new AppMethods();
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Role::observe(RoleObserver::class);
    }
}
