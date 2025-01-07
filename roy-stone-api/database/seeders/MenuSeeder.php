<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run():  void
    {
        $menuItems = [
            [
                "title" =>  "Home",
                "link_type" =>  "link",
                "mega_menu" =>  0,
                "set_page_link" =>  null,
                "mega_menu_type" =>  "simple",
                "sort" =>  "0",
                "slug" =>  "home",
                "path" =>  "/",
                "type" =>  null,
                "badge_text" =>  null,
                "badge_color" =>  null,
                "is_target_blank" =>  0,
                "child" =>  []
            ],
            [
              "title" =>  "Collections",
              "link_type" =>  "link",
              "mega_menu" =>  0,
              "set_page_link" =>  null,
              "mega_menu_type" =>  "simple",
              "sort" =>  "1",
              "slug" =>  "collections",
              "path" =>  "/collections",
              "type" =>  null,
              "badge_text" =>  null,
              "badge_color" =>  null,
              "is_target_blank" =>  0,
              "child" =>  []
            ], 
            [
              "title" =>  "Blogs",
              "link_type" =>  "link",
              "mega_menu" =>  0,
              "sort" =>  "2",
              "slug" =>  "blogs",
              "path" =>  "/blogs",
              "type" =>  null,
              "badge_text" =>  null,
              "badge_color" =>  null,
              "is_target_blank" =>  0,
              "child" =>  []
            ], 
            [
                "title" =>  "Seller",
                "link_type" =>  "sub",
                "mega_menu" =>  0,
                "set_page_link" =>  null,
                "mega_menu_type" =>  "simple",
                "sort" =>  "3",
                "slug" =>  "seller",
                "path" =>  null,
                "type" =>  null,
                "badge_text" =>  null,
                "badge_color" =>  null,
                "is_target_blank" =>  0,
                "child" =>  [
                    [
                        "id" =>  45,
                        "title" =>  "Become Seller",
                        "sort" =>  "0",
                        "link_type" =>  "link",
                        "is_target_blank" =>  0,
                        "mega_menu" =>  0,
                        "mega_menu_type" =>  null,
                        "slug" =>  "become-seller",
                        "type" =>  null,
                        "path" =>  "/seller/become-seller",
                        "badge_text" =>  null,
                        "badge_color" =>  null,
                        "set_page_link" =>  null,
                        "child" =>  []
                    ],
                    [
                        "id" =>  46,
                        "title" =>  "Seller Stores",
                        "sort" =>  "1",
                        "link_type" =>  "link",
                        "is_target_blank" =>  0,
                        "mega_menu" =>  0,
                        "mega_menu_type" =>  "simple",
                        "slug" =>  "seller-stores",
                        "type" =>  null,
                        "path" =>  "/seller/stores",
                        "badge_text" =>  null,
                        "badge_color" =>  null,
                        "set_page_link" =>  null,
                        "child" =>  []
                    ]
                ]
            ],
            [
                "id" =>  57,
                "title" =>  "Pages",
                "sort" =>  "4",
                "link_type" =>  "sub",
                "is_target_blank" =>  0,
                "mega_menu" =>  0,
                "mega_menu_type" =>  "simple",
                "slug" =>  "pages",
                "type" =>  null,
                "path" =>  null,
                "badge_text" =>  null,
                "badge_color" =>  null,
                "set_page_link" =>  null,
                "child" =>  [
                    [
                        "id" =>  58,
                        "title" =>  "Account",
                        "sort" =>  "0",
                        "link_type" =>  "sub",
                        "is_target_blank" =>  0,
                        "mega_menu" =>  0,
                        "mega_menu_type" =>  "simple",
                        "slug" =>  "account",
                        "type" =>  null,
                        "path" =>  null,
                        "badge_text" =>  null,
                        "badge_color" =>  null,
                        "set_page_link" =>  null,
                        "child" =>  [
                            [
                                "id" =>  59,
                                "title" =>  "My Dashboard",
                                "sort" =>  "0",
                                "link_type" =>  "link",
                                "is_target_blank" =>  0,
                                "mega_menu" =>  0,
                                "mega_menu_type" =>  null,
                                "slug" =>  "my-dashboard",
                                "type" =>  null,
                                "path" =>  "/account/dashboard",
                                "badge_text" =>  null,
                                "badge_color" =>  null,
                                "set_page_link" =>  null,
                                "child" =>  []
                            ],
                            [
                                "id" =>  60,
                                "title" =>  "My Notifications",
                                "sort" =>  "1",
                                "link_type" =>  "link",
                                "is_target_blank" =>  0,
                                "mega_menu" =>  0,
                                "mega_menu_type" =>  null,
                                "slug" =>  "my-notifications",
                                "type" =>  null,
                                "path" =>  "/account/notifications",
                                "badge_text" =>  null,
                                "badge_color" =>  null,
                                "set_page_link" =>  null,
                                "child" =>  []
                            ],
                            [
                                "id" =>  61,
                                "title" =>  "Bank Details",
                                "sort" =>  "2",
                                "link_type" =>  "link",
                                "is_target_blank" =>  0,
                                "mega_menu" =>  0,
                                "mega_menu_type" =>  null,
                                "slug" =>  "bank-details",
                                "type" =>  null,
                                "path" =>  "/account/bank-details",
                                "badge_text" =>  null,
                                "badge_color" =>  null,
                                "set_page_link" =>  null,
                                "child" =>  []
                            ],
                            [
                                "id" =>  62,
                                "title" =>  "My Wallet",
                                "sort" =>  "3",
                                "link_type" =>  "link",
                                "is_target_blank" =>  0,
                                "mega_menu" =>  0,
                                "mega_menu_type" =>  null,
                                "slug" =>  "my-wallet",
                                "type" =>  null,
                                "path" =>  "/account/wallet",
                                "badge_text" =>  null,
                                "badge_color" =>  null,
                                "set_page_link" =>  null,
                                "child" =>  []
                            ],
                            [
                                "id" =>  63,
                                "title" =>  "My point",
                                "sort" =>  "4",
                                "link_type" =>  "link",
                                "is_target_blank" =>  0,
                                "mega_menu" =>  0,
                                "mega_menu_type" =>  null,
                                "slug" =>  "my-point",
                                "type" =>  null,
                                "path" =>  "account/point",
                                "badge_text" =>  null,
                                "badge_color" =>  null,
                                "set_page_link" =>  null,
                                "child" =>  []
                            ],
                            [
                                "id" =>  64,
                                "title" =>  "My Order",
                                "sort" =>  "5",
                                "link_type" =>  "link",
                                "is_target_blank" =>  0,
                                "mega_menu" =>  0,
                                "mega_menu_type" =>  null,
                                "slug" =>  "my-order",
                                "type" =>  null,
                                "path" =>  "/account/order",
                                "badge_text" =>  null,
                                "badge_color" =>  null,
                                "set_page_link" =>  null,
                                "child" =>  []
                            ],
                            [
                                "id" =>  65,
                                "title" =>  "Refund History",
                                "sort" =>  "6",
                                "link_type" =>  "link",
                                "is_target_blank" =>  0,
                                "mega_menu" =>  0,
                                "mega_menu_type" =>  null,
                                "slug" =>  "refund-history",
                                "type" =>  null,
                                "path" =>  "/account/refund",
                                "badge_text" =>  null,
                                "badge_color" =>  null,
                                "set_page_link" =>  null,
                                "child" =>  []
                            ]
                        ]
                    ],
                    [
                        "id" =>  66,
                        "title" =>  "About Us",
                        "sort" =>  "1",
                        "link_type" =>  "link",
                        "is_target_blank" =>  0,
                        "mega_menu" =>  0,
                        "mega_menu_type" =>  null,
                        "slug" =>  "about-us",
                        "type" =>  null,
                        "path" =>  "/about-us",
                        "badge_text" =>  null,
                        "badge_color" =>  null,
                        "set_page_link" =>  null,
                        "child" =>  []
                    ],
                    [
                        "id" =>  67,
                        "title" =>  "Browse FAQs",
                        "sort" =>  "2",
                        "link_type" =>  "link",
                        "is_target_blank" =>  0,
                        "mega_menu" =>  0,
                        "mega_menu_type" =>  null,
                        "slug" =>  "browse-faqs",
                        "type" =>  null,
                        "path" =>  "/faq",
                        "badge_text" =>  null,
                        "badge_color" =>  null,
                        "set_page_link" =>  null,
                        "child" =>  []
                    ],
                    [
                        "id" =>  68,
                        "title" =>  "Cart",
                        "sort" =>  "3",
                        "link_type" =>  "link",
                        "is_target_blank" =>  0,
                        "mega_menu" =>  0,
                        "mega_menu_type" =>  null,
                        "slug" =>  "cart",
                        "type" =>  null,
                        "path" =>  "/cart",
                        "badge_text" =>  null,
                        "badge_color" =>  null,
                        "set_page_link" =>  null,
                        "child" =>  []
                    ],
                    [
                        "id" =>  72,
                        "title" =>  "Offers",
                        "sort" =>  "4",
                        "link_type" =>  "link",
                        "is_target_blank" =>  0,
                        "mega_menu" =>  0,
                        "mega_menu_type" =>  "simple",
                        "slug" =>  "offers",
                        "type" =>  null,
                        "path" =>  "/offers",
                        "badge_text" =>  null,
                        "badge_color" =>  null,
                        "set_page_link" =>  null,
                        "child" =>  []
                    ],
                    [
                        "id" =>  71,
                        "title" =>  "Contact Us",
                        "sort" =>  "5",
                        "link_type" =>  "link",
                        "is_target_blank" =>  0,
                        "mega_menu" =>  0,
                        "mega_menu_type" =>  null,
                        "slug" =>  "contact-us",
                        "type" =>  null,
                        "path" =>  "/contact-us",
                        "badge_text" =>  null,
                        "badge_color" =>  null,
                        "set_page_link" =>  null,
                        "child" =>  []
                    ],
                    [
                        "id" =>  70,
                        "title" =>  "Compare",
                        "sort" =>  "6",
                        "link_type" =>  "link",
                        "is_target_blank" =>  0,
                        "mega_menu" =>  0,
                        "mega_menu_type" =>  null,
                        "slug" =>  "compare",
                        "type" =>  null,
                        "path" =>  "/compare",
                        "badge_text" =>  null,
                        "badge_color" =>  null,
                        "set_page_link" =>  null,
                        "child" =>  []
                    ],
                    [
                        "id" =>  69,
                        "title" =>  "Checkout",
                        "sort" =>  "7",
                        "link_type" =>  "link",
                        "is_target_blank" =>  0,
                        "mega_menu" =>  0,
                        "mega_menu_type" =>  null,
                        "slug" =>  "checkout",
                        "type" =>  null,
                        "path" =>  "/checkout",
                        "badge_text" =>  null,
                        "badge_color" =>  null,
                        "set_page_link" =>  null,
                        "child" =>  []
                    ],
                    [
                        "id" =>  73,
                        "title" =>  "Search",
                        "sort" =>  "8",
                        "link_type" =>  "link",
                        "is_target_blank" =>  0,
                        "mega_menu" =>  0,
                        "mega_menu_type" =>  null,
                        "slug" =>  "search",
                        "type" =>  null,
                        "path" =>  "/search",
                        "badge_text" =>  "Hot",
                        "badge_color" =>  null,
                        "set_page_link" =>  null,
                        "child" =>  []
                    ],
                    [
                        "id" =>  74,
                        "title" =>  "Wishlist",
                        "sort" =>  "9",
                        "link_type" =>  "link",
                        "is_target_blank" =>  0,
                        "mega_menu" =>  0,
                        "mega_menu_type" =>  null,
                        "slug" =>  "wishlist",
                        "type" =>  null,
                        "path" =>  "/wishlist",
                        "badge_text" =>  null,
                        "badge_color" =>  null,
                        "set_page_link" =>  null,
                        "child" =>  []
                    ],
                    [
                        "id" =>  75,
                        "title" =>  "404",
                        "sort" =>  "10",
                        "link_type" =>  "link",
                        "is_target_blank" =>  0,
                        "mega_menu" =>  0,
                        "mega_menu_type" =>  null,
                        "slug" =>  "404",
                        "type" =>  null,
                        "path" =>  "/404",
                        "badge_text" =>  null,
                        "badge_color" =>  null,
                        "set_page_link" =>  null,
                        "child" =>  []
                    ]
                ]
            ]
        ];

        foreach ($menuItems as $menuItem) {
            $this->createOrUpdateMenuItem($menuItem);
        }
    }   

    private function createOrUpdateMenuItem($menuItem, $parent = null)
    {
        $menuItemModel = Menu::updateOrCreate([
            "title" =>  $menuItem['title'],
            "link_type" =>  $menuItem['link_type'],
            "mega_menu" =>  $menuItem['mega_menu'],
            "set_page_link" =>  $menuItem['set_page_link'] ?? null,
            "mega_menu_type" =>  $menuItem['mega_menu_type'] ?? null,
            "sort" =>  $menuItem['sort'],
            "slug" =>  $menuItem['slug'],
            "path" =>  $menuItem['path'],
            "type" =>  $menuItem['type'],
            "badge_text" =>  $menuItem['badge_text'],
            "badge_color" =>  $menuItem['badge_color'],
            "parent_id" =>  $parent ? $parent->id : null,
            "is_target_blank" =>  $menuItem['is_target_blank'],
        ]);

        if (count($menuItem['child'])) {
            foreach ($menuItem['child'] as $childMenuItem) {
                $this->createOrUpdateMenuItem($childMenuItem, $menuItemModel);
            }
        }
    }
}
