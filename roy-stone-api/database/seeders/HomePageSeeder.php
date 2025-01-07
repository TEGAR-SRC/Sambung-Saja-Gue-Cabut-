<?php

namespace Database\Seeders;

use App\Models\HomePage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HomePageSeeder extends Seeder
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
        $contents = [
            'fashion_one' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'fashion',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_one/fashion_one_9.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'fashion',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_one/fashion_one_2.png',
                            ],
                        ],
                    ],
                    'offer_banner' => [
                        'banner_1' => [
                            'image_url' => '/frontend/images/fashion_one/fashion_one_8.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'fashion',
                                'link_type' => null,
                            ],
                        ],
                        'banner_2' => [
                            'image_url' => '/frontend/images/fashion_one/fashion_one_7.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'fashion',
                                'link_type' => null,
                            ],
                        ],
                    ],
                    'products_list' => [
                        'tag' => 'special offer',
                        'title' => 'Latest Drops',
                        'description' => 'Looking for the latest trends in clothing, shoes and accessories? Welcome to our \'Latest Drops\' edit, bringing you all the latest styles from all your fave brands.',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'banner' => [
                        'image_url' => '/frontend/images/fashion_one/fashion_one_5.png',
                        'redirect_link' => [
                            'link' => null,
                            'link_type' => null,
                            'product_ids' => null,
                        ],
                        'status' => true,
                    ],
                    'category_product' => [
                        'tag' => 'exclusive products',
                        'title' => 'everyday casual',
                        'category_ids' => [],
                        'status' => true,
                    ],
                    'services' => [
                        'banners' => [
                            [
                                'title' => 'free shipping',
                                'description' => 'free shipping world wide',
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_one/service.png',
                            ],
                            [
                                'title' => '24 X 7 service',
                                'description' => 'online service for new customer',
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_one/service.png',
                            ],
                            [
                                'title' => 'festival offer',
                                'description' => 'new online special festival offer',
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_one/service.png',
                            ],
                        ],
                    ],
                    'featured_blogs' => [
                        'tag' => 'From the Blog',
                        'title' => 'From the Blog',
                        'status' => true,
                        'blog_ids' => [],
                    ],
                    'social_media' => [
                        'title' => '#WHOWEARWHAT',
                        'status' => true,
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_one/fashion_one_insta_7.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_one/fashion_one_insta_6.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_one/fashion_one_insta_5.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_one/fashion_one_insta_4.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_one/fashion_one_insta_3.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_one/fashion_one_insta_2.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_one/fashion_one_insta_1.png',
                            ],
                        ],
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => true,
                    ],
                    'products_ids' => []
                ]
            ],

            'fashion_two' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'fashion',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_two/fashion_two_1.png',
                            ],
                        ],
                    ],
                    'offer_banner' => [
                        'banner_1' => [
                            'image_url' => '/frontend/images/fashion_two/fashion_two_3.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'fashion',
                                'link_type' => null,
                            ],
                        ],
                        'banner_2' => [
                            'image_url' => '/frontend/images/fashion_two/fashion_two_4.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'fashion',
                                'link_type' => null,
                            ],
                        ],
                        'banner_3' => [
                            'image_url' => '/frontend/images/fashion_two/fashion_two_5.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'fashion',
                                'link_type' => null,
                            ],
                        ],
                        'banner_4' => [
                            'image_url' => '/frontend/images/fashion_two/fashion_two_6.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'fashion',
                                'link_type' => null,
                            ],
                        ],
                    ],
                    'category_product' => [
                        'tag' => 'exclusive products',
                        'title' => 'special products',
                        'category_ids' => [],
                        'status' => true,
                    ],
                    'full_banner' => [
                        'image_url' => '/frontend/images/fashion_two/fashion_two_2.png',
                        'status' => true,
                        'redirect_link' => [
                            'link' => 'fashion',
                            'link_type' => null,
                        ],
                    ],
                    'slider_products' => [
                        'status' => true,
                        'product_slider_1' => [
                            'title' => 'new products',
                            'product_ids' => [],
                            'status' => true,
                        ],
                        'product_slider_2' => [
                            'title' => 'feature product',
                            'product_ids' => [],
                            'status' => true,
                        ],
                        'product_slider_3' => [
                            'title' => 'best seller',
                            'product_ids' => [],
                            'status' => true,
                        ],
                        'product_slider_4' => [
                            'title' => 'on sell',
                            'product_ids' => [],
                            'status' => true,
                        ],
                    ],
                    'social_media' => [
                        'title' => '# Instagram',
                        'status' => true,
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_one/fashion_one_insta_6.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_one/fashion_one_insta_7.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_one/fashion_one_insta_5.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_one/fashion_one_insta_4.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_one/fashion_one_insta_3.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_one/fashion_one_insta_2.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_one/fashion_one_insta_1.png',
                            ],
                        ],
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => false,
                    ],
                    'products_ids' => []
                ]
            ],

            'fashion_three' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'fashion',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_three/fashion_three_2.png',
                            ],
                        ],
                    ],
                    'products_list' => [
                        'tag' => 'special offer',
                        'title' => 'top collection',
                        'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'full_banner' => [
                        'image_url' => '/frontend/images/fashion_three/fashion_three_1.png',
                        'status' => true,
                        'redirect_link' => [
                            'link' => null,
                            'link_type' => null,
                            'product_ids' => null,
                        ],
                    ],
                    'category_product' => [
                        'tag' => 'exclusive products',
                        'title' => 'special products',
                        'category_ids' => [],
                        'status' => true,
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => true,
                    ],
                    'products_ids' => []
                ]
            ],

            'fashion_four' => [
                'content' => [
                    'home_banner' => [
                        'status' => false,
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'fashion',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_four/fashion_four_1.png',
                            ],
                        ],
                    ],
                    'offer_banner_1' => [
                        'banner_1' => [
                            'image_url' => '/frontend/images/fashion_four/fashion_four_2.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => null,
                                'link_type' => null,
                                'product_ids' => null,
                            ],
                        ],
                        'banner_2' => [
                            'image_url' => '/frontend/images/fashion_four/fashion_four_3.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'fashion',
                                'link_type' => null,
                            ],
                        ],
                        'banner_3' => [
                            'image_url' => '/frontend/images/fashion_four/fashion_four_4.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'fashion',
                                'link_type' => null,
                            ],
                        ],
                    ],
                    'products_list' => [
                        'status' => true,
                        'categories' => [
                            'category_ids' => [],
                            'status' => true,
                        ],
                        'products' => [
                            'tag' => 'recent story',
                            'title' => 'trending products',
                            'product_ids' => [],
                            'status' => true,
                        ],
                    ],
                    'offer_banner_2' => [
                        'image_url' => '/frontend/images/fashion_four/fashion_four_5.png',
                        'status' => true,
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => true,
                    ],
                    'products_ids' => []
                ]
            ],

            'fashion_five' => [
                'content' => [
                    'home_banner' => [
                        'status' => true,
                        'image_url' => '/frontend/images/fashion_five/fashion_five_1.png',
                        'redirect_link' => [
                            'link' => 'lingerie',
                            'link_type' => null,
                        ],
                    ],
                    'categories' => [
                        'status' => true,
                        'title' => 'Shop By Category',
                        'category_ids' => [],
                    ],
                    'deals_banner' => [
                        'status' => true,
                        'image_url' => '/frontend/images/fashion_five/fashion_five_2.png',
                        'redirect_link' => [
                            'link' => null,
                            'link_type' => null,
                            'product_ids' => null,
                        ],
                    ],
                    'category_product' => [
                        'title' => 'Everyday Casual',
                        'category_ids' => [],
                        'status' => true,
                    ],
                    'offer_banner' => [
                        'image_url' => '/frontend/images/fashion_five/fashion_five_3.png',
                        'redirect_link' => [
                            'link' => 'lingerie',
                            'link_type' => null,
                        ],
                        'status' => true,
                    ],
                    'social_media' => [
                        'status' => true,
                        'title' => 'Insta Shop',
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_five/fashion_five_insta_4.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_five/fashion_five_insta_5.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_five/fashion_five_insta_3.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_five/fashion_five_insta_2.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_five/fashion_five_insta_1.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_one/fashion_one_insta_6.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_one/fashion_one_insta_1.png',
                            ],
                        ],
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => true,
                    ],
                    'products_ids' => []
                ]
            ],

            'fashion_six' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'fashion',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_six/fashion_six_1.png',
                            ],
                        ],
                    ],
                    'offer_banner' => [
                        'status' => true,
                        'banner_1' => [
                            'image_url' => '/frontend/images/fashion_six/fashion_six_2.png',
                            'redirect_link' => [
                                'link' => 'fashion',
                                'link_type' => null,
                            ],
                        ],
                        'banner_2' => [
                            'image_url' => '/frontend/images/fashion_six/fashion_six_3.png',
                            'redirect_link' => [
                                'link' => 'fashion',
                                'link_type' => null,
                            ],
                        ],
                        'banner_3' => [
                            'image_url' => '/frontend/images/fashion_six/fashion_six_4.png',
                            'redirect_link' => [
                                'link' => 'fashion',
                                'link_type' => null,
                            ],
                        ],
                        'banner_4' => [
                            'image_url' => '/frontend/images/fashion_six/fashion_six_5.png',
                            'redirect_link' => [
                                'link' => 'fashion',
                                'link_type' => null,
                            ],
                        ],
                        'banner_5' => [
                            'image_url' => '/frontend/images/fashion_six/fashion_six_7.png',
                            'redirect_link' => [
                                'link' => 'fashion',
                                'link_type' => null,
                            ],
                        ],
                        'banner_6' => [
                            'image_url' => '/frontend/images/fashion_six/fashion_six_6.png',
                            'redirect_link' => [
                                'link' => 'fashion',
                                'link_type' => null,
                            ],
                        ],
                    ],
                    'products_list_1' => [
                        'tag' => 'recent story',
                        'title' => 'trending products',
                        'status' => true,
                        'product_ids' => [],
                    ],
                    'product_banner' => [
                        'status' => true,
                        'image_url' => '/frontend/images/fashion_six/fashion_six_8.png',
                        'product_slider_1' => [
                            'title' => 'new product',
                            'product_ids' => [],
                            'status' => true,
                        ],
                    ],
                    'products_list_2' => [
                        'status' => true,
                        'products' => [
                            'tag' => 'recent story',
                            'title' => 'trending products',
                            'product_ids' => [],
                        ],
                        'right_panel' => [
                            'image_url' => '/frontend/images/fashion_six/fashion_six_9.png',
                            'status' => true,
                        ],
                    ],
                    'featured_blogs' => [
                        'title' => 'trending Blogs',
                        'tag' => 'recent story',
                        'status' => true,
                        'blog_ids' => [],
                    ],
                    'social_media' => [
                        'title' => '# instagram',
                        'status' => true,
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_six/fashion_six_insta_1.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_six/fashion_six_insta_2.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_six/fashion_six_insta_3.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_six/fashion_six_insta_4.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_six/fashion_six_insta_5.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_six/fashion_six_insta_6.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/fashion_six/fashion_six_insta_7.png',
                            ],
                        ],
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => true,
                    ],
                    'products_ids' => []
                ]
            ],

            'single_product' => [
                'content' => [
                    'home_banner' => [
                        'status' => true,
                        'title' => 'EVERYTHING YOU WANT NEED AND MORE',
                        'description' => 'A versatile and innovative device that seamlessly integrates with your daily life. With features like fitness tracking, heart rate monitoring, and sleep analysis.',
                        'show_button' => true,
                        'button_text' => 'Shop Now',
                        'redirect_link' => [
                            'link' => 'time-sphere',
                            'link_type' => null,
                        ],
                        'banner_image' => '/frontend/images/single_product/1.png',
                    ],
                    'services' => [
                        'status' => true,
                        'left_panel' => [
                            'title' => 'STRONG OBSERVATIONS WITH A GLANCE.',
                            'description' => 'Exceptionally accurate health monitoring that kept Saty informed. Reminders to stay vigilant for unusual findings in your health data.',
                            'status' => true,
                        ],
                        'right_panel' => [
                            'banners' => [
                                [
                                    'title' => 'Blood-oxygen',
                                    'description' => 'The blood-oxygen monitoring your SpO2 levels, providing valuable insights into your overall respiratory health.',
                                    'status' => true,
                                    'image_url' => '/frontend/images/single_product/2.png',
                                ],
                                [
                                    'title' => 'Heart Rate',
                                    'description' => 'This function assists you in tracking your progress over time, understanding your heart rate zones, and optimising your exercise.',
                                    'status' => true,
                                    'image_url' => '/frontend/images/single_product/2.png',
                                ],
                                [
                                    'title' => 'Water Resistance',
                                    'description' => 'This degree of water resistance gives you the assurance that your smartwatch will follow you on all of your adventures.',
                                    'status' => true,
                                    'image_url' => '/frontend/images/single_product/2.png',
                                ],
                            ],
                        ],
                    ],
                    'grid_banner' => [
                        'banner_1' => [
                            'image_url' => '/frontend/images/single_product/grid-banner-1.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'time-sphere',
                                'link_type' => null,
                            ],
                        ],
                        'banner_2' => [
                            'image_url' => '/frontend/images/single_product/grid-banner-2.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'time-sphere',
                                'link_type' => null,
                            ],
                        ],
                        'banner_3' => [
                            'image_url' => '/frontend/images/single_product/grid-banner-3.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'time-sphere',
                                'link_type' => null,
                            ],
                        ],
                    ],
                    'product_video' => [
                        'status' => true,
                        'image' => '/frontend/images/single_product/product-vedio.mp4',
                        'video' => '/frontend/images/single_product/product-vedio.mp4',
                    ],
                    'single_product' => [
                        'title' => 'Limited time deal Buy Now',
                        'product_ids' => null,
                        'status' => true,
                    ],
                    'products_list' => [
                        'title' => 'TIME TO FIND YOUR WATCH',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'testimonial' => [
                        'title' => 'Some comment from our user',
                        'status' => true,
                        'banners' => [
                            [
                                'name' => 'Albert Flores',
                                'image_url' => '/frontend/images/single_product/testimonials.png',
                                'review' => 'I\'ve tried several smartwatches, but this one stands out for its exceptional performance and design. The seamless connectivity with my smartphone ensures I receive all important notifications without any delays.',
                                'status' => true,
                            ],
                            [
                                'name' => 'Theresa Webb',
                                'image_url' => '/frontend/images/single_product/testimonials.png',
                                'review' => '“The smartwatch has been a game-changer for me. From the moment I put it on, I was impressed by its sleek design and intuitive interface. The fitness tracking features are incredibly detailed',
                                'status' => true,
                            ],
                            [
                                'name' => 'Cody Fisher',
                                'image_url' => '/frontend/images/single_product/testimonials.png',
                                'review' => 'I was skeptical about getting a smartwatch, but this one exceeded all my expectations. It seamlessly syncs with my phone, delivering notifications and updates right to my wrist.',
                                'status' => true,
                            ],
                            [
                                'name' => 'Robert Fox',
                                'image_url' => '/frontend/images/single_product/testimonials.png',
                                'review' => 'I love how it tracks my sleep patterns, exercise, and heart rate, providing valuable insights into my health. The notification system is flawless, ensuring I never miss a call or message.',
                                'status' => true,
                            ],
                            [
                                'name' => 'Savannah Nguyen',
                                'image_url' => '/frontend/images/single_product/testimonials.png',
                                'review' => 'As someone who values both functionality and style, this smartwatch ticks all the boxes. The user interface is incredibly user-friendly, and the customization options allow me to tailor it to my needs.',
                                'status' => true,
                            ],
                        ],
                    ],
                    'social_media' => [
                        'status' => true,
                        'title' => '# INSTAGRAM',
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/single_product/social-media.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/single_product/social-media.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/single_product/social-media.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/single_product/social-media.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/single_product/social-media.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/single_product/social-media.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/single_product/social-media.png',
                            ],
                        ],
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => true,
                    ],
                    'products_ids' => [],
                ]
            ],

            'fashion_seven' => [
                'content' => [
                    'home_banner' => [
                        'status' => true,
                        'image_url' => '/frontend/images/fashion_seven/fashion_seven_1.png',
                        'redirect_link' => [
                            'link' => 'fit-gear-central',
                            'link_type' => null,
                        ],
                    ],
                    'featured_banners' => [
                        'banner_1' => [
                            'status' => true,
                            'image_url' => '/frontend/images/fashion_seven/fashion_seven_2.png',
                            'redirect_link' => [
                                'link' => 'fit-gear-central',
                                'link_type' => null,
                            ],
                        ],
                        'banner_2' => [
                            'status' => true,
                            'image_url' => '/frontend/images/fashion_seven/fashion_seven_3.png',
                            'redirect_link' => [
                                'link' => 'fit-gear-central',
                                'link_type' => null,
                            ],
                        ],
                        'banner_3' => [
                            'status' => true,
                            'image_url' => '/frontend/images/fashion_seven/fashion_seven_4.png',
                            'redirect_link' => [
                                'link' => 'fit-gear-central',
                                'link_type' => null,
                            ],
                        ],
                    ],
                    'products_list_1' => [
                        'tag' => 'special offer',
                        'title' => 'top collection',
                        'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                        'category_id' => [],
                        'more_button' => true,
                        'button_text' => 'load more',
                        'status' => true,
                    ],
                    'product_banner' => [
                        'image_url' => '/frontend/images/fashion_seven/fashion_seven_5.png',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'products_list_2' => [
                        'status' => true,
                        'left_panel' => [
                            'title' => 'Biggest offer of the sale',
                            'description' => 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo totam officiis nisi neque non ex, odio atque digniss ab suscipit? Iste',
                            'more_button' => true,
                            'button_text' => 'view all product',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'fit-gear-central',
                                'link_type' => null,
                                'product_ids' => null,
                            ],
                        ],
                        'products' => [
                            'product_ids' => [],
                        ],
                    ],
                    'offer_banner' => [
                        'banner_1' => [
                            'status' => true,
                            'image_url' => '/frontend/images/fashion_seven/fashion_seven_7.png',
                            'redirect_link' => [
                                'link' => null,
                                'link_type' => null,
                                'product_ids' => null,
                            ],
                        ],
                        'banner_2' => [
                            'status' => true,
                            'image_url' => '/frontend/images/fashion_seven/fashion_seven_6.png',
                            'redirect_link' => [
                                'link' => 'fashion',
                                'link_type' => null,
                            ],
                        ],
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => true,
                    ],
                    'products_ids' => []
                ]
            ],

            'furniture_one' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'classic-furnishings',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/furniture_one/furniture_one_1.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'classic-furnishings',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/furniture_one/furniture_one_5.png',
                            ],
                        ],
                    ],
                    'offer_banner' => [
                        'banner_1' => [
                            'image_url' => '/frontend/images/furniture_one/furniture_one_4.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'classic-furnishings',
                                'link_type' => null,
                            ],
                        ],
                        'banner_2' => [
                            'image_url' => '/frontend/images/furniture_one/furniture_one_3.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'classic-furnishings',
                                'link_type' => null,
                            ],
                        ],
                        'banner_3' => [
                            'image_url' => '/frontend/images/furniture_one/furniture_one_2.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'classic-furnishings',
                                'link_type' => null,
                            ],
                        ],
                    ],
                    'products_list' => [], 
                    'full_banner' => [
                        'image_url' => '/frontend/images/furniture_one/furniture_one_1.png',
                        'redirect_link' => [
                            'link' => 'classic-furnishings',
                            'link_type' => null,
                        ],
                        'status' => true,
                    ],
                    'featured_blogs' => [
                        'tag' => 'recent story',
                        'title' => 'latest blog',
                        'status' => true,
                        'blog_ids' => [],
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => true,
                    ],
                    'products_ids' => []
                ]
            ],

            'furniture_two' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'classic-furnishings',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/furniture_one/furniture_one_5.png'
                            ]
                        ]
                    ],
                    'offer_banner' => [
                        'banner_1' => [
                            'image_url' => '/frontend/images/furniture_two/furniture_two_banner.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'classic-furnishings',
                                'link_type' => null
                            ]
                        ],
                        'banner_2' => [
                            'image_url' => '/frontend/images/furniture_two/furniture_two_banner.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'classic-furnishings',
                                'link_type' => null
                            ]
                        ],
                        'banner_3' => [
                            'image_url' => '/frontend/images/furniture_two/furniture_two_banner.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'classic-furnishings',
                                'link_type' => null
                            ]
                        ]
                    ],
                    'categories_icon_list' => [
                        'status' => true,
                        'category_ids' => []
                    ],
                    'products_list_1' => [
                        'tag' => 'special offer',
                        'title' => 'top collection',
                        'description' => 'Find Various types of quality chairs, and international standards. only with this one website you can see and buy quality chairs. immediately order the best seat.',
                        'product_ids' => [],
                        'status' => true
                    ],
                    'grid_banner' => [
                        'status' => true,
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/furniture_two/grid-banner-1.png',
                                'tag' => null,
                                'title' => null,
                                'button_text' => null
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'classic-furnishings',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => null,
                                'tag' => 'new products',
                                'title' => 'zipper storage bag',
                                'button_text' => '-80% off'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'classic-furnishings',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/furniture_two/grid-banner-2.png',
                                'tag' => null,
                                'title' => null,
                                'button_text' => null
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'classic-furnishings',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => null,
                                'tag' => 'new products',
                                'title' => 'zipper storage bag',
                                'button_text' => '-80% off'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'classic-furnishings',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/furniture_two/grid-banner-2.png',
                                'tag' => null,
                                'title' => null,
                                'button_text' => null
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'classic-furnishings',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/furniture_two/grid-banner-2.png',
                                'tag' => 'new products',
                                'title' => 'zipper storage bag',
                                'button_text' => '-80% off'
                            ],
                        ]
                    ],
                    'product_list_2' => [
                        'status' => true,
                        'products' => [
                            'product_item' => [
                                'product_ids' => []
                            ],
                            'product_banner' => [
                                'banner_1' => [
                                    'image_url' => '/frontend/images/furniture_two/product-list-1.png',
                                    'status' => true,
                                    'redirect_link' => [
                                        'link' => 'classic-furnishings',
                                        'link_type' => null
                                    ]
                                ],
                                'banner_2' => [
                                    'image_url' => '/frontend/images/furniture_two/product-list-1.png',
                                    'status' => true,
                                    'redirect_link' => [
                                        'link' => 'classic-furnishings',
                                        'link_type' => null
                                    ]
                                ]
                            ]
                        ],
                        'right_panel' => [
                            'title' => 'new products',
                            'product_ids' => [],
                            'status' => true
                        ]
                    ],
                    'social_media' => [
                        'title' => '# instagram',
                        'status' => true,
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/furniture_two/furniture_two_insta_1.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/furniture_two/furniture_two_insta_2.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/furniture_two/furniture_two_insta_3.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/furniture_two/furniture_two_insta_4.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/furniture_two/furniture_two_insta_5.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/furniture_two/furniture_two_insta_6.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/furniture_two/furniture_two_insta_7.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/furniture_two/furniture_two_insta_8.png'
                            ]
                        ]
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => true
                    ],
                    'products_ids' => []
                ]
            ],

            'furniture_dark' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'classic-furnishings',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/furniture_three/furniture_three_1.png'
                            ]
                        ]
                    ],
                    'offer_banner' => [
                        'banner_1' => [
                            'image_url' => '/frontend/images/furniture_three/furniture_three_9.png',
                            'title' => 'save 30%',
                            'sub_title' => 'Accent',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'classic-furnishings',
                                'link_type' => null
                            ]
                        ],
                        'banner_2' => [
                            'image_url' => '/frontend/images/furniture_three/furniture_three_11.png',
                            'title' => 'save 60%',
                            'sub_title' => 'Stool',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'classic-furnishings',
                                'link_type' => null
                            ]
                        ],
                        'banner_3' => [
                            'image_url' => '/frontend/images/furniture_three/furniture_three_10.png',
                            'title' => 'save 60%',
                            'sub_title' => 'Lounge',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'classic-furnishings',
                                'link_type' => null
                            ]
                        ]
                    ],
                    'products_list_1' => [
                        'tag' => 'special offer',
                        'title' => 'top collection',
                        'description' => 'Find Various types of quality chairs, and international standards. only with this one website you can see and buy quality chairs. immediately order the best seat.',
                        'product_ids' => [],
                        'status' => true
                    ],
                    'categories_icon_list' => [
                        'status' => true,
                        'category_ids' => []
                    ],
                    'banner' => [
                        'status' => true,
                        'banner_1' => [
                            'image_url' => '/frontend/images/furniture_three/furniture_three_6.png',
                            'redirect_link' => [
                                'link' => null,
                                'link_type' => null
                            ]
                        ],
                        'banner_2' => [
                            'image_url' => '/frontend/images/furniture_three/furniture_three_7.png',
                            'redirect_link' => [
                                'link' => 'classic-furnishings',
                                'link_type' => null
                            ]
                        ],
                        'banner_3' => [
                            'image_url' => '/frontend/images/furniture_three/furniture_three_5.png',
                            'redirect_link' => [
                                'link' => 'classic-furnishings',
                                'link_type' => null
                            ]
                        ]
                    ],
                    'product_list_2' => [
                        'status' => true,
                        'left_panel' => [
                            'image_url' => '/frontend/images/furniture_three/furniture_three_8.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'classic-furnishings',
                                'link_type' => null
                            ]
                        ],
                        'products' => [
                            'product_ids' => []
                        ]
                    ],
                    'services' => [
                        'banners' => [
                            [
                                'title' => 'free shipping',
                                'description' => 'free shipping world wide',
                                'status' => true,
                                'image_url' => '/frontend/images/furniture_three/service.png'
                            ],
                            [
                                'title' => '24 X 7 service',
                                'description' => 'online service for new customer',
                                'status' => true,
                                'image_url' => '/frontend/images/furniture_three/service.png'
                            ],
                            [
                                'title' => 'online payment',
                                'description' => 'new online special festival offer',
                                'status' => true,
                                'image_url' => '/frontend/images/furniture_three/service.png'
                            ]
                        ]
                    ],
                    'featured_blogs' => [
                        'tag' => 'Recent Story',
                        'title' => 'from the blog',
                        'status' => true,
                        'blog_ids' => []
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => false
                    ],
                    'products_ids' => []
                ]
            ],

            'electronics_one' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/electronic_one/electronic_one_1.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/electronic_one/electronic_one_2.png'
                            ]
                        ]
                    ],
                    'offer_banner' => [
                        'banner_1' => [
                            'image_url' => '/frontend/images/electronic_one/electronic_one_3.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'time-sphere',
                                'link_type' => null
                            ]
                        ],
                        'banner_2' => [
                            'image_url' => '/frontend/images/electronic_one/electronic_one_4.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'time-sphere',
                                'link_type' => null
                            ]
                        ],
                        'banner_3' => [
                            'image_url' => '/frontend/images/electronic_one/electronic_one_5.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'time-sphere',
                                'link_type' => null
                            ]
                        ]
                    ],
                    'category_product' => [
                        'tag' => 'new collection',
                        'title' => 'trending products',
                        'category_ids' => [],
                        'status' => true
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => true
                    ],
                    'products_ids' => []
                ]
            ],

            'electronics_two' => [
                'content' => [
                    'home_banner' => [
                        'banner_1' => [
                            'image_url' => '/frontend/images/electronic_two/electronic_two_1.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => null,
                                'link_type' => null,
                                'product_ids' => null
                            ]
                        ],
                        'banner_2' => [
                            'image_url' => '/frontend/images/electronic_two/electronic_two_2.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => null,
                                'link_type' => null,
                                'product_ids' => null
                            ]
                        ],
                        'banner_3' => [
                            'image_url' => '/frontend/images/electronic_two/electronic_two_3.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => null,
                                'link_type' => null,
                                'product_ids' => null
                            ]
                        ]
                    ],
                    'offer_banner' => [
                        'banner_1' => [
                            'image_url' => '/frontend/images/electronic_two/electronic_two_4.png',
                            'status' => true,
                            'redirect_link' => [
                                'link_type' => null
                            ]
                        ],
                        'banner_2' => [
                            'image_url' => '/frontend/images/electronic_two/electronic_two_5.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => null,
                                'link_type' => null,
                                'product_ids' => null
                            ]
                        ],
                        'banner_3' => [
                            'image_url' => '/frontend/images/electronic_two/electronic_two_6.png',
                            'status' => true,
                            'redirect_link' => [
                                'link_type' => null
                            ]
                        ]
                    ],
                    'category_product' => [
                        'category_ids' => [],
                        'status' => true
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => true
                    ],
                    'products_ids' => []
                ]
            ],

            'electronics_three' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'powerhouse-electronics',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/electronic_three/electronic_three_1.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/electronic_three/Group-1215992330.png'
                            ]
                        ]
                    ],
                    'services' => [
                        'banners' => [
                            [
                                'title' => 'Free Shipping',
                                'description' => 'Free Shipping World Wide',
                                'status' => true,
                                'image_url' => '/frontend/images/electronic_three/service.png'
                            ],
                            [
                                'title' => '24 X 7 Service',
                                'description' => 'Online Service For 24 X 7',
                                'status' => true,
                                'image_url' => '/frontend/images/electronic_three/service.png'
                            ],
                            [
                                'title' => 'Festival Offer',
                                'description' => 'New Online Special Festival Offer',
                                'status' => true,
                                'image_url' => '/frontend/images/electronic_three/service.png'
                            ],
                            [
                                'title' => 'Online Payment',
                                'description' => 'New Online Special Festival Offer',
                                'status' => true,
                                'image_url' => '/frontend/images/electronic_three/service.png'
                            ]
                        ]
                    ],
                    'products_list_1' => [
                        'title' => 'deals of the day',
                        'product_ids' => [],
                        'status' => true
                    ],
                    'banner' => [
                        'main_banner' => [
                            'status' => true,
                            'image_url' => '/frontend/images/electronic_three/electronic_three_2.png',
                            'redirect_link' => [
                                'link' => null,
                                'link_type' => null,
                                'product_ids' => null
                            ]
                        ],
                        'grid_banner_1' => [
                            'status' => true,
                            'image_url' => '/frontend/images/electronic_three/electronic_three_3.png',
                            'redirect_link' => [
                                'link' => null,
                                'link_type' => null,
                                'product_ids' => null
                            ]
                        ],
                        'grid_banner_2' => [
                            'status' => true,
                            'image_url' => '/frontend/images/electronic_three/electronic_three_4.png',
                            'redirect_link' => [
                                'link' => null,
                                'link_type' => null,
                                'product_ids' => null
                            ]
                        ],
                        'grid_banner_3' => [
                            'status' => true,
                            'image_url' => '/frontend/images/electronic_three/electronic_three_5.png',
                            'redirect_link' => [
                                'link' => null,
                                'link_type' => null,
                                'product_ids' => null
                            ]
                        ]
                    ],
                    'category_product_1' => [
                        'status' => true,
                        'categories' => [
                            'category_ids' => [],
                            'status' => true
                        ],
                        'products' => [
                            'product_ids' => [],
                            'status' => true
                        ]
                    ],
                    'category_product_2' => [
                        'title' => 'recommended for you',
                        'category_ids' => [],
                        'status' => true
                    ],
                    'offer_banner_1' => [
                        'status' => true,
                        'image_url' => '/frontend/images/electronic_three/electronic_three_6.png',
                        'redirect_link' => [
                            'link' => 'powerhouse-electronics',
                            'link_type' => null
                        ]
                    ],
                    'offer_banner_2' => [
                        'banner_1' => [
                            'image_url' => '/frontend/images/electronic_three/electronic_three_8.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'powerhouse-electronics',
                                'link_type' => null
                            ]
                        ],
                        'banner_2' => [
                            'image_url' => '/frontend/images/electronic_three/electronic_three_7.png',
                            'status' => true,
                            'redirect_link' => [
                                'link_type' => null
                            ]
                        ]
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => true
                    ],
                    'products_ids' => []
                ]
            ],

            'marketplace_one' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'fashion',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_one/marketplace_one_1.png',
                            ],
                        ],
                    ],
                    'offer_banner_1' => [
                        'banner_1' => [
                            'image_url' => '/frontend/images/marketplace_one/marketplace_one_2.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'powerhouse-electronics',
                                'link_type' => null,
                            ],
                        ],
                        'banner_2' => [
                            'image_url' => '/frontend/images/marketplace_one/marketplace_one_3.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'bag-emporium',
                                'link_type' => null,
                            ],
                        ],
                        'banner_3' => [
                            'image_url' => '/frontend/images/marketplace_one/marketplace_one_5.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'shoes',
                                'link_type' => null,
                            ],
                        ],
                        'banner_4' => [
                            'image_url' => '/frontend/images/marketplace_one/marketplace_one_4.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'baby-essentials',
                                'link_type' => null,
                            ],
                        ],
                    ],
                    'product_list_1' => [
                        'tag' => 'special offer',
                        'title' => "today's deal",
                        'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'offer_banner_2' => [
                        'status' => true,
                        'image_url' => '/frontend/images/marketplace_one/marketplace_one_6.png',
                        'redirect_link' => [
                            'link' => 'classic-furnishings',
                            'link_type' => null,
                        ],
                    ],
                    'services' => [
                        'banners' => [
                            [
                                'title' => 'free shipping',
                                'description' => 'free shipping world wide',
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_one/service.png',
                            ],
                            [
                                'title' => '24 X 7 service',
                                'description' => 'online service for new customer',
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_one/service.png',
                            ],
                            [
                                'title' => 'festival offer',
                                'description' => 'new online special festival offer',
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_one/service.png',
                            ],
                        ],
                    ],
                    'category_product' => [
                        'status' => true,
                        'left_panel' => [
                            'product_ids' => [],
                            'title' => 'Under $20 | Free delivery',
                            'status' => true,
                        ],
                        'right_panel' => [
                            'product_category' => [
                                'title' => 'RECOMMENDATIONS FOR YOU',
                                'category_ids' => [],
                                'status' => true,
                            ],
                            'product_banner' => [
                                'image_url' => '/frontend/images/marketplace_one/marketplace_one_7.png',
                                'status' => true,
                                'redirect_link' => [
                                    'link' => 'classic-furnishings',
                                    'link_type' => null,
                                ],
                            ],
                        ],
                    ],
                    'social_media' => [
                        'title' => '# instagram',
                        'status' => true,
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_one/marketplace_one_insta_6.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_one/marketplace_one_insta_5.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_one/marketplace_one_insta_4.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_one/marketplace_one_insta_3.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_one/marketplace_one_insta_2.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_one/marketplace_one_insta_1.png',
                            ],
                        ],
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => false,
                    ],
                    'products_ids' => []
                ]
            ],

            'marketplace_two' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_two/marketplace_two_1.png',
                            ],
                        ],
                    ],
                    'offer_banner_1' => [
                        'status' => true,
                        'banner_1' => [
                            'image_url' => '/frontend/images/marketplace_two/marketplace_two_5.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'powerhouse-electronics',
                                'link_type' => null,
                            ],
                        ],
                        'banner_2' => [
                            'image_url' => '/frontend/images/marketplace_two/marketplace_two_4.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'shoes',
                                'link_type' => null,
                            ],
                        ],
                        'banner_3' => [
                            'image_url' => '/frontend/images/marketplace_two/marketplace_two_3.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => null,
                                'link_type' => null,
                                'product_ids' => [],
                            ],
                        ],
                        'banner_4' => [
                            'image_url' => '/frontend/images/marketplace_two/marketplace_two_2.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'powerhouse-electronics',
                                'link_type' => null,
                            ],
                        ],
                    ],
                    'products_list_1' => [
                        'title' => 'top collection',
                        'sub_title' => '',
                        'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'products_list_2' => [
                        'title' => 'top collection',
                        'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'products_list_3' => [
                        'title' => "Don't Miss These",
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'products_list_4' => [
                        'title' => 'Trending Offers',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'offer_banner_2' => [
                        'status' => true,
                        'banner_1' => [
                            'image_url' => '/frontend/images/marketplace_two/marketplace_two_7.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => null,
                                'link_type' => null,
                                'product_ids' => [],
                            ],
                        ],
                        'banner_2' => [
                            'image_url' => '/frontend/images/marketplace_two/marketplace_two_6.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'powerhouse-electronics',
                                'link_type' => null,
                            ],
                        ],
                    ],
                    'slider_products' => [
                        'status' => true,
                        'product_slider_1' => [
                            'title' => 'new products',
                            'product_ids' => [],
                            'status' => true,
                        ],
                        'product_slider_2' => [
                            'title' => 'feature product',
                            'product_ids' => [],
                            'status' => true,
                        ],
                        'product_slider_3' => [
                            'title' => 'best seller',
                            'product_ids' => [],
                            'status' => true,
                        ],
                        'product_slider_4' => [
                            'title' => 'on sale',
                            'product_ids' => [],
                            'status' => true,
                        ],
                    ],
                    'services' => [
                        'banners' => [
                            [
                                'title' => 'free shipping',
                                'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_two/service.png',
                            ],
                            [
                                'title' => '24 X 7 service',
                                'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_two/service.png',
                            ],
                            [
                                'title' => 'festival offer',
                                'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_two/service.png',
                            ],
                            [
                                'title' => 'online payment',
                                'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_two/service.png',
                            ],
                        ],
                    ],
                    'products_list_5' => [
                        'title' => 'Big Savings',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'products_list_6' => [
                        'title' => 'Top Rated For You',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'offer_banner_3' => [
                        'status' => true,
                        'image_url' => '/frontend/images/marketplace_two/marketplace_two_8.png',
                        'redirect_link' => [
                            'link' => 'fashion',
                            'link_type' => null,
                        ],
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => true,
                    ],
                    'products_ids' => []
                ]
            ],

            'marketplace_three' => [
                'content' => [
                    'home_banner' => [
                        'status' => false,
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'powerhouse-electronics',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_three/marketplace_three_1.png',
                            ],
                        ],
                    ],
                    'offer_banner' => [
                        'status' => true,
                        'banner_1' => [
                            'image_url' => '/frontend/images/marketplace_three/marketplace_three_2.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'powerhouse-electronics',
                                'link_type' => null,
                            ],
                        ],
                        'banner_2' => [
                            'image_url' => '/frontend/images/marketplace_three/marketplace_three_4.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'powerhouse-electronics',
                                'link_type' => null,
                            ],
                        ],
                        'banner_3' => [
                            'image_url' => '/frontend/images/marketplace_three/marketplace_three_3.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'bag-emporium',
                                'link_type' => null,
                            ],
                        ],
                    ],
                    'categories_products' => [
                        'status' => true,
                        'left_panel' => [
                            'categories' => [
                                'category_ids' => [],
                                'status' => true,
                            ],
                            'products_list' => [
                                'title' => 'new product',
                                'product_ids' => [],
                                'status' => true,
                            ],
                            'banner' => [
                                'image_url' => '/frontend/images/marketplace_three/marketplace_three_7.png',
                                'redirect_link' => [
                                    'link' => 'fashion',
                                    'link_type' => null,
                                    'product_ids' => null,
                                ],
                                'status' => true,
                            ],
                        ],
                        'right_panel' => [
                            'products_list' => [
                                'title' => 'deals of the day',
                                'product_ids' => [],
                                'status' => true,
                            ],
                            'offer_banner' => [
                                'banner_1' => [
                                    'image_url' => '/frontend/images/marketplace_three/marketplace_three_6.png',
                                    'status' => true,
                                    'redirect_link' => [
                                        'link' => 'fit-gear-central',
                                        'link_type' => null,
                                    ],
                                ],
                                'banner_2' => [
                                    'image_url' => '/frontend/images/marketplace_three/marketplace_three_5.png',
                                    'status' => true,
                                    'redirect_link' => [
                                        'link' => 'powerhouse-electronics',
                                        'link_type' => null,
                                    ],
                                ],
                            ],
                            'category_product' => [
                                'title' => 'Recommendations for you',
                                'category_ids' => [],
                                'status' => true,
                            ],
                        ],
                    ],
                    'featured_blogs' => [
                        'status' => true,
                        'blog_ids' => [],
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => true,
                    ],
                    'products_ids' => []
                ]
            ],
            
            'marketplace_four' => [
                'content' => [
                    'home_banner' => [
                        'status' => true,
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'fashion',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_four/marketplace_four_1.png',
                            ],
                        ],
                    ],
                    'services' => [
                        'banners' => [
                            [
                                'title' => 'free shipping',
                                'description' => 'free shipping world wide',
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_four/service.png',
                            ],
                            [
                                'title' => '24 X 7 service',
                                'description' => 'online service for 24 X 7',
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_four/service.png',
                            ],
                            [
                                'title' => 'festival offer',
                                'description' => 'new online special festival offer',
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_four/service.png',
                            ],
                            [
                                'title' => 'online payment',
                                'description' => 'new online special festival offer',
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_four/service.png',
                            ],
                        ],
                        'status' => null,
                    ],
                    'products_list_1' => [
                        'title' => 'deals of the day',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'product_banner_1' => [
                        'status' => true,
                        'left_panel' => [
                            'image_url' => '/frontend/images/marketplace_four/marketplace_four_2.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'bag-emporium',
                                'link_type' => null,
                                'product_ids' => null,
                            ],
                        ],
                        'right_panel' => [
                            'title' => '',
                            'product_ids' => [],
                            'status' => true,
                        ],
                    ],
                    'slider_products' => [
                        'status' => true,
                        'image_url' => '/frontend/images/marketplace_four/marketplace_four_3.png',
                        'product_slider_1' => [
                            'title' => 'new product',
                            'product_ids' => [],
                            'status' => true,
                        ],
                    ],
                    'products_list_2' => [
                        'title' => "Don't Miss These",
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'product_banner_2' => [
                        'status' => true,
                        'left_panel' => [
                            'product_ids' => [],
                            'title' => 'new product',
                            'status' => true,
                        ],
                        'center_panel' => [
                            'banner_1' => [
                                'image_url' => '/frontend/images/marketplace_four/marketplace_four_4.png',
                                'status' => true,
                                'redirect_link' => [
                                    'link_type' => null,
                                    'product_ids' => null,
                                ],
                            ],
                            'banner_2' => [
                                'image_url' => '/frontend/images/marketplace_four/marketplace_four_5.png',
                                'status' => true,
                                'redirect_link' => [
                                    'link_type' => null,
                                    'product_ids' => null,
                                ],
                            ],
                        ],
                        'right_panel' => [
                            'product_ids' => [],
                            'title' => 'feature product',
                            'status' => true,
                        ],
                    ],
                    'product_banner_3' => [
                        'status' => true,
                        'left_panel' => [
                            'image_url' => '/frontend/images/marketplace_four/marketplace_four_6.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'surfboard',
                                'link_type' => null,
                                'product_ids' => null,
                            ],
                        ],
                        'right_panel' => [
                            'title' => '',
                            'product_ids' => [],
                            'status' => true,
                        ],
                    ],
                    'products_list_3' => [
                        'title' => 'big savings',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'social_media' => [
                        'title' => '# instagram',
                        'status' => true,
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_four/marketplace_four_insta.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_four/marketplace_four_insta.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_four/marketplace_four_insta.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_four/marketplace_four_insta.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_four/marketplace_four_insta.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/marketplace_four/marketplace_four_insta.png',
                            ],
                        ],
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => true,
                    ],
                    'products_ids' => []
                ]
            ],

            'vegetables_one' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'vegetables-fruits',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_one/vegtables_one_1.png'
                            ]
                        ]
                    ],
                    'services' => [
                        'banners' => [
                            [
                                'title' => 'free shipping',
                                'description' => 'free shipping world wide',
                                'status' => true,
                                'image_url' => '/frontend/images/vegtables_one/service.png'
                            ],
                            [
                                'title' => '24 X 7 service',
                                'description' => 'online service for new customer',
                                'status' => true,
                                'image_url' => '/frontend/images/vegtables_one/service.png'
                            ],
                            [
                                'title' => 'festival offer',
                                'description' => 'new online special festival offer',
                                'status' => true,
                                'image_url' => '/frontend/images/vegtables_one/service.png'
                            ]
                        ]
                    ],
                    'products_list_1' => [
                        'title' => 'trending products',
                        'product_ids' => [],
                        'status' => true
                    ],
                    'full_banner' => [
                        'image_url' => '/frontend/images/vegtables_one/vegtables_one_1.png',
                        'redirect_link' => [
                            'link' => 'vegetables-fruits',
                            'link_type' => null
                        ],
                        'status' => true
                    ],
                    'products_list_2' => [
                        'title' => 'special products',
                        'product_ids' => [],
                        'status' => true
                    ],
                    'featured_blogs' => [
                        'tag' => 'recent stroy',
                        'title' => 'from the blog',
                        'status' => true,
                        'blog_ids' => []
                    ],
                    'brand' => [
                        'brand_ids' => []
                    ],
                    'products_ids' => []
                ]
            ],

            'vegetables_two' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'vegetables-fruits',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_two/vegetables_two_1.png'
                            ]
                        ]
                    ],
                    'services' => [
                        'banners' => [
                            [
                                'title' => 'free shipping',
                                'description' => 'free shipping world wide',
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_two/service.png'
                            ],
                            [
                                'title' => '24 X 7 service',
                                'description' => 'online service for 24 X 7',
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_two/service.png'
                            ],
                            [
                                'title' => 'festival offer',
                                'description' => 'new online special festival offer',
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_two/service.png'
                            ],
                            [
                                'title' => 'online payment',
                                'description' => 'new online special festival offer',
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_two/service.png'
                            ]
                        ]
                    ],
                    'products_list_1' => [
                        'title' => 'deals of the day',
                        'product_ids' => [],
                        'status' => true
                    ],
                    'banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'vegetables-fruits',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_two/banner-1.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'vegetables-fruits',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_two/banner-1.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'vegetables-fruits',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_two/banner-2.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'vegetables-fruits',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_two/banner-2.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'vegetables-fruits',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_two/banner-2.png'
                            ]
                        ]
                    ],
                    'category_product' => [
                        'title' => 'RECOMMENDATIONS FOR YOU',
                        'category_ids' => [],
                        'status' => true
                    ],
                    'offer_banner' => [
                        'status' => true,
                        'image_url' => '/frontend/images/vegetables_two/vegetable_two.png',
                        'redirect_link' => [
                            'link' => 'vegetables-fruits',
                            'link_type' => null
                        ]
                    ],
                    'products_list_2' => [
                        'title' => 'recently viewed',
                        'product_ids' => [],
                        'status' => true
                    ],
                    'featured_blogs' => [
                        'title' => 'featured recipes',
                        'sub_title' => '',
                        'status' => true,
                        'blog_ids' => []
                    ],
                    'brand' => [
                        'brand_ids' => []
                    ],
                    'products_ids' => []
                ]
            ],

            'vegetables_three' => [
                'content' => [
                    'sidebar_category' => [
                        'category_ids' => [],
                        'status' => true
                    ],
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'vegetables-fruits',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_three/vegetables_three_1.png'
                            ]
                        ]
                    ],
                    'services' => [
                        'banners' => [
                            [
                                'title' => 'free shipping',
                                'description' => 'free shipping world wide',
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_three/service.png'
                            ],
                            [
                                'title' => '24 X 7 service',
                                'description' => 'online service for 24 X 7',
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_three/service.png'
                            ],
                            [
                                'title' => 'festival offer',
                                'description' => 'new online special festival offer',
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_three/service.png'
                            ],
                            [
                                'title' => 'online payment',
                                'description' => 'new online special festival offer',
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_three/service.png'
                            ]
                        ]
                    ],
                    'category_product' => [
                        'tag' => 'exclusive products',
                        'title' => 'special products',
                        'category_ids' => [],
                        'status' => true
                    ],
                    'banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'vegetables-fruits',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_three/vegetables_three_2.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'vegetables-fruits',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_three/vegetables_three_3.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'vegetables-fruits',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_three/vegetables_three_4.png'
                            ]
                        ]
                    ],
                    'products_list' => [
                        'tag' => 'recent story',
                        'title' => 'trending products',
                        'product_ids' => [],
                        'status' => true
                    ],
                    'featured_blogs' => [
                        'tag' => 'recent story',
                        'title' => 'trending products',
                        'status' => true,
                        'blog_ids' => []
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => true
                    ],
                    'products_ids' => []
                ]
            ],

            'vegetables_four' => [
                'content' => [
                    'home_banner' => [
                        'status' => true,
                        'image_url' => '/frontend/images/vegetables_four/vegetables_four_1.png',
                        'redirect_link' => [
                            'link' => 'vegetables-fruits',
                            'link_type' => null,
                            'product_ids' => null,
                        ],
                    ],
                    'categories' => [
                        'status' => true,
                        'category_ids' => [],
                    ],
                    'offer_banner_1' => [
                        'status' => false,
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'vegetables-fruits',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_four/vegetables_four_2.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'vegetables',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_four/vegetables_four_3.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'vegetables-fruits',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_four/vegetables_four_4.png',
                            ],
                        ],
                    ],
                    'products_list_1' => [
                        'title' => 'Vegetables',
                        'sub_title' => 'atta, dal, rice and more',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'products_list_2' => [
                        'title' => 'Vegetables',
                        'sub_title' => 'atta, dal, rice and more',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'offer_banner_2' => [
                        'status' => true,
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'vegetables-fruits',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_four/vegetables_four_7.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'vegetables-fruits',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_four/vegetables_four_6.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'vegetables',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_four/vegetables_four_6.png',
                            ],
                        ],
                    ],
                    'products_list_3' => [
                        'title' => 'Lowest Price Vegetables',
                        'sub_title' => 'atta, dal, rice and more',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'services' => [
                        'banners' => [
                            [
                                'title' => 'free shipping',
                                'description' => 'free shipping world wide',
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_four/service.png',
                            ],
                            [
                                'title' => '24 X 7 service',
                                'description' => 'online service for 24 X 7',
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_four/service.png',
                            ],
                            [
                                'title' => 'festival offer',
                                'description' => 'super sale upto 50% off',
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_four/service.png',
                            ],
                            [
                                'title' => 'online pay',
                                'description' => 'online payment available',
                                'status' => true,
                                'image_url' => '/frontend/images/vegetables_four/service.png',
                            ],
                        ],
                        'status' => null,
                    ],
                    'products_list_4' => [
                        'title' => 'Vegetables',
                        'sub_title' => 'atta, dal, rice and more',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'featured_blogs' => [
                        'title' => 'shop by category',
                        'status' => true,
                        'blog_ids' => [],
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => false,
                    ],
                    'products_ids' => [],
                ]
            ],

            'jewellery_one' => [
                'content' => [
                    'home_banner' => [
                        'status' => false,
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'radiant-ornaments',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_one/jewellery_one_1.png'
                            ]
                        ]
                    ],
                    'categories' => [
                        'status' => true,
                        'category_ids' => []
                    ],
                    'products_list' => [
                        'tag' => 'special offer',
                        'title' => 'top collection',
                        'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,',
                        'product_ids' => [],
                        'status' => true
                    ],
                    'services' => [
                        'banners' => [
                            [
                                'title' => 'free shipping',
                                'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_one/service.png'
                            ],
                            [
                                'title' => '24 X 7 service',
                                'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_one/service.png'
                            ],
                            [
                                'title' => 'try @ home',
                                'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_one/service.png'
                            ],
                            [
                                'title' => 'online payment',
                                'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_one/service.png'
                            ]
                        ],
                        'status' => null
                    ],
                    'full_banner' => [
                        'image_url' => '/frontend/images/jewellery_one/jewellery_one_2.png',
                        'redirect_link' => [
                            'link' => null,
                            'link_type' => null,
                            'product_ids' => [] 
                        ],
                        'status' => true
                    ],
                    'category_product' => [
                        'tag' => 'exclusive products',
                        'title' => 'special products',
                        'category_ids' => [],
                        'status' => true
                    ],
                    'social_media' => [
                        'title' => '# instagram',
                        'status' => true,
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_one/jewellery_one_insta_4.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_one/jewellery_one_insta_5.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_one/jewellery_one_insta_3.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_one/jewellery_one_insta_3.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_one/jewellery_one_insta_1.png'
                            ]
                        ]
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => false
                    ],
                    'products_ids' => []
                ]
            ],

            'jewellery_two' => [
                'content' => [
                    'home_banner' => [
                        'status' => false,
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'radiant-ornaments',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_two/jewellery_two_1.png'
                            ]
                        ]
                    ],
                    'offer_banner_1' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'radiant-ornaments',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_two/jewellery_two_2.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'radiant-ornaments',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_two/jewellery_two_3.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'radiant-ornaments',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_two/jewellery_two_4.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'radiant-ornaments',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_two/jewellery_two_5.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'radiant-ornaments',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_two/jewellery_two_6.png'
                            ]
                        ]
                    ],
                    'categories' => [
                        'status' => true,
                        'category_ids' => []
                    ],
                    'products_list_1' => [
                        'title' => 'top collection',
                        'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,',
                        'product_ids' => [],
                        'status' => true
                    ],
                    'banner' => [
                        'image_url' => '/frontend/images/jewellery_two/jewellery_two_7.png',
                        'redirect_link' => [
                            'link' => 'radiant-ornaments',
                            'link_type' => null,
                            'product_ids' => null
                        ],
                        'status' => true
                    ],
                    'services' => [
                        'banners' => [
                            [
                                'title' => 'free shipping',
                                'description' => 'free shipping world wide',
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_two/service.png'
                            ],
                            [
                                'title' => '24 X 7 service',
                                'description' => 'online service for 24 X 7',
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_two/service.png'
                            ],
                            [
                                'title' => 'festival offer',
                                'description' => 'new online special festival offer',
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_two/service.png'
                            ],
                            [
                                'title' => 'online payment',
                                'description' => 'new online special festival offer',
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_two/service.png'
                            ]
                        ],
                        'status' => null
                    ],
                    'product_banner' => [
                        'status' => true,
                        'left_panel' => [
                            'product_ids' => [],
                            'title' => 'new product',
                            'status' => true
                        ],
                        'center_panel' => [
                            'banner_1' => [
                                'image_url' => '/frontend/images/jewellery_two/jewellery_two_8.png',
                                'status' => true,
                                'redirect_link' => [
                                    'link_type' => null,
                                    'product_ids' => null
                                ]
                            ],
                            'banner_2' => [
                                'image_url' => '/frontend/images/jewellery_two/jewellery_two_9.png',
                                'status' => true,
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => null,
                                    'product_ids' => null
                                ]
                            ]
                        ],
                        'right_panel' => [
                            'product_ids' => [],
                            'title' => 'feature product',
                            'status' => true
                        ]
                    ],
                    'offer_banner_2' => [
                        'status' => true,
                        'image_url' => '/frontend/images/jewellery_two/jewellery_two_10.png',
                        'redirect_link' => [
                            'link_type' => null
                        ]
                    ],
                    'social_media' => [
                        'title' => '# instagram',
                        'status' => true,
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_two/jewellery-insta.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_two/jewellery-insta.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery-insta.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_two/jewellery-insta.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_two/jewellery-insta.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_two/jewellery-insta.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_two/jewellery-insta.png'
                            ]
                        ]
                    ],
                    'products_list_2' => [
                        'product_ids' => [],
                        'status' => true
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => false
                    ],
                    'products_ids' => []
                ]
            ],

            'jewellery_three' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'radiant-ornaments',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_three/jewellery_three_5.png'
                            ]
                        ]
                    ],
                    'services' => [
                        'banners' => [
                            [
                                'title' => 'free shipping',
                                'description' => 'free shipping world wide',
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_three/service.png'
                            ],
                            [
                                'title' => '24 X 7 service',
                                'description' => 'online service for 24 X 7',
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_three/service.png'
                            ],
                            [
                                'title' => 'festival offer',
                                'description' => 'new online special festival offer',
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_three/service.png'
                            ],
                            [
                                'title' => 'online payment',
                                'description' => 'new online special festival offer',
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_three/service.png'
                            ]
                        ]
                    ],
                    'offer_banner' => [
                        'banner_1' => [
                            'image_url' => '/frontend/images/jewellery_three/jewellery_three_4.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'radiant-ornaments',
                                'link_type' => null
                            ]
                        ],
                        'banner_2' => [
                            'image_url' => '/frontend/images/jewellery_three/jewellery_three_3.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'radiant-ornaments',
                                'link_type' => null
                            ]
                        ],
                        'banner_3' => [
                            'image_url' => '/frontend/images/jewellery_three/jewellery_three_2.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'radiant-ornaments',
                                'link_type' => null
                            ]
                        ]
                    ],
                    'products_list' => [
                        'title' => 'top collection',
                        'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,',
                        'product_ids' => [],
                        'status' => true
                    ],
                    'full_banner' => [
                        'image_url' => '/frontend/images/jewellery_three/jewellery_three_1.png',
                        'redirect_link' => [
                            'link' => 'radiant-ornaments',
                            'link_type' => null
                        ],
                        'status' => true
                    ],
                    'categories' => [], 
                    'product_banner' => [
                        'status' => true,
                        'left_panel' => [
                            'product_ids' => [],
                            'title' => 'new product',
                            'status' => true
                        ],
                        'center_panel' => [
                            'image_url' => '/frontend/images/jewellery_three/jewellery_three_6.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'radiant-ornaments',
                                'link_type' => null
                            ]
                        ],
                        'right_panel' => [
                            'product_ids' => [],
                            'title' => 'feature product',
                            'status' => true
                        ]
                    ],
                    'featured_blogs' => [
                        'title' => 'latest news',
                        'status' => true,
                        'blog_ids' => []
                    ],
                    'social_media' => [
                        'title' => '# instagram',
                        'status' => true,
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_three/jewellery_three_insta_5.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_three/jewellery_three_insta_4.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_three/jewellery_three_insta_3.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_three/jewellery_three_insta_2.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/jewellery_three/jewellery_three_insta_1.png'
                            ]
                        ]
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => true
                    ],
                    'products_ids' => []
                ]
            ],

            'bag' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'bag-emporium',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/bag/banner.png',
                            ],
                        ],
                    ],
                    'category_product' => [
                        'tag' => 'new collection',
                        'title' => 'trending products',
                        'category_ids' => [],
                        'status' => true,
                    ],
                    'category' => [
                        'category_ids' => [],
                        'status' => true,
                    ],
                    'full_banner' => [
                        'image_url' => '/frontend/images/bag/bag_2.png',
                        'redirect_link' => [
                            'link' => 'bag-emporium',
                            'link_type' => null,
                        ],
                        'status' => true,
                    ],
                    'product_banner' => [
                        'status' => true,
                        'left_content' => [
                            'product_ids' => [],
                            'title' => 'new product',
                            'status' => true,
                        ],
                        'center_content' => [
                            'tag' => 'on sale',
                            'title' => 'season sale',
                            'product_ids' => [],
                            'status' => true,
                        ],
                        'right_content' => [
                            'product_ids' => [],
                            'title' => 'feature product',
                            'status' => true,
                        ],
                    ],
                    'services' => [
                        'banners' => [
                            [
                                'title' => 'free shipping',
                                'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
                                'status' => true,
                                'image_url' => '/frontend/images/bag/service.png',
                            ],
                            [
                                'title' => '24 X 7 service',
                                'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
                                'status' => true,
                                'image_url' => '/frontend/images/bag/service.png',
                            ],
                            [
                                'title' => 'festival offer',
                                'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
                                'status' => true,
                                'image_url' => '/frontend/images/bag/service.png',
                            ],
                            [
                                'title' => 'online payment',
                                'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
                                'status' => true,
                                'image_url' => '/frontend/images/bag/service.png',
                            ],
                        ],
                    ],
                    'products_list' => [
                        'tag' => 'trend',
                        'title' => 'exclusive bag',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'grid_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'bag-emporium',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/bag/bags-grid-1.png',
                                'tag' => null,
                                'title' => null,
                                'button_text' => null,
                                'offer' => null,
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'bag-emporium',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => null,
                                'tag' => 'new products',
                                'title' => 'zipper storage bag',
                                'button_text' => 'Shop Now',
                                'offer' => '80% off',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'bag-emporium',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/bag/bags-grid-1.png',
                                'tag' => null,
                                'title' => null,
                                'button_text' => null,
                                'offer' => null,
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'bag-emporium',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => null,
                                'tag' => 'on sale',
                                'title' => 'tucker bag',
                                'button_text' => 'Shop Now',
                                'offer' => 'save 30% off',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'bag-emporium',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/bag/bags-grid-1.png',
                                'tag' => null,
                                'title' => null,
                                'button_text' => null,
                                'offer' => null,
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'bag-emporium',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => null,
                                'tag' => 'summer sale',
                                'title' => 'gate check bag',
                                'button_text' => 'Shop Now',
                                'offer' => 'minimum 50% off',
                            ],
                        ],
                    ],
                    'featured_blogs' => [
                        'tag' => 'recent story',
                        'title' => 'latest blog',
                        'status' => true,
                        'blog_ids' => [],
                    ],
                    'social_media' => [
                        'title' => '# Instagram',
                        'status' => true,
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'beverages',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/bag/bag-insta.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'biscuits-snacks',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/bag/bag-insta.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'grocery-staples',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/bag/bag-insta.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'biscuits-snacks',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/bag/bag-insta.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'vegetables',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/bag/bag-insta.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'furniture',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/bag/bag-insta.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'wines-soft-drinks',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/bag/bag-insta.png',
                            ],
                        ],
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => false,
                    ],
                    'products_ids' => []
                ]
            ],

            'watch' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'time-sphere',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/watch/watch_1.png',
                            ],
                        ],
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => true,
                    ],
                    'offer_banner_1' => [
                        'image_url' => '/frontend/images/watch/watch_2.png',
                        'redirect_link' => [
                            'link' => 'time-sphere',
                            'link_type' => null,
                        ],
                        'status' => true,
                    ],
                    'categories' => [
                        'status' => true,
                        'category_ids' => [],
                    ],
                    'category_product' => [
                        'title' => 'trending product',
                        'category_ids' => [],
                        'status' => true,
                    ],
                    'products_list_1' => [
                        'title' => 'trending products',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'offer_banner_2' => [
                        'banner_1' => [
                            'image_url' => '/frontend/images/watch/watch_5.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'time-sphere',
                                'link_type' => null,
                            ],
                        ],
                        'banner_2' => [
                            'image_url' => '/frontend/images/watch/watch_4.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'time-sphere',
                                'link_type' => null,
                            ],
                        ],
                        'banner_3' => [
                            'image_url' => '/frontend/images/watch/watch_3.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'time-sphere',
                                'link_type' => null,
                            ],
                        ],
                    ],
                    'products_list_2' => [
                        'title' => 'Pocket Friendly Watch For men and women',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'featured_blogs' => [
                        'tag' => 'our collection',
                        'title' => 'special products',
                        'status' => true,
                        'blog_ids' => [],
                    ],
                    'services' => [
                        'banners' => [
                            [
                                'title' => 'free shipping',
                                'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
                                'status' => true,
                                'image_url' => '/frontend/images/watch/service.png',
                            ],
                            [
                                'title' => '24 X 7 service',
                                'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
                                'status' => true,
                                'image_url' => '/frontend/images/watch/service.png',
                            ],
                            [
                                'title' => 'festival offer',
                                'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
                                'status' => true,
                                'image_url' => '/frontend/images/watch/service.png',
                            ],
                            [
                                'title' => 'online payment',
                                'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
                                'status' => true,
                                'image_url' => '/frontend/images/watch/service.png',
                            ],
                        ],
                    ],
                    'social_media' => [
                        'title' => '# instagram',
                        'status' => true,
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/watch/watch_insta_5.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/watch/watch_insta_4.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/watch/watch_insta_3.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/watch/watch_insta_2.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/watch/watch_insta_1.png',
                            ],
                        ],
                    ],
                    'products_ids' => []
                ]
            ],

            'medical' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'medical-essentials',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/medical/medical_1.png',
                            ],
                        ],
                    ],
                    'categories' => [
                        'status' => true,
                        'category_ids' => []
                    ],
                    'category_product' => [
                        'title' => 'top category',
                        'category_ids' => [],
                        'status' => true,
                    ],
                    'offer_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'medical-essentials',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/medical/medical_2.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'medical-essentials',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/medical/medical_3.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'medical-essentials',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/medical/medical_6.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'medical-essentials',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/medical/medical_5.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'medical-essentials',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/medical/medical_4.png',
                            ],
                        ],
                    ],
                    'column_banner_product' => [
                        'status' => true,
                        'offer_banner_1' => [
                            'image_url' => '/frontend/images/medical/medical_8.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'medical-essentials',
                                'link_type' => null,
                            ],
                        ],
                        'product_list_1' => [
                            'product_ids' => [],
                            'title' => 'feature product',
                            'status' => true,
                        ],
                        'offer_banner_2' => [
                            'image_url' => '/frontend/images/medical/medical_7.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'medical-essentials',
                                'link_type' => null,
                            ],
                        ],
                        'product_list_2' => [
                            'product_ids' => [],
                            'title' => 'on sale',
                            'status' => true,
                        ],
                    ],
                    'services' => [
                        'banners' => [
                            [
                                'title' => 'free shipping',
                                'description' => 'free shipping world wide',
                                'status' => true,
                                'image_url' => '/frontend/images/medical/service.png',
                            ],
                            [
                                'title' => '24 X 7 service',
                                'description' => 'online service for 24 X 7',
                                'status' => true,
                                'image_url' => '/frontend/images/medical/service.png',
                            ],
                            [
                                'title' => 'festival offer',
                                'description' => "new online special festival offer",
                                'status' => true,
                                'image_url' => "/frontend/images/medical/service.png",
                            ],
                            [
                                'title' => "online payment",
                                'description' => "new online special festival offer",
                                'status' => true,
                                'image_url' => "/frontend/images/medical/service.png",
                            ],
                        ],
                    ],
                    'featured_blogs' => [
                        "tag" => "recent stroy",
                        'title' => "latest blog",
                        'status' => true,
                        "blog_ids" => [],
                    ],
                    'brand' => [
                        'brand_ids' => []
                    ],
                    'products_ids' => [],
                ]
            ],

            'perfume' => [
                'content' => [
                    'home_banner' => [
                        'status' => true,
                        'image_url' => '/frontend/images/perfume/perfume_1.png',
                        'redirect_link' => [
                            'link' => 'perfume',
                            'link_type' => null,
                        ],
                    ],
                    'offer_banner_1' => [
                        'banner_1' => [
                            'status' => true,
                            'image_url' => '/frontend/images/perfume/perfume_5.png',
                            'redirect_link' => [
                                'link' => 'perfume',
                                'link_type' => null,
                            ],
                        ],
                        'banner_2' => [
                            'status' => true,
                            'image_url' => '/frontend/images/perfume/perfume_4.png',
                            'redirect_link' => [
                                'link' => 'perfume',
                                'link_type' => null,
                            ],
                        ],
                        'banner_3' => [
                            'status' => true,
                            'image_url' => '/frontend/images/perfume/perfume_3.png',
                            'redirect_link' => [
                                'link' => 'perfume',
                                'link_type' => null,
                            ],
                        ],
                        'banner_4' => [
                            'status' => true,
                            'image_url' => '/frontend/images/perfume/perfume_2.png',
                            'redirect_link' => [
                                'link' => 'perfume',
                                'link_type' => null,
                            ],
                        ],
                    ],
                    'category_product' => [
                        'title' => 'special products',
                        'tag' => 'exclusive products',
                        'category_ids' => [],
                        'status' => true,
                    ],
                    'offer_banner_2' => [
                        'status' => true,
                        'image_url' => '/frontend/images/perfume/perfume_7.png',
                        'redirect_link' => [
                            'link' => 'perfume',
                            'link_type' => null,
                        ],
                    ],
                    'collection_banner' => [
                        'status' => true,
                        'image_url' => '/frontend/images/perfume/perfume_6.png',
                        'redirect_link' => [
                            'link' => 'perfume',
                            'link_type' => null,
                        ],
                    ],
                    'product_list' => [
                        'status' => true,
                        'products' => [
                            'product_ids' => [],
                            'status' => true,
                        ],
                        'left_panel' => [
                            'title' => 'Biggest offer of the sale',
                            'description' => 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo totam officiis nisi neque non ex, odio atque digniss ab suscipit? Iste',
                            'more_button' => true,
                            'button_text' => 'view all product',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'perfume',
                                'link_type' => null,
                            ],
                        ],
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => true,
                    ],
                    'products_ids' => []
                ]
            ],

            'yoga' => [
                'content' => [
                    'home_banner' => [
                        'status' => true,
                        'image_url' => "/frontend/images/yoga/yoga_1.png",
                        'redirect_link' => [
                            'link' => "fit-gear-central",
                            'link_type' => null,
                        ],
                    ],
                    'offer_banner_1' => [
                        'banner_1' => [
                            'image_url' => "/frontend/images/yoga/yoga_2.png",
                            'status' => true,
                            'redirect_link' => [
                                'link' => "fit-gear-central",
                                'link_type' => null,
                            ],
                        ],
                        "banner_2" => [
                            'image_url' => "/frontend/images/yoga/yoga_3.png",
                            'status' => true,
                            'redirect_link' => [
                                'link' => "fit-gear-central",
                                'link_type' => null,
                            ],
                        ],
                        "banner_3" => [
                            'image_url' => "/frontend/images/yoga/yoga_4.png",
                            'status' => true,
                            'redirect_link' => [
                                'link' => "fit-gear-central",
                                'link_type' => null,
                            ],
                        ],
                    ],
                    "products_list_1" => [
                        "tag" => "about us",
                        'title' => "welcome to multi store",
                        'description' => "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
                        'product_ids' => [],
                        'status' => true,
                    ],
                    "products_list_2" => [
                        "tag" => "Multikart",
                        'title' => "limited period offer",
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'offer_banner_2' => [
                        'banner_1' => [
                            'image_url' => "/frontend/images/yoga/yoga_5.png",
                            'status' => true,
                            'redirect_link' => [
                                'link' => "fit-gear-central",
                                'link_type' => null,
                            ],
                        ],
                        "banner_2" => [
                            'image_url' => "/frontend/images/yoga/yoga_6.png",
                            'status' => true,
                            'redirect_link' => [
                                'link' => "fit-gear-central",
                                'link_type' => null,
                            ],
                        ],
                        "banner_3" => [
                            'image_url' => null,
                            'status' => false,
                            'redirect_link' => [
                                'link' => "fit-gear-central",
                                'link_type' => null,
                            ],
                        ],
                    ],
                    'featured_blogs' => [
                        'title' => "get inspired",
                        "tag" => "latest blog",
                        'status' => true,
                        "blog_ids" => [],
                    ],
                    "social_media" => [
                        'status' => true,
                        'title' => "# instagram",
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => "external_url",
                                ],
                                'status' => true,
                                'image_url' => "/frontend/images/yoga/yoga_insta_6.png",
                            ],
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => "external_url",
                                ],
                                'status' => true,
                                'image_url' => "/frontend/images/yoga/yoga_insta_6.png",
                            ],
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => "external_url",
                                ],
                                'status' => true,
                                'image_url' => "/frontend/images/yoga/yoga_insta_5.png",
                            ],
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => "external_url",
                                ],
                                'status' => true,
                                'image_url' => "/frontend/images/yoga/yoga_insta_4.png",
                            ],
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => "external_url",
                                ],
                                'status' => true,
                                'image_url' => "/frontend/images/yoga/yoga_insta_3.png",
                            ],
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => "external_url",
                                ],
                                'status' => true,
                                'image_url' => "/frontend/images/yoga/yoga_insta_2.png",
                            ],
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => "external_url",
                                ],
                                'status' => true,
                                'image_url' => "/frontend/images/yoga/yoga_insta_1.png",
                            ],
                        ],
                    ],
                    'brand' => [
                        'brand_ids' => []
                    ],
                    'products_ids' => [],
                ]
            ],

            'christmas' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => "beverages"
                                ],
                                'status' => true,
                                'image_url' => "/frontend/images/chrismas/chrismas_1.png",
                            ],
                        ],
                    ],
                    'offer_banner_1' => [
                        'banner_1' => [
                            'image_url' => "/frontend/images/chrismas/christmas-offer-banner.png",
                            'status' => true,
                            'redirect_link' => [],
                        ],
                        "banner_2" => [
                            'image_url' => "/frontend/images/chrismas/christmas-offer-banner.png",
                            'status' => true,
                            'redirect_link' => [],
                        ],
                    ],
                    "products_list" => [
                        "tag" => "special offer",
                        'title' => "top collection",
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'offer_banner_2' => [
                        'image_url' => "/frontend/images/chrismas/christmas-offer-banner-1.png",
                        'redirect_link' => [
                            'link' => "fashion",
                            'link_type' => null,
                        ],
                        'status' => true,
                    ],
                    "category_product_1" => [
                        "tag" => "exclusive products",
                        'title' => "special products",
                        'category_ids' => [],
                        'status' => true,
                    ],
                    "offer_banner_3" => [
                        'image_url' => "/frontend/images/chrismas/christmas-offer-banner.png",
                        'redirect_link' => [],
                        'status' => true,
                    ],
                    "category_product_2" => [
                        'title' => "top category",
                        'category_ids' => [],
                        'status' => true,
                    ],
                    'featured_blogs' => [
                        'title' => "from the blog",
                        'status' => true,
                        "blog_ids" => [],
                    ],
                    "social_media" => [
                        'title' => "#  instagram",
                        'status' => true,
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => "external_url",
                                ],
                                'status' => true,
                                'image_url' => "/frontend/images/chrismas/christmas-insta-1.png",
                            ],
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => "external_url",
                                ],
                                'status' => true,
                                'image_url' => "/frontend/images/chrismas/christmas-insta-1.png",
                            ],
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => "external_url",
                                ],
                                'status' => true,
                                'image_url' => "/frontend/images/chrismas/christmas-insta-1.png",
                            ],
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => "external_url",
                                ],
                                'status' => true,
                                'image_url' => "/frontend/images/chrismas/christmas-insta-1.png",
                            ],
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => "external_url",
                                ],
                                'status' => true,
                                'image_url' => "/frontend/images/chrismas/christmas-insta-1.png",
                            ],
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => "external_url",
                                ],
                                'status' => true,
                                'image_url' => "/frontend/images/chrismas/christmas-insta-1.png",
                            ],
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => "external_url",
                                ],
                                'status' => true,
                                'image_url' => "/frontend/images/chrismas/christmas-insta-1.png",
                            ],
                        ],
                    ],
                    'brand' => [
                        'brand_ids' => [], 
                        'status' => true
                    ],
                    'products_ids' => [],
                ]
            ],

            'bicycle' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => "hybrid-bicycle",
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => "/frontend/images/bicycle/bicycle_2.png",
                            ],
                        ],
                    ],
                    "products_list" => [
                        "tag" => "recent story",
                        'title' => "trending products",
                        'product_ids' => [],
                        'status' => true,
                    ],
                    "banner" => [
                        'image_url' => "/frontend/images/bicycle/bicycle_1.png",
                        'redirect_link' => [],
                        'status' => true,
                    ],
                    "category_product" => [
                        "tag" => "recent story",
                        'title' => "trending products",
                        'category_ids' => [],
                        'status' => true,
                    ],
                    'offer_banner' => [
                        'banner_1' => [
                            'image_url' => "/frontend/images/bicycle/bicycle_4.png",
                            'status' => true,
                            'redirect_link' => [
                                'link' => "hybrid-bicycle",
                                'link_type' => null,
                            ],
                        ],
                        "banner_2" => [
                            'image_url' => "/frontend/images/bicycle/bicycle_3.png",
                            'status' => true,
                            'redirect_link' => ['link_type' => null],
                        ],
                    ],
                    "social_media" => [
                        'status' => true,
                        'title' => "# instagram",
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => "external_url",
                                ],
                                'status' => true,
                                'image_url' => "/frontend/images/bicycle/bicycle_insta_5.png",
                            ],
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => "external_url",
                                ],
                                'status' => true,
                                'image_url' => "/frontend/images/bicycle/bicycle_insta_4.png",
                            ],
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => "external_url",
                                ],
                                'status' => true,
                                'image_url' => "/frontend/images/bicycle/bicycle_insta_3.png",
                            ],
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => "external_url",
                                ],
                                'status' => true,
                                'image_url' => "/frontend/images/bicycle/bicycle_insta_3.png",
                            ],
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => "external_url",
                                ],
                                'status' => true,
                                'image_url' => "/frontend/images/bicycle/bicycle_insta_2.png",
                            ],
                        ],
                    ],
                    'brand' => [
                        'brand_ids' => [], 
                        'status' => true
                    ],
                    'products_ids' => [],
                ]
            ],

            'marijuana' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => "beverages"
                                ],
                                'status' => true,
                                'image_url' => "/frontend/images/marijuana/marijuana_1.png",
                            ],
                        ],
                    ],
                    'services' => [
                        'banners' => [
                            [
                                'title' => "free shipping",
                                'description' => "on orders over $50",
                                'status' => true,
                                'image_url' => "/frontend/images/marijuana/service.png",
                            ],
                            [
                                'title' => "online payment",
                                'description' => "instantly pay online",
                                'status' => true,
                                'image_url' => "/frontend/images/marijuana/service.png",
                            ],
                            [
                                'title' => "24 X 7 service",
                                'description' => "Our service is available 24/7",
                                'status' => true,
                                'image_url' => "/frontend/images/marijuana/service.png",
                            ],
                            [
                                'title' => "fast & efficient",
                                'description' => "fast and qualitative product",
                                'status' => true,
                                'image_url' => "/frontend/images/marijuana/service.png",
                            ],
                        ],
                    ],
                    "details_section" => [
                        'banners' => [
                            [
                                'title' => "19+ Only",
                                'description' =>
                                    "Only persons aged 19 and above are legally permitted to purchase and consume marijuana.",
                                'status' => true,
                                'image_url' => "/frontend/images/marijuana/service.png",
                            ],
                            [
                                'title' => "30g limit",
                                'description' =>
                                    "Individuals are allowed to possess up to 30 grams of marijuana in public.",
                                'status' => true,
                                'image_url' => "/frontend/images/marijuana/service.png",
                            ],
                            [
                                'title' => "trusted source",
                                'description' =>
                                    "Information on marijuana laws and regulations should be obtained from government websites or reputable legal resources.",
                                'status' => true,
                                'image_url' => "/frontend/images/marijuana/service.png",
                            ],
                        ],
                    ],
                    'offer_banner' => [
                        'title' => "welcome to multi store",
                        'description' =>
                            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
                        "tag" => "about me",
                        'status' => true,
                        "banner" => [
                            'banner_1' => [
                                'status' => true,
                                'image_url' => "/frontend/images/marijuana/marijuana_3.png",
                                'redirect_link' => [
                                    'link' => "marijuana",
                                    'link_type' => "collection",
                                ],
                            ],
                            "banner_2" => [
                                'status' => true,
                                'image_url' => "/frontend/images/marijuana/marijuana_2.png",
                                'redirect_link' => [
                                    'link_type' => "collection"
                                ],
                            ],
                        ],
                    ],
                    "products_list" => [
                        'title' => "new products",
                        "tag" => "special offer",
                        'product_ids' => [],
                        'status' => true,
                    ],
                    "category_product" => [
                        "tag" => "our shop",
                        'title' => "Buy Marijuana",
                        'category_ids' => [],
                        'image_url' => "/frontend/images/marijuana/marijuana_4.jpg",
                        'status' => true,
                    ],
                    'featured_blogs' => [
                        "tag" => "recent stroy",
                        'title' => "from the blog",
                        'status' => true,
                        "blog_ids" => [],
                    ],
                    'brand' => [
                        'brand_ids' => [], 
                        'status' => true
                    ],
                    'products_ids' => [],
                ]
            ],

            'gym' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'beverages',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/gym/gym_1.png',
                            ],
                        ],
                    ],
                    'offer_banner' => [
                        'banner_1' => [
                            'image_url' => '/frontend/images/gym/gym_2.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => null,
                                'link_type' => null,
                                'product_ids' => [],
                            ],
                        ],
                        'banner_2' => [
                            'image_url' => '/frontend/images/gym/gym_3.png',
                            'status' => true,
                            'redirect_link' => [
                                'link_type' => null,
                            ],
                        ],
                    ],
                    'products_list' => [
                        'tag' => 'special offer',
                        'title' => 'top collection',
                        'description' => '',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'parallax_product' => [
                        'tag' => 'special offer',
                        'title' => 'top collection',
                        'description' => 'Gym protein powder is a popular supplement for those looking to build muscle and improve their workout performance. Made from various sources.',
                        'product_ids' => [],
                        'image_url' => '/frontend/images/gym/gym_4.png',
                        'status' => true,
                    ],
                    'featured_blogs' => [
                        'tag' => 'recent story',
                        'title' => 'from the blog',
                        'status' => true,
                        'blog_ids' => [],
                    ],
                    'social_media' => [
                        'status' => true,
                        'title' => '# instagram',
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/gym/gym_insta_6.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/gym/gym_insta_5.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/gym/gym_insta_4.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/gym/gym_insta_3.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/gym/gym_insta_2.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/gym/gym_insta_1.png',
                            ],
                        ],
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => true,
                    ],
                    'products_ids' => []
                ]
            ],

            'tools' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'beauty',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/tools/tools_1.png',
                            ],
                        ],
                    ],
                    'services' => [
                        'banners' => [
                            [
                                'title' => 'free shipping',
                                'description' => 'free shipping world wide',
                                'status' => true,
                                'image_url' => '/frontend/images/tools/service.png',
                            ],
                            [
                                'title' => '24 X 7 service',
                                'description' => 'online service for 24 X 7',
                                'status' => true,
                                'image_url' => '/frontend/images/tools/service.png',
                            ],
                            [
                                'title' => 'festival offer',
                                'description' => 'new online special festival offer',
                                'status' => true,
                                'image_url' => '/frontend/images/tools/service.png',
                            ],
                            [
                                'title' => 'online payment',
                                'description' => 'new online special festival offer',
                                'status' => true,
                                'image_url' => '/frontend/images/tools/service.png',
                            ],
                        ],
                        'status' => true,
                    ],
                    'categories' => [
                        'status' => true,
                        'category_ids' => [],
                        'title' => 'welcome to tool store',
                        'description' => 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
                    ],
                    'products_list_1' => [
                        'title' => 'popular products',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'products_list_2' => [
                        'image_url' => '/frontend/images/tools/tools_2.png',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'category_product' => [
                        'status' => true,
                        'left_panel' => [
                            'product_ids' => [],
                            'title' => 'new products',
                            'status' => true,
                        ],
                        'right_panel' => [
                            'product_category' => [
                                'category_ids' => [],
                                'status' => true,
                            ],
                            'product_banner' => [
                                'image_url' => '/frontend/images/tools/tools_3.png',
                                'status' => true,
                                'redirect_link' => [
                                    'link_type' => null,
                                ],
                            ],
                        ],
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => true,
                    ],
                    'products_ids' => []
                ]
            ],

            'shoes' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'shoes',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/shoes/shoes_1.png',
                            ],
                        ],
                    ],
                    'categories_1' => [
                        'status' => true,
                        'category_ids' => [],
                    ],
                    'products_list' => [
                        'title' => 'special products',
                        'tag' => 'our collection',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'about_banner' => [
                        'title' => 'welcome to multi store',
                        'tag' => 'about us',
                        'description' => 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
                        'status' => true,
                        'collection_banner' => [
                            'banner_1' => [
                                'status' => true,
                                'image_url' => '/frontend/images/shoes/shoes_3.png',
                                'redirect_link' => [
                                    'link' => 'shoes',
                                    'link_type' => null,
                                ],
                            ],
                            'banner_2' => [
                                'status' => true,
                                'image_url' => '/frontend/images/shoes/shoes_2.png',
                                'redirect_link' => [
                                    'link' => 'shoes',
                                    'link_type' => null,
                                ],
                            ],
                        ],
                    ],
                    'categories_2' => [
                        'category_ids' => [],
                        'status' => true,
                    ],
                    'slider_products' => [
                        'status' => true,
                        'product_slider_1' => [
                            'title' => 'new products',
                            'product_ids' => [],
                            'status' => true,
                        ],
                        'product_slider_2' => [
                            'title' => 'feature product',
                            'product_ids' => [],
                            'status' => true,
                        ],
                        'product_slider_3' => [
                            'title' => 'best seller',
                            'product_ids' => [],
                            'status' => true,
                        ],
                        'product_slider_4' => [
                            'title' => 'on sale',
                            'product_ids' => [],
                            'status' => true,
                        ],
                    ],
                    'attribute' => [
                        'attribute_id' => null,
                        'status' => true,
                    ],
                    'category_product' => [
                        'category_ids' => [],
                        'status' => true,
                    ],
                    'featured_blogs' => [
                        'title' => 'special products',
                        'tag' => 'our collection',
                        'status' => true,
                        'blog_ids' => [],
                    ],
                    'services' => [
                        'banners' => [
                            [
                                'title' => 'free shipping',
                                'description' => 'free shipping world wide',
                                'status' => true,
                                'image_url' => '/frontend/images/shoes/service.png',
                            ],
                            [
                                'title' => '24 X 7 service',
                                'description' => 'online service for new customer',
                                'status' => true,
                                'image_url' => '/frontend/images/shoes/service.png',
                            ],
                            [
                                'title' => 'festival offer',
                                'description' => 'new online special festival offer',
                                'status' => true,
                                'image_url' => '/frontend/images/shoes/service.png',
                            ],
                        ],
                        'status' => null, 
                    ],
                    'social_media' => [
                        'status' => true,
                        'title' => '# instagram',
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/shoes/shoes_insta_5.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/shoes/shoes_insta_4.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/shoes/shoes_insta_3.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/shoes/shoes_insta_2.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/shoes/shoes_insta_1.png',
                            ],
                        ],
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => true,
                    ],
                    'products_ids' => []
                ]
            ],

            'books' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'books',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/book/book_1.png',
                            ],
                        ],
                    ],
                    'categories_1' => [
                        'status' => true,
                        'category_ids' => [],
                    ],
                    'category_product' => [
                        'tag' => 'exclusive products',
                        'title' => 'special products',
                        'category_ids' => [],
                        'status' => true,
                    ],
                    'categories_2' => [
                        'status' => true,
                        'category_ids' => [],
                    ],
                    'slider_products' => [
                        'tag' => 'exclusive products',
                        'title' => 'special products',
                        'status' => true,
                        'image_url' => '/frontend/images/book/book_4.png',
                        'product_slider_1' => [
                            'title' => 'best sellers',
                            'product_ids' => [],
                            'status' => true,
                        ],
                        'product_slider_2' => [
                            'title' => 'new arrivals',
                            'product_ids' => [],
                            'status' => true,
                        ],
                        'product_slider_3' => [
                            'title' => 'pre orders',
                            'product_ids' => [],
                            'status' => true,
                        ],
                    ],
                    'offer_banner' => [
                        'banner_1' => [
                            'image_url' => '/frontend/images/book/book_3.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => null,
                                'link_type' => null,
                                'product_ids' => [],
                            ],
                        ],
                        'banner_2' => [
                            'image_url' => '/frontend/images/book/book_2.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => null,
                                'link_type' => null,
                                'product_ids' => [],
                            ],
                        ],
                    ],
                    'products_list' => [
                        'title' => 'special products',
                        'tag' => 'exclusive products',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'featured_blogs' => [
                        'title' => 'latest blog',
                        'tag' => 'recent stroy',
                        'status' => true,
                        'blog_ids' => [],
                    ],
                    'brand' => [
                        'brand_ids' => [],
                    ],
                    'products_ids' => []
                ]
            ],

            'kids' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'beauty',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/kids/kids_1.png',
                            ],
                        ],
                    ],
                    'offer_banner' => [
                        'banner_1' => [
                            'image_url' => '/frontend/images/kids/kids_3.png',
                            'status' => true,
                            'redirect_link' => [], 
                        ],
                        'banner_2' => [
                            'image_url' => '/frontend/images/kids/kids_2.png',
                            'status' => true,
                            'redirect_link' => [], 
                        ],
                    ],
                    'products_list' => [
                        'title' => 'top collection',
                        'tag' => 'special offer',
                        'description' => 'We will foster imaginative thinking and help your youngster reach their full potential. Joining us is interesting and entertaining!',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'full_banner' => [
                        'image_url' => '/frontend/images/kids/kids_4.png',
                        'status' => true,
                        'redirect_link' => [], 
                    ],
                    'slider_products' => [
                        'status' => true,
                        'product_slider_1' => [
                            'title' => 'new product',
                            'product_ids' => [],
                            'status' => true,
                        ],
                        'product_slider_2' => [
                            'title' => 'feature product',
                            'product_ids' => [],
                            'status' => true,
                        ],
                        'product_slider_3' => [
                            'title' => 'best seller',
                            'product_ids' => [],
                            'status' => true,
                        ],
                        'product_slider_4' => [
                            'title' => 'on sale',
                            'product_ids' => [],
                            'status' => true,
                        ],
                    ],
                    'social_media' => [
                        'status' => true,
                        'title' => '# instagram',
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/kids/kids_insta_7.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/kids/kids_insta_6.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/kids/kids_insta_5.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/kids/kids_insta_4.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/kids/kids_insta_3.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/kids/kids_insta_2.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/kids/kids_insta_1.png',
                            ],
                        ],
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => true,
                    ],
                    'products_ids' => []
                ]
            ],

            'game' => [
                'content' => [
                    'brand' => [
                        'status' => true,
                        'brand_ids' => []
                    ],
                    'home_banner' => [
                        'banners' => [
                            [
                                'status' => true,
                                'image_url' => "/frontend/images/game/game_1.png",
                                'redirect_link' => [
                                    'link' => "beverages",
                                    'link_type' => null
                                ]
                            ]
                        ]
                    ],
                    'products_ids' => [],
                    "products_list" => [
                        "tag" => "special offer",
                        'title' => "top collection",
                        'status' => true,
                        'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                        'product_ids' => []
                    ],
                    'offer_banner_1' => [
                        'banner_1' => [
                            'status' => true,
                            'image_url' => "/frontend/images/game/game_3.png",
                            'redirect_link' => [
                                'link_type' => null
                            ]
                        ],
                        "banner_2" => [
                            'status' => true,
                            'image_url' => "/frontend/images/game/game_2.png",
                            'redirect_link' => [
                                'link_type' => null
                            ]
                        ]
                    ],
                    'offer_banner_2' => [
                        'status' => true,
                        'image_url' => "/frontend/images/game/game_4.png",
                        'redirect_link' => [
                            'link_type' => null
                        ]
                    ],
                    "parallax_banner" => [
                        'title' => "xbox games",
                        'status' => true,
                        'image_url' => "/frontend/images/game/game_5.png",
                        "sub_title" => "special offer",
                        "main_title" => "2019"
                    ],
                    "slider_products" => [
                        'status' => true,
                        "product_slider_1" => [
                            'title' => "new products",
                            'status' => true,
                            'product_ids' => []
                        ],
                        "product_slider_2" => [
                            'title' => "feature product",
                            'status' => true,
                            'product_ids' => []
                        ],
                        "product_slider_3" => [
                            'title' => "best seller",
                            'status' => true,
                            'product_ids' => []
                        ],
                        "product_slider_4" => [
                            'title' => "best seller",
                            'status' => true,
                            'product_ids' => []
                        ]
                    ],
                    "category_product" => [
                        "tag" => "special offer",
                        'title' => "top collection",
                        'status' => true,
                        'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                        'category_ids' => []
                    ]
                ]
            ],

            'beauty' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'serene-beauty',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/beauty/beauty_1.png'
                            ]
                        ]
                    ],
                    'about_us' => [
                        'status' => true,
                        'title' => 'about us',
                        'description' => 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.sit voluptatem accusantium doloremque laudantium,totam rem aperiam.',
                        'image_url' => '/frontend/images/beauty/beauty_2.png',
                        'services' => [
                            'banners' => [
                                [
                                    'title' => 'free shipping',
                                    'description' => null,
                                    'status' => true,
                                    'image_url' => '/frontend/images/beauty/service.png'
                                ],
                                [
                                    'title' => '24 X 7 service',
                                    'description' => null,
                                    'status' => true,
                                    'image_url' => '/frontend/images/beauty/service.png'
                                ],
                                [
                                    'title' => 'festival offer',
                                    'description' => null,
                                    'status' => true,
                                    'image_url' => '/frontend/images/beauty/service.png'
                                ]
                            ]
                        ]
                    ],
                    'products_list_1' => [
                        'title' => 'new product',
                        'tag' => 'special offer',
                        'product_ids' => [],
                        'status' => true
                    ],
                    'product_video' => [
                        'title' => 'product tutorial',
                        'tag' => 'special offer',
                        'image_url' => '/frontend/images/beauty/beauty_3.png',
                        'video_url' => '/frontend/images/beauty/product-vedio.mp4',
                        'status' => true
                    ],
                    'products_list_2' => [
                        'title' => 'top collection',
                        'tag' => 'special offer',
                        'product_ids' => [],
                        'status' => true
                    ],
                    'featured_blogs' => [
                        'title' => 'from the blog',
                        'tag' => 'Recent Story',
                        'status' => true,
                        'blog_ids' => []
                    ],
                    'social_media' => [
                        'status' => true,
                        'title' => '# instagram',
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/beauty/beauty_insta_1.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/beauty/beauty_insta_1.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/beauty/beauty_insta_1.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/beauty/beauty_insta_1.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/beauty/beauty_insta_1.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/beauty/beauty_insta_1.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url'
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/beauty/beauty_insta_1.png'
                            ]
                        ]
                    ],
                    'brand' => [
                        'brand_ids' => []
                    ],
                    'products_ids' => []
                ]
            ],

            'video_slider' => [
                'content' => [
                        'home_banner' => [
                            'banners' => [
                                [
                                    'redirect_link' => [
                                        'link' => 'fashion',
                                        'link_type' => null,
                                    ],
                                    'status' => true,
                                    'image_url' => '/frontend/images/video_slider/video_slider.mp4',
                                ],
                            ],
                        ],
                        'collection_banner' => [
                            'banner_1' => [
                                'tag' => 'casual collection',
                                'title' => 'festive sale',
                                'image_url' => '/frontend/images/video_slider/video_slider_3.png',
                                'status' => true,
                                'redirect_link' => [
                                    'link' => 'shoes',
                                    'link_type' => null,
                                ],
                            ],
                            'banner_2' => [
                                'tag' => 'going out collection',
                                'title' => 'upto 80% off',
                                'image_url' => '/frontend/images/video_slider/video_slider_2.png',
                                'status' => true,
                                'redirect_link' => [
                                    'link' => 'fashion',
                                    'link_type' => null,
                                ],
                            ],
                            'banner_3' => [
                                'tag' => 'shoes & sandle',
                                'title' => 'new collection',
                                'image_url' => '/frontend/images/video_slider/video_slider_1.png',
                                'status' => true,
                                'redirect_link' => [
                                    'link' => 'fashion',
                                    'link_type' => null,
                                ],
                            ],
                        ],
                        'category_product' => [
                            'tag' => 'special offer',
                            'title' => 'top collection',
                            'category_ids' => [],
                            'status' => true,
                        ],
                        'parallax_banner' => [
                            'main_title' => 'KIDS',
                            'title' => 'FASHION TRENDS',
                            'sub_title' => 'SPECIAL OFFER',
                            'image_url' => '/frontend/images/video_slider/video_slider_4.png',
                            'status' => true,
                        ],
                        'products_list' => [
                            'title' => 'special products',
                            'product_ids' => [],
                            'status' => true,
                        ],
                        'services' => [
                            'banners' => [
                                [
                                    'title' => 'free shipping',
                                    'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
                                    'status' => true,
                                    'image_url' => '/frontend/images/video_slider/service1.png',
                                ],
                                [
                                    'title' => '24 X 7 service',
                                    'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
                                    'status' => true,
                                    'image_url' => '/frontend/images/video_slider/service2.png',
                                ],
                                [
                                    'title' => 'festival offer',
                                    'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
                                    'status' => true,
                                    'image_url' => '/frontend/images/video_slider/service3.png',
                                ],
                                [
                                    'title' => 'online payment',
                                    'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
                                    'status' => true,
                                    'image_url' => '/frontend/images/video_slider/service4.png',
                                ],
                            ],
                        ],
                        'featured_blogs' => [
                            'tag' => 'recent stroy',
                            'title' => 'from the blog',
                            'status' => true,
                            'blog_ids' => [],
                        ],
                        'social_media' => [
                            'title' => '#instagram',
                            'status' => true,
                            'banners' => [
                                [
                                    'redirect_link' => [
                                        'link' => '',
                                        'link_type' => 'external_url',
                                    ],
                                    'status' => true,
                                    'image_url' => '/frontend/images/video_slider/video_slider_social_media1.png',
                                ],
                                [
                                    'redirect_link' => [
                                        'link' => '',
                                        'link_type' => 'external_url',
                                    ],
                                    'status' => true,
                                    'image_url' => '/frontend/images/video_slider/video_slider_social_media2.png',
                                ],
                                [
                                    'redirect_link' => [
                                        'link' => '',
                                        'link_type' => 'external_url',
                                    ],
                                    'status' => true,
                                    'image_url' => '/frontend/images/video_slider/8.jpg',
                                ],
                                [
                                    'redirect_link' => [
                                        'link' => '',
                                        'link_type' => 'external_url',
                                    ],
                                    'status' => true,
                                    'image_url' => '/frontend/images/video_slider/video_slider_social_media4.png',
                                ],
                                [
                                    'redirect_link' => [
                                        'link' => '',
                                        'link_type' => 'external_url',
                                    ],
                                    'status' => true,
                                    'image_url' => '/frontend/images/video_slider/video_slider_social_media5.png',
                                ],
                            ],
                        ],
                        'brand' => [
                            'brand_ids' => [],
                            'status' => true,
                        ],
                        'products_ids' => []
                ]
            ],

            'goggles' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'reading-glasses',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/goggles/goggles_1.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'reading-glasses',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/goggles/goggles_2.png',
                            ],
                        ],
                    ],
                    'services' => [
                        'banners' => [
                            [
                                'title' => 'free shipping',
                                'description' => 'free shipping world wide',
                                'status' => true,
                                'image_url' => '/frontend/images/goggles/service.png',
                            ],
                            [
                                'title' => '24 X 7 service',
                                'description' => 'online service for new customer',
                                'status' => true,
                                'image_url' => '/frontend/images/goggles/service.png',
                            ],
                            [
                                'title' => 'festival offer',
                                'description' => 'new online special festival offer',
                                'status' => true,
                                'image_url' => '/frontend/images/goggles/service.png',
                            ],
                        ],
                    ],
                    'offer_banner' => [
                        'banner_1' => [
                            'image_url' => '/frontend/images/goggles/goggles_5.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'reading-glasses',
                                'link_type' => null,
                            ],
                        ],
                        'banner_2' => [
                            'image_url' => '/frontend/images/goggles/goggles_4.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'reading-glasses',
                                'link_type' => null,
                            ],
                        ],
                        'banner_3' => [
                            'image_url' => '/frontend/images/goggles/goggles_3.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'reading-glasses',
                                'link_type' => null,
                            ],
                        ],
                    ],
                    'products_list' => [
                        'title' => 'special product',
                        'tag' => 'our collection',
                        'description' => 'Not only can eyeglasses be used to correct vision, but they can also be stylish accessories that complement your appearance and express your own personality.',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'full_banner' => [
                        'image_url' => '/frontend/images/goggles/goggles_6.png',
                        'redirect_link' => [
                            'link' => 'reading-glasses',
                            'link_type' => null,
                        ],
                        'status' => true,
                    ],
                    'category_product' => [
                        'category_ids' => [],
                        'status' => true,
                    ],
                    'social_media' => [
                        'status' => true,
                        'title' => '# instagram',
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/goggles/goggles_insta_5.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/goggles/goggles_insta_4.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/goggles/goggles_insta_3.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/goggles/goggles_insta_2.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/goggles/goggles_insta_1.png',
                            ],
                        ],
                    ],
                    'brand' => [
                        'brand_ids' => [],
                    ],
                    'products_ids' => []
                ]
            ],

            'flower' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'flowers',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/flower/flower_1.png',
                            ],
                        ],
                    ],
                    'offer_banner' => [
                        'banner_1' => [
                            'image_url' => '/frontend/images/flower/flower_2.png',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'flowers',
                                'link_type' => null,
                            ],
                        ],
                        'banner_2' => [
                            'image_url' => '/frontend/images/flower/flower_3.png',
                            'status' => true,
                            'redirect_link' => [
                                'link_type' => null,
                            ],
                        ],
                    ],
                    'products_list_1' => [
                        'title' => 'best selling products',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'category_product' => [
                        'tag' => '',
                        'title' => 'trending products',
                        'category_ids' => [],
                        'status' => true,
                    ],
                    'products_list_2' => [
                        'tag' => '',
                        'title' => 'trending items',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'featured_blogs' => [
                        'tag' => 'our story',
                        'title' => 'from the blog',
                        'status' => true,
                        'blog_ids' => [],
                    ],
                    'services' => [
                        'banners' => [
                            [
                                'title' => 'free shipping',
                                'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
                                'status' => true,
                                'image_url' => '/frontend/images/flower/service.png',
                            ],
                            [
                                'title' => '24 X 7 service',
                                'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
                                'status' => true,
                                'image_url' => '/frontend/images/flower/service.png',
                            ],
                            [
                                'title' => 'festival offer',
                                'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
                                'status' => true,
                                'image_url' => '/frontend/images/flower/service.png',
                            ],
                            [
                                'title' => 'online payment',
                                'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
                                'status' => true,
                                'image_url' => '/frontend/images/flower/service.png',
                            ],
                        ],
                    ],
                    'social_media' => [
                        'status' => true,
                        'title' => '# instagram',
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/flower/flower_insta_5.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/flower/flower_insta_4.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/flower/flower_insta_3.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/flower/flower_insta_2.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/flower/flower_insta_1.png',
                            ],
                        ],
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => false,
                    ],
                    'products_ids' => []
                ]
            ],

            'nursery' => [
                'content' => [
                    'home_banner' => [
                        'background_image' => '/frontend/images/nursery/nursery_bg.png',
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'green-haven-nursery',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/nursery/nursery_1.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'green-haven-nursery',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/nursery/nursery_2.png',
                            ],
                        ],
                    ],
                    'products_list' => [
                        'title' => 'trendnig products',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'category_product' => [
                        'title' => 'special products',
                        'category_ids' => [],
                        'status' => true,
                    ],
                    'featured_blogs' => [
                        'tag' => 'recent stroy',
                        'title' => 'latest blog',
                        'status' => true,
                        'blog_ids' => [],
                    ],
                    'social_media' => [
                        'status' => true,
                        'title' => '# instagram',
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/nursery/nursery_insta_7.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/nursery/nursery_insta_6.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/nursery/nursery_insta_5.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/nursery/nursery_insta_4.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/nursery/nursery_insta_3.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/nursery/nursery_insta_2.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/nursery/nursery_insta_1.png',
                            ],
                        ],
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => false,
                    ],
                    'products_ids' => []
                ]
            ],

            'pets' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'pet-paradise',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/pets/pets_1.png',
                            ],
                        ],
                    ],
                    'brand' => [
                        'brand_ids' => [],
                        'status' => false,
                    ],
                    'offer_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'pet-paradise',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/pets/pets_7.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'pet-paradise',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/pets/pets_6.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'pet-paradise',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/pets/pets_4.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'pet-paradise',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/pets/pets_3.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'pet-paradise',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/pets/pets_5.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'pet-paradise',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/pets/pets_2.png',
                            ],
                        ],
                    ],
                    'products_list_1' => [
                        'tag' => 'special offer',
                        'title' => 'Top collection',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'parallax_banner' => [
                        'main_title' => 'CHOOSE WHAT YOU LOVE',
                        'title' => 'GET UP TO 70% OFF',
                        'description' => 'Indulge your pets with top-tier products at up to 70% off. Treat them to quality and savings they deserve!',
                        'image_url' => '/frontend/images/pets/pets_8.png',
                        'status' => true,
                    ],
                    'products_list_2' => [
                        'title' => 'save and extra',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'featured_blogs' => [
                        'tag' => 'recent story',
                        'title' => 'from the blog',
                        'status' => true,
                        'blog_ids' => [],
                    ],
                    'products_ids' => []
                ]
            ],

            'video' => [
                'content' => [
                    'video' => [
                        'status' => true,
                        'video_url' => '/frontend/images/video_slider/slider.mp4',
                    ]
                ]
            ],

            'surfboard' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'surfboard',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/surfboard/surfboard_1.png',
                            ],
                        ],
                    ],
                    'categories' => [
                        'status' => true,
                        'title' => 'Our Categories',
                        'category_ids' => [],
                    ],
                    'products_list' => [
                        'status' => true,
                        'title' => 'Our Top Surfing Boards',
                        'tag' => 'New Product',
                        'product_ids' => [],
                    ],
                    'offer_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/surfboard/surfboard_4.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'surfboard',
                                    'link_type' => null,
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/surfboard/surfboard_3.png',
                            ],
                        ],
                    ],
                    'category_product' => [
                        'tag' => 'New',
                        'title' => 'Our Product',
                        'category_ids' => [],
                        'status' => true,
                    ],
                    'social_media' => [
                        'title' => '# INSTAGRAM',
                        'status' => true,
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/surfboard/surfboard_insta_5.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/surfboard/surfboard_insta_4.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/surfboard/surfboard_insta_3.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/surfboard/surfboard_insta_2.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/surfboard/surfboard_insta_5.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/surfboard/surfboard_insta_3.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => null,
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/surfboard/surfboard_insta_1.png',
                            ],
                        ],
                    ],
                    'brand' => [],
                    'products_ids' => [],
                ]
            ],

            'full_page' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'beverages',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/full_page/full_page_1.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'beverages',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/full_page/full_page_2.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'beverages',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/full_page/full_page_3.png'
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'beverages',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/full_page/full_page_4.png'
                            ]
                        ]
                    ]
                ]
            ],

            'parallax' => [
                'content' => [
                    'parallax_banner' => [
                        'banners' => [
                            [
                                'status' => true,
                                'main_title' => '2024',
                                'title' => 'fashion trends',
                                'sub_title' => 'special offer',
                                'image_url' => '/frontend/images/parallax/parallax_3.png',
                            ],
                            [
                                'status' => true,
                                'main_title' => '2024',
                                'title' => 'the summer',
                                'sub_title' => 'special offer',
                                'image_url' => '/frontend/images/parallax/parallax_4.png',
                            ],
                            [
                                'status' => true,
                                'main_title' => '2024',
                                'title' => 'top trends',
                                'sub_title' => 'special offer',
                                'image_url' => '/frontend/images/parallax/parallax_1.png',
                            ],
                            [
                                'status' => true,
                                'main_title' => '2024',
                                'title' => 'new collection',
                                'sub_title' => 'special offer',
                                'image_url' => '/frontend/images/parallax/parallax_2.png',
                            ],
                        ]
                    ]
                ]
            ],

            'gradient' => [
                'content' => [
                    'home_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'fashion',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/gradient/gradient_1.png',
                            ],
                        ],
                    ],
                    'categories_1' => [
                        'status' => true,
                        'category_ids' => [],
                    ],
                    'offer_banner' => [
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => 'fashion',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/gradient/gradient_3.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'fit-gear-central',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/gradient/gradient_2.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'bag-emporium',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/gradient/gradient_4.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'shoes',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/gradient/gradient_5.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => 'fashion',
                                    'link_type' => null
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/gradient/gradient_6.png',
                            ],
                        ],
                    ],
                    'category_product' => [
                        'tag' => 'exclusive products',
                        'title' => 'special products',
                        'category_ids' => [],
                        'status' => true,
                    ],
                    'categories_2' => [
                        'status' => true,
                        'category_ids' => [],
                    ],
                    'products_list' => [
                        'tag' => 'exclusive products',
                        'title' => 'special products',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'parallax_banner' => [
                        'banner_1' => [
                            'main_title' => '2018',
                            'title' => 'fashion trends',
                            'sub_title' => 'special offer',
                            'image_url' => '/frontend/images/gradient/gradient_7.png',
                            'status' => true,
                        ],
                        'banner_2' => [
                            'main_title' => '2018',
                            'title' => 'fashion trends',
                            'sub_title' => 'special offer',
                            'image_url' => '/frontend/images/gradient/gradient_8.png',
                            'status' => true,
                        ],
                    ],
                    'coupons' => [
                        'status' => true,
                        'coupon_ids' => [],
                    ],
                    'featured_blogs' => [
                        'tag' => 'recent stroy',
                        'title' => 'from the blog',
                        'status' => true,
                        'blog_ids' => [],
                    ],
                    'social_media' => [
                        'status' => true,
                        'title' => '# instagram',
                        'banners' => [
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/gradient/gradient_insta_2.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/gradient/gradient_insta_3.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/gradient/gradient_insta_4.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/gradient/gradient_insta_5.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/gradient/gradient_insta_6.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/gradient/gradient_insta_7.png',
                            ],
                            [
                                'redirect_link' => [
                                    'link' => '',
                                    'link_type' => 'external_url',
                                ],
                                'status' => true,
                                'image_url' => '/frontend/images/gradient/gradient_insta_8.png',
                            ],
                        ],
                    ],
                    'brand' => [
                        'brand_ids' => [],
                    ],
                    'products_ids' => []
                ]
            ],

            'digital_download' => [
                'content' => [
                    'home_banner' => [
                        'status' => true,
                        'tag' => '',
                        'title' => 'Modern Themes & Website Template for any project',
                        'description' => 'Discover thousands of digital product & downloads',
                        'background_image' => '/frontend/images/digital_download/bg.png',
                        'sub_image_1' => '/frontend/images/digital_download/digital_download-sub_banner_1.png',
                        'sub_image_2' => '/frontend/images/digital_download/digital_download-sub_banner_2.png',
                    ],
                    'categories_icon_list' => [
                        'category_ids' => [],
                        'status' => true,
                    ],
                    'products_list' => [
                        'tag' => 'exclusive products',
                        'title' => 'Featured Templates',
                        'product_ids' => [],
                        'status' => true,
                    ],
                    'products_list_2' => [
                        'status' => true,
                        'image_url' => '/frontend/images/digital_download/middle-bg.jpg',
                        'left_panel' => [
                            'title' => 'Featured Templates',
                            'description' => 'Every week, our staff personally hand-pick some of the best new website themes from our collection.',
                            'more_button' => true,
                            'button_text' => 'Shop Now',
                            'status' => true,
                            'redirect_link' => [
                                'link' => 'baby-essentials',
                                'link_type' => null,
                            ],
                        ],
                        'products' => [
                            'product_ids' => [],
                        ],
                    ],
                    'category_product' => [
                        'tag' => 'new collection',
                        'title' => 'Newest Items',
                        'category_ids' => [],
                        'status' => true,
                    ],
                    'featured_blogs' => [
                        'tag' => 'recent stroy',
                        'title' => 'Tips, Tricks, And Trends',
                        'status' => true,
                        'blog_ids' => [],
                    ],
                    'products_ids' => [],
                ]
            ]
            
        ];

        foreach($contents as $slug => $data) {
            HomePage::updateOrCreate([
                'slug' => $slug,
                'content' => $data['content'],
            ]);
        }

        DB::table('seeders')->updateOrInsert([
            'name' => 'HomePageSeeder',
            'is_completed' => true
        ]);
    }
}
