<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(CountriesSeeder::class);
        $this->call(StateSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(CurrencySeeder::class);
        $this->call(DefaultImagesSeeder::class);
        $this->call(ThemeSeeder::class);
        $this->call(SettingSeeder::class);
        $this->call(HomePageSeeder::class);
        $this->call(ThemeOptionSeeder::class);
        $this->call(MenuSeeder::class);
        $this->call(OrderStatusSeeder::class);
    }
}
