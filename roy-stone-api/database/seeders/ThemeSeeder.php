<?php

namespace Database\Seeders;

use App\Models\Theme;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ThemeSeeder extends Seeder
{
    protected $baseURL;

    public function __construct()
    {
        $this->baseURL = config('app.url');
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $themes = [
            [
                'name'   => 'Fashion',
                'slug'  => 'fashion_one',
                'status'    => 1,
                'image' => '/admin/images/themes/fashion-1.png'
            ],
            [
                'name'   => 'Fashion 2',
                'slug'  => 'fashion_two',
                'status'    => 0,
                'image' => '/admin/images/themes/fashion-2.png'
            ],
            [
                'name'   => 'Fashion 3',
                'slug'  => 'fashion_three',
                'status' => 0,
                'image' => '/admin/images/themes/fashion-3.png'
            ],
            [
                'name'   => 'Fashion 4',
                'slug'  => 'fashion_four',
                'status' => 0,
                'image' => '/admin/images/themes/fashion-4.png'
            ],
            [
                'name'   => 'Fashion 5',
                'slug'  => 'fashion_five',
                'status' => 0,
                'image' => '/admin/images/themes/fashion-5.png'
            ],
            [
                'name'   => 'Fashion 6',
                'slug'  => 'fashion_six',
                'status' => 0,
                'image' => '/admin/images/themes/fashion-6.png'
            ],
            [
                'name'   => 'Fashion 7',
                'slug'  => 'fashion_seven',
                'status' => 0,
                'image' => '/admin/images/themes/fashion-7.png'
            ],
            [
                'name'   => 'Single Product',
                'slug'  => 'single_product',
                'status' => 0,
                'image' => '/admin/images/themes/single_product.png'
            ],
            [
                'name'   => 'Furniture',
                'slug'  => 'furniture_one',
                'status' => 0,
                'image' => '/admin/images/themes/furniture-1.png'
            ],
            [
                'name'   => 'Furniture 2',
                'slug'  => 'furniture_two',
                'status' => 0,
                'image' => '/admin/images/themes/furniture-2.png'
            ],
            [
                'name'   => 'Furniture Dark',
                'slug'  => 'furniture_dark',
                'status' => 0,
                'image' => '/admin/images/themes/furniture-dark.png'
            ],
            [
                'name'   => 'Electronics',
                'slug'  => 'electronics_one',
                'status' => 0,
                'image' => '/admin/images/themes/electronic-1.png'
            ],
            [
                'name'   => 'Electronics 2',
                'slug'  => 'electronics_two',
                'status' => 0,
                'image' => '/admin/images/themes/electronic-2.png'
            ],
            [
                'name'   => 'Electronics 3',
                'slug'  => 'electronics_three',
                'status' => 0,
                'image' => '/admin/images/themes/electronic-3.png'
            ],
            [
                'name'   => 'Marketplace',
                'slug'  => 'marketplace_one',
                'status' => 0,
                'image' => '/admin/images/themes/marketplace-1.png'
            ],
            [
                'name'   => 'Marketplace 2',
                'slug'  => 'marketplace_two',
                'status' => 0,
                'image' => '/admin/images/themes/marketplace-2.png'
            ],
            [
                'name'   => 'Marketplace 3',
                'slug'  => 'marketplace_three',
                'status' => 0,
                'image' => '/admin/images/themes/marketplace-3.png'
            ],
            [
                'name'   => 'Marketplace 4',
                'slug'  => 'marketplace_four',
                'status' => 0,
                'image' => '/admin/images/themes/marketplace-4.png'
            ],
            [
                'name'   => 'Vegetables',
                'slug'  => 'vegetables_one',
                'status' => 0,
                'image' => '/admin/images/themes/vegetable-1.png'
            ],
            [
                'name'   => 'Vegetables 2',
                'slug'  => 'vegetables_two',
                'status' => 0,
                'image' => '/admin/images/themes/vegetable-2.png'
            ],
            [
                'name'   => 'Vegetables 3',
                'slug'  => 'vegetables_three',
                'status' => 0,
                'image' => '/admin/images/themes/vegetable-3.png'
            ],
            [
                'name'   => 'Vegetables 4',
                'slug'  => 'vegetables_four',
                'status' => 0,
                'image' => '/admin/images/themes/vegetable-4.png'
            ],
            [
                'name'   => 'Jewellery',
                'slug'  => 'jewellery_one',
                'status' => 0,
                'image' => '/admin/images/themes/jewellery-1.png'
            ],
            [
                'name'   => 'Jewellery 2',
                'slug'  => 'jewellery_two',
                'status' => 0,
                'image' => '/admin/images/themes/jewellery-2.png'
            ],
            [
                'name'   => 'Jewellery 3',
                'slug'  => 'jewellery_three',
                'status' => 0,
                'image' => '/admin/images/themes/jewellery-3.png'
            ],
            [
                'name'   => 'Bag',
                'slug'  => 'bag',
                'status' => 0,
                'image' => '/admin/images/themes/bag.png'
            ],
            [
                'name'   => 'Watch',
                'slug'  => 'watch',
                'status' => 0,
                'image' => '/admin/images/themes/watch.png'
            ],
            [
                'name'   => 'Medical',
                'slug'  => 'medical',
                'status' => 0,
                'image' => '/admin/images/themes/medical.png'
            ],
            [
                'name'   => 'Perfume',
                'slug'  => 'perfume',
                'status' => 0,
                'image' => '/admin/images/themes/perfume.png'
            ],
            [
                'name'   => 'Yoga',
                'slug'  => 'yoga',
                'status' => 0,
                'image' => '/admin/images/themes/yoga.png'
            ],
            [
                'name'   => 'Christmas',
                'slug'  => 'christmas',
                'status' => 0,
                'image' => '/admin/images/themes/christmas.png'
            ],
            [
                'name'   => 'Bicycle',
                'slug'  => 'bicycle',
                'status' => 0,
                'image' => '/admin/images/themes/bicycle.png'
            ],
            [
                'name'   => 'Marijuana',
                'slug'  => 'marijuana',
                'status' => 0,
                'image' => '/admin/images/themes/marijuna.png'
            ],
            [
                'name'   => 'Gym',
                'slug'  => 'gym',
                'status' => 0,
                'image' => '/admin/images/themes/gym.png'
            ],
            [
                'name'   => 'Tools',
                'slug'  => 'tools',
                'status' => 0,
                'image' => '/admin/images/themes/tools.png'
            ],
            [
                'name'   => 'Shoes',
                'slug'  => 'shoes',
                'status' => 0,
                'image' => '/admin/images/themes/shoes.png'
            ],
            [
                'name'   => 'Books',
                'slug'  => 'books',
                'status' => 0,
                'image' => '/admin/images/themes/books.png'
            ],
            [
                'name'   => 'Kids',
                'slug'  => 'kids',
                'status' => 0,
                'image' => '/admin/images/themes/kids.png'
            ],
            [
                'name'   => 'Game',
                'slug'  => 'game',
                'status' => 0,
                'image' => '/admin/images/themes/games.png'
            ],
            [
                'name'   => 'Beauty',
                'slug'  => 'beauty',
                'status' => 0,
                'image' => '/admin/images/themes/beauty.png'
            ],
            [
                'name'   => 'Surf Board',
                'slug'  => 'surfboard',
                'status' => 0,
                'image' => '/admin/images/themes/surfboard.png'
            ],
            [
                'name'   => 'Video Slider',
                'slug'  => 'video_slider',
                'status' => 0,
                'image' => '/admin/images/themes/vedio_slider.png'
            ],
            [
                'name'   => 'Goggles',
                'slug'  => 'goggles',
                'status' => 0,
                'image' => '/admin/images/themes/goggles.png'
            ],
            [
                'name'   => 'Flower',
                'slug'  => 'flower',
                'status' => 0,
                'image' => '/admin/images/themes/flowers.png'
            ],
            [
                'name'   => 'Nursery',
                'slug'  => 'nursery',
                'status' => 0,
                'image' => '/admin/images/themes/nursery.png'
            ],
            [
                'name'   => 'Pets',
                'slug'  => 'pets',
                'status' => 0,
                'image' => '/admin/images/themes/pets.png'
            ],
            [
                'name'   => 'Video',
                'slug'  => 'video',
                'status' => 0,
                'image' => '/admin/images/themes/vedio.png'
            ],
            [
                'name'   => 'Full Page',
                'slug'  => 'full_page',
                'status' => 0,
                'image' => '/admin/images/themes/full_page.png'
            ],
            [
                'name'   => 'Parallax',
                'slug'  => 'parallax',
                'status' => 0,
                'image' => '/admin/images/themes/parallax.png'
            ],
            [
                'name'   => 'Gradient',
                'slug'  => 'gradient',
                'status' => 0,
                'image' => '/admin/images/themes/gradient.png'
            ],
            [
                'name'   => 'Digital Download',
                'slug'  => 'digital_download',
                'status' => 0,
                'image' => '/admin/images/themes/digital_download.png'
            ]
        ];

        foreach ($themes as $theme) {
            if (!Theme::where('name', $theme['name'])->first()) {
                Theme::create([
                    'name' => $theme['name'],
                    'slug' => $theme['slug'],
                    'status'=> $theme['status'],
                    'image' => $theme['image']
                ]);
            }
        }

        DB::table('seeders')->updateOrInsert([
            'name' => 'ThemeSeeder',
            'is_completed' => true
        ]);
    }
}
