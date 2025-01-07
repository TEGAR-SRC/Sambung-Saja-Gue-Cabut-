<?php

return [
    'order' => [
        'pivot' => [
            'product_id',
            'variation_id',
            'wholesale_price',
            'quantity',
            'single_price',
            'shipping_cost',
            'product_type',
            'refund_status',
            'subtotal'
        ],
        'with' => [
            'products:id,name,is_return,product_thumbnail_id',
            'sub_orders'
        ]
    ],
    'seeders' => [
        'RoleSeeder',
        'ThemeSeeder',
        'DefaultImagesSeeder',
        'HomePageSeeder',
        'CountriesSeeder',
        'SettingSeeder',
        'ThemeOptionSeeder',
        'OrderStatusSeeder',
        'StateSeeder'
    ],
    'user' => [
        'with' => [
            'point',
            'wallet',
            'address',
            'vendor_wallet',
            'profile_image',
            'payment_account'
        ]
    ],
    'store' => [
        'with' => [
            'store_logo',
            'vendor',
            'country',
            'state'
        ]
    ],
    'product' => [
        'with' => [
            'product_galleries',
            'size_chart_image',
            'store:id,store_name,slug,description,store_logo_id,hide_vendor_email,hide_vendor_phone,vendor_id',
            'attributes',
            'product_meta_image',
            'watermark_image',
            'preview_audio_file',
            'preview_video_file',
            'categories:id,name,slug,type,status',
            'tags:id,name,slug,status',
            'variations',
        ],
        'visible' => [
            'description',
            'cross_products',
            'meta_description',
            'weight',
            'is_licensable',
            'watermark',
            'watermark_position',
            'watermark_image_id',
            'is_licensekey_auto',
            'preview_audio_file_id',
            'preview_video_file_id',
            'separator',
            'preview_type',
            'shipping_days',
            'is_cod',
            'is_free_shipping',
            'sale_starts_at',
            'sale_expired_at',
            'is_random_related_products',
            'meta_title',
            'product_meta_image_id',
            'size_chart_image_id',
            'estimated_delivery_text',
            'return_policy_text',
            'safe_checkout',
            'secure_checkout',
            'encourage_order',
            'encourage_view',
            'cross_products',
            'similar_products',
            'meta_description',
        ],
        'appends' => [
            'user_review',
            'can_review',
            'is_wishlist',
            'rating_count',
            'order_amount',
            'review_ratings',
            'related_products',
            'cross_sell_products',
        ],
        'without' => [
            'product_galleries',
            'size_chart_image',
            'store',
            'attributes',
            'categories',
            'variations',
            'review_ratings',
            'related_products',
            'cross_sell_products',
            'wholesales',
            'watermark_image',
            'preview_audio_file',
            'preview_video_file',
            'product_meta_image',
            'tags',
            'reviews'
        ],
        'withoutAppends' => [
            'user_review',
            'can_review',
            'rating_count',
            'order_amount',
            'review_ratings',
            'related_products',
            'cross_sell_products',
        ]
    ]
];
