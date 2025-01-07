import { Sidebar } from "../interface/sidebar.interface";

export const menu: Sidebar[] = [
    {
      id: 1,
      title: "dashboard",
      path: "/dashboard",
      active: false,
      icon: "ri-home-line",
      type: "sub",
      level: 1
    },
    {
      id: 2,
      title: "users",
      active: false,
      icon: "ri-contacts-line",
      type: "sub",
      level: 1,
      acl_permission: ["user.index", "user.create", "role.index"],
      children: [
        {
          parent_id: 2,
          title: "add user",
          path: "/user/create",
          type: "link",
          level: 2,
          permission: ["user.index", "user.create"],
        },
        {
          parent_id: 2,
          title: "all users",
          path: "/user",
          type: "link",
          level: 2,
          permission: ["user.index"],
        },
        {
          parent_id: 2,
          title: "role",
          path: "/role",
          type: "link",
          level: 2,
          permission: ["role.index"],
        }
      ],
    },
    {
      id: 3,
      title: "products",
      active: false,
      icon: "ri-store-3-line",
      type: "sub",
      level: 1,
      acl_permission: ["product.index", "product.create", "attribute.index"],
      children: [
        {
          parent_id: 3,
          title: "add product",
          path: "/product/create",
          type: "link",
          level: 2,
          permission: ["product.index", "product.create"]
        },
        {
          parent_id: 3,
          title: "all products",
          path: "/product",
          type: "link",
          badgeType: 'badge bg-theme text-dark ml-3', 
          badgeValue: 0,
          level: 2,
          permission: ["product.index"]
        },
        {
          parent_id: 3,
          title: "attributes",
          path: "/attribute",
          type: "link",
          level: 2,
          permission: ["attribute.index"]
        },
        {
          parent_id: 3,
          title: "categories",
          path: "/category",
          type: "link",
          level: 2,
          permission: ["category.index"]
        },
        {
          parent_id: 3,
          title: "tags",
          path: "/tag",
          type: "link",
          level: 2,
          permission: ["tag.index"]
        },
        {
          parent_id: 3,
          title: "brands",
          path: "/brand",
          type: "link",
          level: 2,
          permission: ["brand.index"]
        },
        {
          parent_id: 3,
          title: "Q&A",
          path: "/qna",
          type: "link",
          level: 2,
        },
        {
          parent_id: 3,
          title: "license_key",
          path: "/license-key",
          type: "link",
          level: 2,
        }
      ],
    },
    {
      id: 4,
      title: "stores",
      active: false,
      icon: "ri-store-2-line",
      type: "sub",
      level: 1,
      acl_permission: ["store.index", "store.create", "vendor_wallet.index", "commission_history.index", "withdraw_request.index"],
      children: [
        {
          parent_id: 4,
          title: "add store",
          path: "/store/create",
          type: "link",
          level: 2,
          permission: ["store.index", "store.create"]
        },
        {
          parent_id: 4,
          title: "all stores",
          path: "/store",
          type: "link",
          badgeType: 'badge bg-theme text-dark ml-3', 
          badgeValue: 0,
          level: 2,
          permission: ["store.index"]
        },
        {
          parent_id: 4,
          title: "wallet",
          path: "/vendor-wallet",
          type: "link",
          level: 2,
          permission: ["vendor_wallet.index"]
        },
        {
          parent_id: 4,
          title: "commission history",
          path: "/commission",
          type: "link",
          level: 2,
          permission: ["commission_history.index"]
        },
        {
          parent_id: 4,
          title: "payout details",
          path: "/payment-details",
          type: "link",
          level: 2,
          canAllow: ['vendor'],
          permission: ["withdraw_request.index"]
        },
        {
          parent_id: 4,
          title: "withdrawal",
          path: "/withdrawal",
          type: "link",
          badgeType: 'badge bg-danger ml-3', 
          badgeValue: 0,
          level: 2,
          permission: ["withdraw_request.index"]
        },
      ],
    },
    {
      id: 5,
      title: "orders",
      active: false,
      icon: "ri-list-unordered",
      type: "sub",
      level: 1,
      acl_permission: ["order.index", "order.create"],
      children: [
        {
          parent_id: 5,
          title: "all orders",
          path: "/order",
          type: "link",
          level: 2,
          permission: ["order.index"]
        },
        {
          parent_id: 5,
          title: "create order",
          path: "/order/create",
          type: "link",
          level: 2,
          permission: ["order.index", "order.create"]
        }
      ],
    },
    {
      id: 6,
      title: "media",
      path: "/media",
      active: false,
      icon: "ri-image-line",
      type: "sub",
      level: 1,
      permission: ["attachment.index"]
    },
    {
      id: 7,
      title: "blog",
      active: false,
      icon: "ri-article-line",
      type: "sub",
      level: 1,
      acl_permission: ["blog.index"],
      children: [
        {
          parent_id: 7,
          title: "all blogs",
          path: "/blog",
          type: "link",
          level: 2,
          permission: ["blog.index"]
        },
        {
          parent_id: 7,
          title: "categories",
          path: "/blog/category",
          type: "link",
          level: 2,
          permission: ["category.index"]
        },
        {
          parent_id: 7,
          title: "tags",
          path: "/blog/tag",
          type: "link",
          level: 2,
          permission: ["tag.index"]
        }
      ],
    },
    {
      id: 8,
      title: "pages",
      path: "/page",
      active: false,
      icon: "ri-pages-line",
      type: "sub",
      level: 1,
      permission: ["page.index"]
    },
    {
      id: 9,
      title: "taxes",
      path: "/tax",
      active: false,
      icon: "ri-percent-line",
      type: "sub",
      level: 1,
      permission: ["tax.index"]
    },
    {
      id: 10,
      title: "shipping",
      path: "/shipping",
      active: false,
      icon: "ri-truck-line",
      type: "sub",
      level: 1,
      permission: ["shipping.index"]
    },
    {
      id: 11,
      title: "coupons",
      path: "/coupon",
      active: false,
      icon: "ri-coupon-2-line",
      type: "sub",
      level: 1,
      permission: ["coupon.index"]
    },
    {
      id: 12,
      title: "currencies",
      path: "/currency",
      active: false,
      icon: "ri-currency-fill",
      type: "sub",
      level: 1,
      permission: ["currency.index"]
    },
    {
      id: 13,
      title: "points",
      path: "/point",
      active: false,
      icon: "ri-coins-line",
      type: "sub",
      level: 1,
      permission: ["point.index"]
    },
    {
      id: 14,
      title: "wallet",
      path: "/wallet",
      active: false,
      icon: "ri-wallet-line",
      type: "sub",
      level: 1,
      permission: ["wallet.index"]
    },
    {
      id: 15,
      title: "refund",
      path: "/refund",
      active: false,
      icon: "ri-exchange-dollar-line",
      type: "sub",
      badgeType: 'badge bg-danger ml-3', 
      badgeValue: 0,
      level: 1,
      permission: ["refund.index"]
    },
    {
      id: 16,
      title: "reviews",
      path: "/review",
      active: false,
      icon: "ri-star-line",
      type: "sub",
      level: 1,
      permission: ["review.index"]
    },
    {
      id: 17,
      title: "faqs",
      path: "/faq",
      active: false,
      icon: "ri-questionnaire-line",
      type: "sub",
      level: 1,
      permission: ["faq.index"]
    },
    {
      id: 18,
      title: "notice",
      path: "/notice",
      active: false,
      icon: "ri-article-line",
      type: "sub",
      level: 1,
      permission: ["notice.index"]
    },
    {
      id: 19,
      title: "Subscription",
      path: "/subscription",
      active: false,
      icon: "ri-settings-3-line",
      type: "sub",
      level: 1,
      permission: ["subscribe.index"]
    },
    {
      id: 20,
      title: "store front",
      active: false,
      icon: "ri-window-line",
      type: "sub",
      level: 1,
      acl_permission: ["theme.index", "theme_option.index"],
      children: [
        {
          parent_id: 20,
          title: "themes",
          path: "/theme",
          type: "link",
          level: 2,
          permission: ["theme.index"]
        },
        {
          parent_id: 20,
          title: "theme options",
          path: "/theme-option",
          type: "link",
          level: 2,
          permission: ["theme_option.index"]
        },
        {
          parent_id: 20,
          title: "Menu",
          path: "/menu",
          type: "link",
          level: 2,
          permission: ["theme_option.index"]
        }
      ]
    },
    {
      id: 21,
      title: "settings",
      path: "/setting",
      active: false,
      icon: "ri-settings-3-line",
      type: "sub",
      level: 1,
      permission: ["setting.index"]
    },
    // {
    //   id: 22,
    //   title: "app settings",
    //   path: "/app-setting",
    //   active: false,
    //   icon: "ri-settings-3-line",
    //   type: "sub",
    //   level: 1,
    //   permission: ["setting.index"]
    // }
];
