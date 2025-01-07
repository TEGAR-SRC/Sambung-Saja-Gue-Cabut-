<?php

namespace Database\Seeders;

use App\Models\Currency;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CurrencySeeder extends Seeder
{
    private $currencies = [
        [
            'code'   => 'USD',
            'symbol'  => '$',
            'no_of_decimal' => 2,
            'exchange_rate' => 1,
            'symbol_position' => 'before_price',
            'system_reserve' => 0,
            'status'    => 1
        ],
        [
            'code'   => 'INR',
            'symbol'  => '₹',
            'no_of_decimal' => 2,
            'exchange_rate' => 83,
            'symbol_position' => 'before_price',
            'system_reserve' => 0,
            'status'    => 1
        ],
        [
            'code'   => 'GBP',
            'symbol'  => '£',
            'no_of_decimal' => 2,
            'exchange_rate' => 100,
            'symbol_position' => 'before_price',
            'system_reserve' => 0,
            'status'    => 1
        ],
        [
            'code'   => 'EUR',
            'symbol'  => '€',
            'no_of_decimal' => 2,
            'exchange_rate' => 56,
            'symbol_position' => 'before_price',
            'system_reserve' => 0,
            'status'    => 1
        ]
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->currencies as $currency) {
            if (!Currency::where('code', $currency['code'])->first()) {
                Currency::create([
                    'code' => $currency['code'],
                    'symbol' => $currency['symbol'],
                    'no_of_decimal' => $currency['no_of_decimal'],
                    'exchange_rate' => $currency['exchange_rate'],
                    'symbol_position' => $currency['symbol_position'],
                    'system_reserve' => $currency['system_reserve'],
                    'status' => $currency['status']
                ]);
            }
        }

        DB::table('seeders')->updateOrInsert([
            'name' => 'CountriesSeeder',
            'is_completed' => true
        ]);
    }
}
