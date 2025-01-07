<?php

namespace App\Providers;

use App\Models\Tag;
use App\Models\User;
use App\Models\Blog;
use App\Models\Store;
use App\Models\Theme;
use App\Models\Product;
use App\Enums\RoleEnum;
use App\Models\Attachment;
use App\Models\Category;
use App\Models\Shipping;
use App\Models\Attribute;
use App\Policies\TagPolicy;
use App\Models\ShippingRule;
use App\Policies\BlogPolicy;
use App\Policies\RolePolicy;
use App\Policies\UserPolicy;
use App\Policies\StorePolicy;
use App\Policies\ThemePolicy;
use App\Models\AttributeValue;
use App\Models\Page;
use App\Models\Setting;
use App\Policies\AttachmentPolicy;
use App\Policies\ProductPolicy;
use App\Policies\CategoryPolicy;
use App\Policies\ShippingPolicy;
use App\Policies\AttributePolicy;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Gate;
use App\Policies\ShippingRulePolicy;
use App\Policies\AttributeValuePolicy;
use App\Policies\PagePolicy;
use App\Policies\SettingPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',

        Tag::class => TagPolicy::class,
        User::class => UserPolicy::class,
        Role::class => RolePolicy::class,
        Page::class => PagePolicy::class,
        Blog::class => BlogPolicy::class,
        Store::class => StorePolicy::class,
        Theme::class => ThemePolicy::class,
        Setting::class => SettingPolicy::class,
        Product::class => ProductPolicy::class,
        Category::class => CategoryPolicy::class,
        Shipping::class => ShippingPolicy::class,
        Attribute::class => AttributePolicy::class,
        Attachment::class => AttachmentPolicy::class,
        ShippingRule::class => ShippingRulePolicy::class,
        AttributeValue::class => AttributeValuePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // Implicitly grant "Admin" role all permissions
        // This works in the app by using gate-related functions like auth()->user->can() and @can()
        Gate::before(function ($user, $ability) {
            return $user->hasRole(RoleEnum::ADMIN) ? true : null;
        });
    }
}
