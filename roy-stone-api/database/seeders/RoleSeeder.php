<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Store;
use App\Models\Module;
use App\Enums\RoleEnum;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;
class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $modules = [
            'users' => [
                'actions' => [
                    'index' => 'user.index',
                    'create'  => 'user.create',
                    'edit'    => 'user.edit',
                    'destroy' => 'user.destroy'
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index', 'create', 'edit', 'destroy'],
                ]
            ],
            'roles' => [
                'actions' => [
                    'index'   => 'role.index',
                    'create'  => 'role.create',
                    'edit'    => 'role.edit',
                    'destroy' => 'role.destroy'
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index', 'create', 'edit', 'destroy'],
                ]
            ],
            'products' => [
                'actions' => [
                    'index'   => 'product.index',
                    'create'  => 'product.create',
                    'edit'    => 'product.edit',
                    'destroy' => 'product.destroy'
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index','create', 'edit', 'destroy'],
                    RoleEnum::VENDOR => ['index','create', 'edit', 'destroy']
                ]
            ],
            'attributes' => [
                'actions' => [
                    'index'   => 'attribute.index',
                    'create'  => 'attribute.create',
                    'edit'    => 'attribute.edit',
                    'destroy' => 'attribute.destroy'
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index','create', 'edit', 'destroy'],
                    RoleEnum::VENDOR => ['index','create', 'edit', 'destroy']
                ]
            ],
            'categories' => [
                'actions' => [
                    'index'   => 'category.index',
                    'create'  => 'category.create',
                    'edit'    => 'category.edit',
                    'destroy' => 'category.destroy'
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index','create', 'edit', 'destroy'],
                ]
            ],
            'tags' => [
                'actions' => [
                    'index'   => 'tag.index',
                    'create'  => 'tag.create',
                    'edit'    => 'tag.edit',
                    'destroy' => 'tag.destroy'
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index','create', 'edit', 'destroy'],
                ]
            ],
            'brands' => [
                'actions' => [
                    'index'   => 'brand.index',
                    'create'  => 'brand.create',
                    'edit'    => 'brand.edit',
                    'destroy' => 'brand.destroy'
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index','create', 'edit', 'destroy'],
                    RoleEnum::VENDOR => ['index','create', 'edit', 'destroy']
                ]
            ],
            'license_keys' => [
                'actions' => [
                    'index'   => 'license_key.index',
                    'create'  => 'license_key.create',
                    'edit'    => 'license_key.edit',
                    'destroy' => 'license_key.destroy'
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index','create', 'edit', 'destroy'],
                    RoleEnum::VENDOR => ['index','create', 'edit', 'destroy']
                ]
            ],
            'stores' => [
                'actions' => [
                    'index'   => 'store.index',
                    'create'  => 'store.create',
                    'edit'    => 'store.edit',
                    'destroy' => 'store.destroy'
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index','create', 'edit', 'destroy'],
                ]
            ],
            'vendor_wallets' => [
                'actions' => [
                    'index' => 'vendor_wallet.index',
                    'credit'  => 'vendor_wallet.credit',
                    'debit'    => 'vendor_wallet.debit',
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index', 'credit', 'debit'],
                    RoleEnum::VENDOR => ['index']
                ]
            ],
            'commission_histories' => [
                'actions' => [
                    'index' => 'commission_history.index',
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index'],
                    RoleEnum::VENDOR => ['index']
                ]
            ],
            'withdraw_requests' => [
                'actions' => [
                    'index' => 'withdraw_request.index',
                    'create' => 'withdraw_request.create',
                    'action' => 'withdraw_request.action',
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index','create', 'action'],
                    RoleEnum::VENDOR => ['index', 'create']
                ]
            ],
            'orders' => [
                'actions' => [
                    'index'   => 'order.index',
                    'create'  => 'order.create',
                    'edit'    => 'order.edit',
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index', 'create', 'edit'],
                    RoleEnum::VENDOR => ['index','edit'],
                    RoleEnum::CONSUMER => ['index', 'create']
                ]
            ],
            'attachments' => [
                'actions' => [
                    'index'   => 'attachment.index',
                    'create'  => 'attachment.create',
                    'destroy' => 'attachment.destroy'
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index', 'create', 'destroy'],
                    RoleEnum::VENDOR => ['index', 'create','destroy']
                ]
            ],
            'blogs' => [
                'actions' => [
                    'index'   => 'blog.index',
                    'create'  => 'blog.create',
                    'edit'    => 'blog.edit',
                    'destroy' => 'blog.destroy'
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index', 'create', 'edit', 'destroy'],
                ]
            ],
            'pages' => [
                'actions' => [
                    'index'   => 'page.index',
                    'create'  => 'page.create',
                    'edit'    => 'page.edit',
                    'destroy' => 'page.destroy'
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index', 'create', 'edit', 'destroy'],
                ]
            ],
            'taxes' => [
                'actions' => [
                    'index'   => 'tax.index',
                    'create'  => 'tax.create',
                    'edit'    => 'tax.edit',
                    'destroy' => 'tax.destroy'
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index','create','edit','destroy'],
                ]
            ],
            'shippings' => [
                'actions' => [
                    'index'   => 'shipping.index',
                    'create'  => 'shipping.create',
                    'edit'    => 'shipping.edit',
                    'destroy' => 'shipping.destroy'
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index','create', 'edit', 'destroy'],
                ]
            ],
            'coupons' => [
                'actions' => [
                    'index'   => 'coupon.index',
                    'create'  => 'coupon.create',
                    'edit'    => 'coupon.edit',
                    'destroy' => 'coupon.destroy'
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index','create', 'edit', 'destroy'],
                    RoleEnum::VENDOR => ['index','create', 'edit', 'destroy']
                ]
            ],
            'currencies' => [
                'actions' => [
                    'index'   => 'currency.index',
                    'create'  => 'currency.create',
                    'edit'    => 'currency.edit',
                    'destroy' => 'currency.destroy'
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index', 'create', 'edit', 'destroy'],
                ]
            ],
            'points' => [
                'actions' => [
                    'index' => 'point.index',
                    'credit'  => 'point.credit',
                    'debit'    => 'point.debit',
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index', 'credit', 'debit'],
                    RoleEnum::CONSUMER => ['index'],
                ]
            ],
            'wallets' => [
                'actions' => [
                    'index' => 'wallet.index',
                    'credit'  => 'wallet.credit',
                    'debit'    => 'wallet.debit',
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index','credit', 'debit'],
                    RoleEnum::CONSUMER => ['index'],
                ]
            ],
            'refunds' => [
                'actions' => [
                    'index' => 'refund.index',
                    'create' => 'refund.create',
                    'action' => 'refund.action',
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index','create', 'action'],
                    RoleEnum::VENDOR => ['index', 'action'],
                    RoleEnum::CONSUMER => ['index','create'],
                ]
            ],
            'reviews' => [
                'actions' => [
                    'index' => 'review.index',
                    'create' => 'review.create',
                    'destroy' => 'review.destroy',
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index','create', 'destroy'],
                    RoleEnum::VENDOR => ['index'],
                    RoleEnum::CONSUMER => ['index', 'create', 'destroy'],
                ]
            ],
            'faqs' => [
                'actions' => [
                    'index' => 'faq.index',
                    'create' => 'faq.create',
                    'edit' => 'faq.edit',
                    'destroy' => 'faq.destroy',
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index','create', 'edit', 'destroy'],
                ]
            ],
            'questions_and_answers' => [
                'actions' => [
                    'index' => 'question_and_answer.index',
                    'create' => 'question_and_answer.create',
                    'edit' => 'question_and_answer.edit',
                    'destroy' => 'question_and_answer.destroy',
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index','create', 'edit', 'destroy'],
                    RoleEnum::VENDOR => ['index', 'create', 'edit'],
                    RoleEnum::CONSUMER => ['index','create', 'edit'],
                ]
            ],
            'subscribes' => [
                'actions' => [
                    'index'   => 'subscribe.index',
                    'create'  => 'subscribe.create',
                    'edit'    => 'subscribe.edit',
                    'destroy' => 'subscribe.destroy',
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index','create', 'edit', 'destroy'],
                ]
            ],
            'notices' => [
                'actions' => [
                    'index'   => 'notice.index',
                    'create'  => 'notice.create',
                    'edit'    => 'notice.edit',
                    'destroy' => 'notice.destroy',
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index','create', 'edit', 'destroy'],
                    RoleEnum::VENDOR => ['index'],
                ]
            ],
            'themes' => [
                'actions' => [
                    'index' => 'theme.index',
                    'edit' => 'theme.edit',
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index', 'edit'],
                ]
            ],
            'theme_options' => [
                'actions' => [
                    'index' => 'theme_option.index',
                    'edit' => 'theme_option.edit',
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index','edit'],
                ]
            ],
            'menus' => [
                'actions' => [
                    'index'   => 'menu.index',
                    'create'  => 'menu.create',
                    'edit'    => 'menu.edit',
                    'destroy' => 'menu.destroy',
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index','create', 'edit', 'destroy'],
                ]
            ],
            'app_settings' => [
                'actions' => [
                    'index'   => 'app_setting.index',
                    'edit'    => 'app_setting.edit',
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index', 'edit'],
                ]
            ],
            'settings' => [
                'actions' => [
                    'index'   => 'setting.index',
                    'edit'    => 'setting.edit',
                ],
                'roles' => [
                    RoleEnum::ADMIN => ['index', 'edit'],
                ]
            ],
        ];


        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $sequence = 0;
        $vendorPermissions = [];
        foreach ($modules as $key => $value) {
            $module = Module::updateOrCreate(['name' => $key, 'sequence' => ++$sequence]);
            foreach ($value['actions'] as $action => $permission) {
                if (!Permission::where('name', $permission)->first()){
                    $permission = Permission::create(['name' => $permission]);
                    $module->modulePermissions()->create([
                        'name' => $action,
                        'module_id' => $module->id,
                        'permission_id' => $permission->id,
                    ]);
                }

                foreach ($value['roles'] as $role => $allowed_actions) {
                    if ($role == RoleEnum::VENDOR) {
                        if (in_array($action, $allowed_actions)) {
                            $vendorPermissions[] = $permission;
                        }
                    }

                    if ($role == RoleEnum::CONSUMER) {
                        if (in_array($action, $allowed_actions)) {
                            $consumerPermissions[] = $permission;
                        }
                    }
                }
            }
        }

        $request = app('request')?->all();
        $adminRole = Role::create([
            'name' => RoleEnum::ADMIN,
            'system_reserve' => true
        ]);

        $adminRole->givePermissionTo(Permission::all());
        if (isset($request['admin']) && request()?->route()?->getName() == 'install.database.config') {
            $admin = User::factory()->create([
                'name' => $request['admin']['first_name'].''.$request['admin']['last_name'] ?? RoleEnum::ADMIN,
                'email' => $request['admin']['email'] ?? 'admin@example.com',
                'password' => $request['admin']['password'] ?? Hash::make('123456789'),
                'country_code' => (string) '1',
                'phone' => '9876502501',
                'system_reserve' => true,
            ]);
        } else {
            $admin = User::factory()->create([
                'name' => RoleEnum::ADMIN,
                'email' => 'admin@example.com',
                'password' => Hash::make('123456789'),
                'country_code' => (string) '1',
                'phone' => '9876502501',
                'system_reserve' => true,
            ]);
        }

        $admin->assignRole($adminRole);
        $consumerRole = Role::create([
            'name' => RoleEnum::CONSUMER,
            'system_reserve' => true
        ]);

        $consumerRole->givePermissionTo($consumerPermissions);
        $consumer = User::factory()->create([
            'name' => 'john due',
            'email' => 'john.customer@example.com',
            'password' => Hash::make('123456789'),
            'country_code' => (string) '1',
            'phone' => '78945622',
            'system_reserve' => false,
        ]);
        $consumer->assignRole($consumerRole);
        $consumer->wallet()->create();

        $vendorRole = Role::create([
            'name' => RoleEnum::VENDOR,
            'system_reserve' => true
        ]);

        $vendor = User::factory()->create([
            'name' => 'john dock',
            'email' => 'john.store@example.com',
            'password' => Hash::make('123456789'),
            'country_code' => (string) '1',
            'phone' => '764236512',
            'system_reserve' => false,
        ]);

        $vendorRole->givePermissionTo($vendorPermissions);
        $vendor->assignRole($vendorRole);
        $store = Store::create([
            'store_name' => 'Fruits Market',
            'description' => 'Welcome to Fruits Market, your gateway to a world of natural sweetness and vibrant flavors. At FruitE, we celebrate the beauty and goodness of fruits in their purest form',
            'country_id' => 840,
            'state_id' => 3757,
            'city' => 'San Jose',
            'address' => '4105 Park Street',
            'pincode' => '95110',
            'facebook' => "https://www.facebook.com/",
            'twitter' => "https://twitter.com/",
            'instagram'=> 'https://www.instagram.com/',
            'youtube'=> null,
            'pinterest'=> null,
            'store_logo_id'=> null,
            'store_cover_id'=> null,
            'hide_vendor_email' => 1,
            'hide_vendor_phone' => 1,
            'vendor_id' => $vendor->id,
            'status' => 1,
            'is_approved' => 1,
        ]);

        $store->vendor->vendor_wallet()->create();
        DB::table('seeders')->updateOrInsert([
            'name' => 'RoleSeeder',
            'is_completed' => true
        ]);
    }
}
