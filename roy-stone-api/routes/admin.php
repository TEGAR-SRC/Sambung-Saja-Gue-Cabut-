<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Countries & States
Route::apiResource('state', 'App\Http\Controllers\StateController');
Route::apiResource('country', 'App\Http\Controllers\CountryController');

// Authentication
Route::post('/login', 'App\Http\Controllers\AuthController@backendLogin');
Route::post('/register', 'App\Http\Controllers\AuthController@register');
Route::post('/forgot-password', 'App\Http\Controllers\AuthController@backendForgotPassword');
Route::post('/verify-token', 'App\Http\Controllers\AuthController@verifyToken');
Route::post('/update-password', 'App\Http\Controllers\AuthController@updatePassword');

// Settings
Route::get('settings', 'App\Http\Controllers\SettingController@index');

// Store
Route::apiResource('store', 'App\Http\Controllers\StoreController', [
  'only' => ['store'],
]);

Route::group(['middleware' => ['localization','auth:sanctum']], function () {

  // Authentication
  Route::post('logout', 'App\Http\Controllers\AuthController@logout');

  // Account
  Route::get('self', 'App\Http\Controllers\AccountController@self');
  Route::put('updateProfile', 'App\Http\Controllers\AccountController@updateProfile');
  Route::put('updatePassword', 'App\Http\Controllers\AccountController@updatePassword');
  Route::put('updateProfile', 'App\Http\Controllers\AccountController@updateProfile');
  Route::put('updatePassword', 'App\Http\Controllers\AccountController@updatePassword');
  Route::put('updateStoreProfile', 'App\Http\Controllers\AccountController@updateStoreProfile');

  // Address
  Route::apiResource('address', 'App\Http\Controllers\AddressController');

  // Payment Account
  Route::apiResource('paymentAccount', 'App\Http\Controllers\PaymentAccountController');

  // Badge
  Route::get('badge','App\Http\Controllers\BadgeController@index');

  // Notifications
  Route::get('notifications', 'App\Http\Controllers\NotificationController@index');
  Route::put('notifications/markAsRead', 'App\Http\Controllers\NotificationController@markAsRead');
  Route::delete('notifications/{id}', 'App\Http\Controllers\NotificationController@destroy');
  Route::post('notifications/test', 'App\Http\Controllers\NotificationController@test');

  // Dashboard
  Route::get('statistics/count', 'App\Http\Controllers\DashboardController@index');
  Route::get('dashboard/chart', 'App\Http\Controllers\DashboardController@chart');

  // Users
  Route::apiResource('user', 'App\Http\Controllers\UserController');
  Route::put('user/{id}/{status}', 'App\Http\Controllers\UserController@status')->middleware('can:user.edit');
  Route::post('user/csv/import', 'App\Http\Controllers\UserController@import')->middleware('can:user.create');
  Route::post('user/csv/export', 'App\Http\Controllers\UserController@export')->name('users.export')->middleware('can:user.index');
  Route::post('user/deleteAll', 'App\Http\Controllers\UserController@deleteAll')->middleware('can:user.destroy');
  Route::delete('user/address/{id}', 'App\Http\Controllers\UserController@deleteAddress')->middleware('can:user.edit');

  // Roles
  Route::apiResource('role', 'App\Http\Controllers\RoleController');
  Route::get('module', 'App\Http\Controllers\RoleController@modules');
  Route::post('role/deleteAll', 'App\Http\Controllers\RoleController@deleteAll')->middleware('can:role.destroy');

  // Products
  Route::apiResource('product', 'App\Http\Controllers\ProductController');
  Route::post('product/replicate', 'App\Http\Controllers\ProductController@replicate')->middleware('can:product.edit');
  Route::put('product/{id}/{status}', 'App\Http\Controllers\ProductController@status')->middleware('can:product.edit');
  Route::post('product/csv/export', 'App\Http\Controllers\ProductController@export')->name('products.export')->middleware('can:product.index');
  Route::post('product/csv/import', 'App\Http\Controllers\ProductController@import')->middleware('can:product.create');
  Route::put('product/approve/{id}/{status}', 'App\Http\Controllers\ProductController@approve')->middleware('can:product.edit');
  Route::post('product/deleteAll', 'App\Http\Controllers\ProductController@deleteAll')->middleware('can:product.destroy');

  // Attributes & Attribute Values
  Route::apiResource('attribute', 'App\Http\Controllers\AttributeController');
  Route::apiResource('attribute-value', 'App\Http\Controllers\AttributeValueController');
  Route::put('attribute/{id}/{status}', 'App\Http\Controllers\AttributeController@status')->middleware('can:attribute.edit');
  Route::post('attribute/csv/import', 'App\Http\Controllers\AttributeController@import')->middleware('can:attribute.create');
  Route::post('attribute/csv/export', 'App\Http\Controllers\AttributeController@export')->name('attributes.export')->middleware('can:attribute.index');
  Route::post('attribute/deleteAll', 'App\Http\Controllers\AttributeController@deleteAll')->middleware('can:attribute.destroy');

  // Categories
  Route::apiResource('category', 'App\Http\Controllers\CategoryController');
  Route::post('category/csv/import', 'App\Http\Controllers\CategoryController@import')->middleware('can:category.create');
  Route::post('category/csv/export', 'App\Http\Controllers\CategoryController@export')->name('categories.export')->middleware('can:category.index');
  Route::put('category/{id}/{status}', 'App\Http\Controllers\CategoryController@status')->middleware('can:category.edit');

  // Tags
  Route::apiResource('tag', 'App\Http\Controllers\TagController');
  Route::post('tag/csv/import', 'App\Http\Controllers\TagController@import')->middleware('can:tag.create');
  Route::post('tag/csv/export', 'App\Http\Controllers\TagController@export')->name('tags.export')->middleware('can:tag.index');
  Route::post('tag/deleteAll', 'App\Http\Controllers\TagController@deleteAll')->middleware('can:tag.destroy');
  Route::put('tag/{id}/{status}', 'App\Http\Controllers\TagController@status')->middleware('can:tag.edit');

  // Brands
  Route::apiResource('brand', 'App\Http\Controllers\BrandController');
  Route::post('brand/csv/import', 'App\Http\Controllers\BrandController@import')->middleware('can:brand.create');
  Route::post('brand/csv/export', 'App\Http\Controllers\BrandController@export')->name('brands.export')->middleware('can:brand.index');
  Route::post('brand/deleteAll', 'App\Http\Controllers\BrandController@deleteAll')->middleware('can:brand.destroy');
  Route::put('brand/{id}/{status}', 'App\Http\Controllers\BrandController@status')->middleware('can:brand.edit');

  // License Keys
  Route::apiResource('license-key', 'App\Http\Controllers\LicenseKeyController');
  Route::post('license-key/csv/import', 'App\Http\Controllers\LicenseKeyController@import')->middleware('can:license_key.create');
  Route::post('license-key/csv/export', 'App\Http\Controllers\LicenseKeyController@export')->name('license_keys.export')->middleware('can:license_key.index');
  Route::post('license-key/deleteAll', 'App\Http\Controllers\LicenseKeyController@deleteAll')->middleware('can:license_key.destroy');
  Route::put('license-key/{id}/{status}', 'App\Http\Controllers\LicenseKeyController@status')->middleware('can:license_key.edit');

  // Stores
  Route::apiResource('store', 'App\Http\Controllers\StoreController', [
    'except' => ['store'],
  ]);
  Route::post('store/deleteAll', 'App\Http\Controllers\StoreController@deleteAll')->middleware('can:store.destroy');
  Route::put('store/approve/{id}/{status}', 'App\Http\Controllers\StoreController@approve')->middleware('can:store.edit');
  Route::put('store/{id}/{status}', 'App\Http\Controllers\StoreController@status')->middleware('can:store.edit');

  // Vendor Wallets
  Route::get('wallet/vendor', 'App\Http\Controllers\VendorWalletController@index')->middleware('can:vendor_wallet.index');
  Route::post('debit/vendorWallet','App\Http\Controllers\VendorWalletController@debit')->middleware('can:vendor_wallet.debit');
  Route::post('credit/vendorWallet','App\Http\Controllers\VendorWalletController@credit')->middleware('can:vendor_wallet.credit');

  // Commission Histories
  Route::apiResource('commissionHistory', 'App\Http\Controllers\CommissionHistoryController');

  // Withdraw Request
  Route::apiResource('withdrawRequest', 'App\Http\Controllers\WithdrawRequestController');

  // Orders & Checkout
  Route::post('checkout','App\Http\Controllers\CheckoutController@verifyCheckout');
  Route::apiResource('order', 'App\Http\Controllers\OrderController');
  Route::post('cancel/order', 'App\Http\Controllers\OrderController@cancel');
  Route::post('rePayment', 'App\Http\Controllers\OrderController@rePayment');
  Route::get('verifyPayment/{order_number}', 'App\Http\Controllers\OrderController@verifyPayment');

  // Invoice
  Route::post('order/invoice', 'App\Http\Controllers\OrderController@getInvoice')->name('invoice');

  // Download File
  Route::apiResource('download', 'App\Http\Controllers\DownloadController');
  Route::post('download/zip/link', 'App\Http\Controllers\DownloadController@downloadZipLink');
  Route::post('download/key/link', 'App\Http\Controllers\DownloadController@downloadKeyLink');
  Route::post('download/admin/zip/link', 'App\Http\Controllers\DownloadController@adminDownloadZipLink');

  // Order Status
  Route::apiResource('orderStatus', 'App\Http\Controllers\OrderStatusController');
  Route::post('orderStatus/deleteAll', 'App\Http\Controllers\OrderStatusController@deleteAll')->middleware('can:order_status.destroy');
  Route::put('orderStatus/{id}/{status}', 'App\Http\Controllers\OrderStatusController@status')->middleware('can:order_status.edit');

  // Cart & Refund
  Route::apiResource('cart', 'App\Http\Controllers\CartController');
  Route::put('cart', 'App\Http\Controllers\CartController@update');
  Route::apiResource('refund', 'App\Http\Controllers\RefundController');

  // Attachments
  Route::apiResource('attachment', 'App\Http\Controllers\AttachmentController');
  Route::post('attachment/deleteAll', 'App\Http\Controllers\AttachmentController@deleteAll')->middleware('can:attachment.destroy');

  // Blogs
  Route::apiResource('blog', 'App\Http\Controllers\BlogController');
  Route::post('blog/deleteAll', 'App\Http\Controllers\BlogController@deleteAll')->middleware('can:blog.destroy');
  Route::put('blog/{id}/{status}', 'App\Http\Controllers\BlogController@status')->middleware('can:blog.edit');

  // Pages
  Route::apiResource('page', 'App\Http\Controllers\PageController');
  Route::post('page/deleteAll', 'App\Http\Controllers\PageController@deleteAll')->middleware('can:page.destroy');
  Route::put('page/{id}/{status}', 'App\Http\Controllers\PageController@status')->middleware('can:page.edit');

  // Tax
  Route::apiResource('tax', 'App\Http\Controllers\TaxController');
  Route::post('tax/deleteAll', 'App\Http\Controllers\TaxController@deleteAll')->middleware('can:tax.destroy');
  Route::put('tax/{id}/{status}', 'App\Http\Controllers\TaxController@status')->middleware('can:tax.edit');

  // Shipping
  Route::apiResource('shipping', 'App\Http\Controllers\ShippingController');
  Route::put('shipping/{id}/{status}', 'App\Http\Controllers\ShippingController@status')->middleware('can:shipping.edit');

  // Shipping Rule
  Route::apiResource('shippingRule', 'App\Http\Controllers\ShippingRuleController');
  Route::put('shippingRule/{id}/{status}', 'App\Http\Controllers\ShippingRuleController@status')->middleware('can:shipping.edit');

  // Coupon
  Route::apiResource('coupon', 'App\Http\Controllers\CouponController');
  Route::put('coupon/{id}/{status}', 'App\Http\Controllers\CouponController@status')->middleware('can:coupon.edit');
  Route::post('coupon/deleteAll', 'App\Http\Controllers\CouponController@deleteAll')->middleware('can:coupon.destroy');

  // Currencies
  Route::apiResource('currency', 'App\Http\Controllers\CurrencyController');
  Route::put('currency/{id}/{status}', 'App\Http\Controllers\CurrencyController@status')->middleware('can:currency.edit');
  Route::post('currency/deleteAll', 'App\Http\Controllers\CurrencyController@deleteAll')->middleware('can:currency.destroy');

  // Points
  Route::get('points/consumer', 'App\Http\Controllers\PointsController@index')->middleware('can:point.index');
  Route::post('credit/points','App\Http\Controllers\PointsController@credit')->middleware('can:point.credit');
  Route::post('debit/points','App\Http\Controllers\PointsController@debit')->middleware('can:point.debit');

  // Wallets
  Route::get('wallet/consumer', 'App\Http\Controllers\WalletController@index')->middleware('can:wallet.index');
  Route::post('credit/wallet','App\Http\Controllers\WalletController@credit')->middleware('can:wallet.credit');
  Route::post('debit/wallet','App\Http\Controllers\WalletController@debit')->middleware('can:wallet.debit');

  // Reviews
  Route::apiResource('review', 'App\Http\Controllers\ReviewController');
  Route::post('review/deleteAll', 'App\Http\Controllers\ReviewController@deleteAll')->middleware('can:review.destroy');

  // FAQs
  Route::apiResource('faq', 'App\Http\Controllers\FaqController');
  Route::put('faq/{id}/{status}', 'App\Http\Controllers\FaqController@status')->middleware('can:faq.edit');
  Route::post('faq/deleteAll', 'App\Http\Controllers\FaqController@deleteAll')->middleware('can:faq.destroy');

  // Question And Answer
  Route::apiResource('question-and-answer', 'App\Http\Controllers\QuestionAndAnswerController');
  Route::post('question-and-answer/feedback', 'App\Http\Controllers\QuestionAndAnswerController@feedback')->middleware('can:question_and_answer.create');

  // Subscribe
  Route::apiResource('subscribe', 'App\Http\Controllers\SubscribeController');
  Route::post('subscribe/csv/export', 'App\Http\Controllers\SubscribeController@export')->name('subscribes.export')->middleware('can:subscribe.index');

  // Notice
  Route::get('notice/recent', 'App\Http\Controllers\NoticeController@recentNotice');
  Route::put('notice/markAsRead/{id}', 'App\Http\Controllers\NoticeController@markAsRead');
  Route::post('notice/deleteAll', 'App\Http\Controllers\NoticeController@deleteAll')->middleware('can:notice.destroy');
  Route::apiResource('notice', 'App\Http\Controllers\NoticeController');

  // Themes
  Route::apiResource('theme', 'App\Http\Controllers\ThemeController');

  // Home
  Route::apiResource('home', 'App\Http\Controllers\HomePageController');

  // Theme Options
  Route::get('themeOptions', 'App\Http\Controllers\ThemeOptionController@index');
  Route::put('themeOptions', 'App\Http\Controllers\ThemeOptionController@update')->middleware('can:theme_option.edit');

  // Menus
  Route::apiResource('menu', 'App\Http\Controllers\MenuController');
  Route::post('menu/sort', 'App\Http\Controllers\MenuController@sort')->middleware('can:menu.edit');

  // App Settings
  Route::get('app/settings', 'App\Http\Controllers\AppSettingController@index');
  Route::put('app/settings', 'App\Http\Controllers\AppSettingController@update')->middleware('can:app_setting.edit');

  // Settings
  Route::put('settings', 'App\Http\Controllers\SettingController@update')->middleware('can:setting.edit');
});
