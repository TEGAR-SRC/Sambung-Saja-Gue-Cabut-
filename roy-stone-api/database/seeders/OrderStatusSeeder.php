<?php

namespace Database\Seeders;

use App\Enums\OrderEnum;
use App\Models\OrderStatus;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $orderStatus = [
            [
                'name' => OrderEnum::PENDING,
                'system_reserve' => 1,
                'sequence' => '1'
            ],
            [
                'name' => OrderEnum::PROCESSING,
                'system_reserve' => 1,
                'sequence' => '2'
            ],
            [
                'name' => OrderEnum::CANCELLED,
                'system_reserve' => 1,
                'sequence' => '3'
            ],
            [
                'name' => OrderEnum::SHIPPED,
                'system_reserve' => 1,
                'sequence' => '4'
            ],
            [
                'name' => OrderEnum::OUT_FOR_DELIVERY,
                'system_reserve' => 1,
                'sequence' => '5'
            ],
            [
                'name' => OrderEnum::DELIVERED,
                'system_reserve' => 1,
                'sequence' => '6'
            ]
        ];

        foreach ($orderStatus as $status) {
            if (!OrderStatus::where('name', $status['name'])->first()) {
                OrderStatus::create([
                    'name' => $status['name'],
                    'system_reserve' =>  $status['system_reserve'],
                    'sequence' => $status['sequence']
                ]);
            }
        }

        DB::table('seeders')->updateOrInsert([
            'name' => 'OrderStatusSeeder',
            'is_completed' => true
        ]);
    }
}
