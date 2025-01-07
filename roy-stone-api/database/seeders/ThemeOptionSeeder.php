<?php

namespace Database\Seeders;

use App\Helpers\Helpers;
use App\Models\ThemeOption;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ThemeOptionSeeder extends Seeder
{
  protected $baseURL;
  protected $baseName;

  public function __construct()
  {
    $this->baseURL = config('app.url');
    $this->baseName = config('app.name');
  }

  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $options = [
      'general' => [
        'site_title' => $this->baseName.' Marketplace: Where Vendors Shine Together',
        'site_tagline' => "Shop Unique, Sell Exceptional â€“ ".$this->baseName."'s Multi-Vendor Universe.",
        'cart_style' => 'cart_sidebar',
        'back_to_top_enable' => true,
        'language_direction' => 'ltr',
        'primary_color' => '#ec8951',
        'secondary_color' => null,
        'mode' => 'light',
        'celebration_effect' => true,
        'seller_register_url' => 'https://angular.pixelstrap.net/multikart-rest',
        'exit_tagline_enable' => true,
        'taglines' => [
          '⚡ Come Back !!',
          '🎉 Offers for you...'
        ]
      ],
      'logo' => [
        'header_logo_id' =>  Helpers::getAttachmentId('logo-dark.png'),
        'footer_logo_id' =>  Helpers::getAttachmentId('footer-logo.png'),
        'favicon_icon_id' => Helpers::getAttachmentId('favicon.png'),
      ],
      'header' => [
        'sticky_header_enable' => true,
        'header_options' => 'header_one',
        'page_top_bar_enable' => true,
        'top_bar_content' => [
          [
              "content" => "<i class='ri-truck-line'></i>Free Shipping on Orders $100+"
          ],
          [
              "content" =>  "<i class='ri-megaphone-line'></i>Buy One Get Two Free"
          ],
          [
              "content" =>  "<i class='ri-gift-line'></i>Gift Card for all the season"
          ]
        ],
        'support_number' => '+1-555-186-5359',
        'category_ids' => [],
      ],
      'footer' => [
        'footer_style' => 'footer_four',
        'bg_image' => '/frontend/images/footer.png',
        'bg_color' => '#212121',
        'title' => 'KNOW IT ALL FIRST!',
        'sub_title' => 'Never Miss Anything From Store By Signing Up To Our Newsletter.',
        'footer_copyright' => true,
        'copyright_content' => 'Â©2024 '.$this->baseName.' All rights reserved',
        "footer_about" => 'Discover the latest trends and enjoy seamless shopping with our exclusive collections. Join our community and stay updated with special offers and new arrivals',
        "about_address" => "1418 Riverwood Drive, CA 96052, US",
        'about_email' => 'support@example.com',
        'footer_categories' => [],
        'useful_link' => [],
        'help_center' => [],
        "support_number" => "+1-555-186-5359",
        'payment_option_image_url' => '/storage/3865/christmas.jpg',
        'support_email' => 'support@gmail.com',
        'play_store_url' => 'https://play.google.com/store/apps',
        'app_store_url' => 'https://www.apple.com/in/app-store/',
        'social_media_enable' => true,
        'facebook' => 'https://facebook.com/',
        'instagram' => 'https://instagram.com/',
        'twitter' => 'https://twitter.com/',
        'pinterest' => 'https://pinterest.com/',
      ],
      'collection' => [
        'collection_layout' => 'collection_category_slider',
        'collection_categories_ids' => [],
        'collection_banner_image_url' => null, //
      ],
      'product' => [
        'product_layout' => 'product_thumbnail',
        'product_box_variant' => 'product_box_two',
        'image_variant' => 'image_zoom',
        'is_trending_product' => true,
        'safe_checkout' => true,
        'safe_checkout_image' => '/frontend/images/data/payments.png',
        'secure_checkout' => true,
        'secure_checkout_image' => '/frontend/images/data/secure_checkout.png',
        'encourage_order' => true,
        'encourage_max_order_count' => 50,
        'encourage_view' => true,
        'encourage_max_view_count' => 5,
        'sticky_checkout' => true,
        'sticky_product' => true,
        'social_share' => true,
        'shipping_and_return' => '<p>Shipping and Returns are integral parts of your shopping experience, and we aim to make them as smooth as possible. We prioritize efficient shipping, striving to deliver your orders promptly within the estimated delivery window, typically ranging from 5 to 7 days. We understand that sometimes your purchase may not meet your expectations, so we offer a straightforward return policy. If you find yourself unsatisfied with your order, eligible items can be returned within 30 days of purchase, ensuring you have ample time to make a decision. Our commitment is to ensure your satisfaction and convenience throughout your shopping journey with us, and we\'re here to assist you every step of the way.</p><p><strong>Our Shipping Commitment:</strong></p><ul><li><p>Timely and reliable delivery within 5-7 days.</p></li><li><p>Real-time tracking for your orders.</p></li><li><p>Exceptional packaging to ensure your items arrive in perfect condition.</p></li><li><p></p></li></ul><p><strong>Our Hassle-Free Returns:</strong></p><ul><li><p>Eligible items can be returned within 30 days.</p></li><li><p>Easy return initiation through our website.</p></li><li><p>Prompt processing of returns for a hassle-free experience.</p></li><li><p>&nbsp;</p></li></ul><p>We understand that your shopping needs may vary, and we are here to accommodate them while providing exceptional service.</p>',
        'services' => [
            'banners' => []
        ],
        'banner_enable' => true,
        'banner_image_url' => null,
      ],
      'blog' => [
        'blog_style' => 'grid_view',
        'blog_sidebar_type' => 'left_sidebar',
        'blog_author_enable' => true,
        'read_more_enable' => true,
      ],
      'seller' => [
        'about' => [
            'status' => true,
            'title' => 'Start Your Business With Multikart & Reach Customers Across The World...',
            'description' => 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,\n\nOn the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.',
            'image_url' => null,
        ],
        'services' => [
            'status' => true,
            'title' => 'WHY SELL ON MULTIKART?',
            'service_1' => [
                'title' => 'lowest cost',
                'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
                'image_url' => '/frontend/images/data/service.png',
            ],
            'service_2' => [
                'title' => 'high growth rate',
                'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text',
                'image_url' => '/frontend/images/data/service.png',
            ],
            'service_3' => [
                'title' => 'dedicated pickup',
                'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text',
                'image_url' => '/frontend/images/data/service.png',
            ],
            'service_4' => [
                'title' => 'most approachable',
                'description' => 'Contrary to popular belief, Lorem Ipsum is not simply random text',
                'image_url' => '/frontend/images/data/service.png',
            ],
        ],
        'steps' => [
            'status' => true,
            'title' => 'Doing Business On Multikart Is Really Easy',
            'step_1' => [
                'title' => 'List your products & Get support service provider',
                'description' => 'Register your business for free and create a product catalogue. Sell under your own private label or sell an existing brand. Get your documentation & cataloging done with ease from our Professional Services network.',
            ],
            'step_2' => [
                'title' => 'Receive Orders & Schedule A Pickup',
                'description' => 'Once listed, your products will be available to millions of users. Get orders and manage your online business via our Seller Panel and Seller Zone Mobile App.',
            ],
            'step_3' => [
                'title' => 'Receive Quick Payment & Grow Your Business',
                'description' => 'Receive quick and hassle-free payments in your account once your orders are fulfilled. Expand your business with low interest & collateral-free loans.',
            ],
        ],
        'start_selling' => [
            'status' => true,
            'title' => 'Start Selling',
            'description' => 'Multikart marketplace is India’s leading platform for selling online. Be it a manufacturer, vendor or supplier, simply sell your products online on Multikart and become a top ecommerce player with minimum investment. Through a team of experts offering exclusive seller workshops, training, seller support and convenient seller portal, Multikart focuses on educating and empowering sellers across India. Selling on Multikart.com is easy and absolutely free. All you need is to register, list your catalogue and start selling your products.',
        ],
      ],
      'contact_us' => [
        'title' =>  'Get In Touch',
        'description' =>  "We're here to help! Reach out to us with any questions, feedback, or inquiries, and we'll get back to you as soon as possible.",
        'detail_1' => [
          "label" => "Phone",
          "icon" =>  "ri-phone-line",
          "text" => "(+1) 618 190 496"
        ],
        'detail_2' => [
          "label" => "Address",
          "icon" =>  "ri-mail-line",
          "text" => "ABC Complex,Near xyz, New York"
        ],
        'detail_3' => [
          "label" => "Email",
          "icon" =>  "ri-map-pin-line",
          "text" => "support@multikart.com"
        ],
        'detail_4' => [
          "label" => "Fax",
          "icon" =>  "ri-building-line",
          "text" => "support@multikart.com"
        ]
      ],
      'about_us' => [
        'about' => [
            'status' => true,
            'content_bg_image_url' => '/frontend/images/data/banner.png',
            'title' => 'Sed Ut Perspiciatis Unde Omnis Iste Natus Error Sit Voluptatem Accusantium Doloremque Laudantium',
            'description' => 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,\n\nOn the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.',
            'futures' => [
                [
                    'icon' => null,
                    'title' => 'Free Shipping',
                    'description' => 'Free Shipping World Wide'
                ],
                [
                    'icon' => null,
                    'title' => '24 X 7 Service',
                    'description' => 'Online Service For New Customer'
                ],
                [
                    'icon' => null,
                    'title' => 'Festival Offer',
                    'description' => 'New Online Special Festival Offer'
                ]
            ]
        ],
        'team' => [
            'status' => true,
            'sub_title' => 'Our Creative Team Multikart',
            'title' => 'Multikart Team Member',
            'members' => [
                [
                    'profile_image_url' => '/frontend/images/data/team-members.png',
                    'name' => 'Hileri Keol',
                    'designation' => 'CEo & Founder At Company',
                    'instagram' => 'https://instagram.com/',
                    'twitter' => 'https://twitter.com/',
                    'pinterest' => 'https://pinterest.com/',
                    'facebook' => 'https://www.facebook.com/'
                ],
                [
                    'profile_image_url' => '/frontend/images/data/team-members.png',
                    'name' => 'Constance K. Whang',
                    'designation' => 'Jr. Project Manager',
                    'instagram' => 'https://instagram.com/',
                    'twitter' => 'https://twitter.com/',
                    'pinterest' => 'https://pinterest.com/',
                    'facebook' => 'https://www.facebook.com/'
                ],
                [
                    'profile_image_url' => '/frontend/images/data/team-members.png',
                    'name' => 'Betty J. Turner',
                    'designation' => 'CEO, Company',
                    'instagram' => 'https://instagram.com/',
                    'twitter' => 'https://twitter.com/',
                    'pinterest' => 'https://pinterest.com/',
                    'facebook' => 'https://www.facebook.com/'
                ],
                [
                    'profile_image_url' => '/frontend/images/data/team-members.png',
                    'name' => 'Alfredo S. Rocha',
                    'designation' => 'Sr. Project Manager',
                    'instagram' => 'https://instagram.com/',
                    'twitter' => 'https://twitter.com/',
                    'pinterest' => 'https://pinterest.com/',
                    'facebook' => 'https://www.facebook.com/'
                ]
            ]
        ],
        'testimonial' => [
            'status' => true,
            'sub_title' => 'Latest Testimonials',
            'title' => 'What People Say',
            'reviews' => [
                [
                    'title' => 'Alfredo S. Rocha',
                    'profile_image_url' => '/frontend/images/data/testimonials.png',
                    'name' => 'Alfredo S. Rocha',
                    'review' => '"I bought this product on a budget, and it exceeded my expectations. The quality is impressive for the price. I\'m delighted with my purchase."',
                    'designation' => 'CEO, Company'
                ],
                [
                    'title' => 'Betty J. Turner',
                    'profile_image_url' => '/frontend/images/data/testimonials.png',
                    'name' => 'Betty J. Turner',
                    'review' => '"I had high hopes for this product, but it fell short of my expectations. It constantly crashes and lacks essential features. I wouldn\'t recommend it."',
                    'designation' => 'Sr. Project Manager'
                ],
                [
                    'title' => 'Gwen J. Geiger',
                    'profile_image_url' => '/frontend/images/data/testimonials.png',
                    'name' => 'Gwen J. Geiger',
                    'review' => '"I encountered a minor issue with my purchase, and the customer service team was quick to resolve it. Their prompt and friendly support made me a happy customer!"',
                    'designation' => 'Designer'
                ]
            ]
        ]
      ],
      'error_page' => [
        "error_page_content" => "Page not found",
        'back_button_enable' => true,
        'back_button_text' => "Back To Home",
      ],
      'popup' => [
              "news_letter" => [
                "is_enable" => true,
                "image_url" => '/frontend/images/data/popup.png',
                "offer" => "80% off",
                "title" => "NEWSLETTER",
                "description" => "plus, early access to new arrivals, exclusive sales, & lots more?"
              ],
            "exit" => [
                "is_enable" => true,
                "image_url" => '/frontend/images/data/popup.png',
                "title" => "WAIT",
                "sub_title" => "Sorry to see you leaving...",
                "description" => "Enter your email address to receive 10% off your first order"
            ],
            "sale" => [
                "is_enable" => true,
                "text" => "SALE"
            ],
            "auth" => [
                "image_url" => '/frontend/images/data/popup.png'
            ]
      ],
      'seo' => [
        'meta_tags' => "{$this->baseName} Marketplace: Where Vendors Shine Together",
        'meta_title' => "Online Marketplace, Vendor Collaboration, E-commerce Platform",
        'meta_description' => "Discover {$this->baseName} Marketplace – a vibrant online platform where vendors unite to showcase their products, creating a diverse shopping experience. Explore a wide range of offerings and connect with sellers on a single platform.",
        'og_title' =>  "{$this->baseName} Marketplace: Uniting Vendors for Shopping Excellence",
        'og_description' => "Experience a unique shopping journey at {$this->baseName} Marketplace, where vendors collaborate to provide a vast array of products. Explore, shop, and connect in one convenient destination.",
        'og_image_id' => null
      ],
    ];

    ThemeOption::updateOrCreate(['options' => $options]);
    DB::table('seeders')->updateOrInsert([
      'name' => 'ThemeOptionSeeder',
      'is_completed' => true
    ]);
  }
}
