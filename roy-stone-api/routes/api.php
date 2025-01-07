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

// Settings & Theme Options
Route::get('settings', 'App\Http\Controllers\SettingController@index');
Route::get('app/settings', 'App\Http\Controllers\AppSettingController@index');
Route::get('themeOptions', 'App\Http\Controllers\ThemeOptionController@index');

// Webhooks
Route::post('/paypal/webhook', 'App\Http\Controllers\WebhookController@paypal')->name('paypal.webhook');
Route::post('/razorpay/webhook', 'App\Http\Controllers\WebhookController@razorpay')->name('razorpay.webhook');
Route::post('/stripe/webhook', 'App\Http\Controllers\WebhookController@stripe')->name('stripe.webhook');
Route::post('/mollie/webhook', 'App\Http\Controllers\WebhookController@mollie')->name('mollie.webhook');
Route::post('/instamojo/webhook', 'App\Http\Controllers\WebhookController@instamojo')->name('instamojo.webhook');
Route::post('/ccavenue/webhook', 'App\Http\Controllers\WebhookController@ccavenue')->name('ccavenue.webhook');
Route::get('/flutterwave/webhook', 'App\Http\Controllers\WebhookController@flutterwave')->name('flutterwave.webhook');
Route::post('/sslcommerz/webhook', 'App\Http\Controllers\WebhookController@sslcommerz')->name('sslcommerz.webhook');

// Authentication
Route::post('/login', 'App\Http\Controllers\AuthController@login');
Route::post('/backend/login', 'App\Http\Controllers\AuthController@backendLogin');
Route::post('/register', 'App\Http\Controllers\AuthController@register');
Route::post('/forgot-password', 'App\Http\Controllers\AuthController@forgotPassword');
Route::post('/verify-token', 'App\Http\Controllers\AuthController@verifyToken');
Route::post('/update-password', 'App\Http\Controllers\AuthController@updatePassword');
Route::post('/login/number', 'App\Http\Controllers\AuthController@login_with_numb');
Route::post('/verify-otp', 'App\Http\Controllers\AuthController@verify_auth_token');
Route::get('/get-sms-methods', 'App\Http\Controllers\AuthController@getAllSMSMethods');

// Menus
Route::apiResource('menu', 'App\Http\Controllers\MenuController',[
  'only' => ['index', 'show'],
]);

// Products
Route::apiResource('product', 'App\Http\Controllers\ProductController',[
  'only' => ['index', 'show'],
]);
Route::get('collection/sidebar', 'App\Http\Controllers\ProductController@collection');
Route::get('product/slug/{slug}', 'App\Http\Controllers\ProductController@getProductBySlug');
Route::get('product/minify/list', 'App\Http\Controllers\ProductController@getMinifyProduct');

// Attributes
Route::apiResource('attribute', 'App\Http\Controllers\AttributeController',[
  'only' => ['index', 'show'],
]);

// Attribute Values
Route::apiResource('attribute-value', 'App\Http\Controllers\AttributeValueController',[
  'only' => ['index', 'show'],
]);

// Categories
Route::apiResource('category', 'App\Http\Controllers\CategoryController',[
  'only' => ['index', 'show'],
]);
Route::get('category/slug/{slug}', 'App\Http\Controllers\CategoryController@getCategoryBySlug');

// Tags
Route::apiResource('tag', 'App\Http\Controllers\TagController', [
  'only' => ['index', 'show'],
]);

// Brands
Route::apiResource('brand', 'App\Http\Controllers\BrandController', [
  'only' => ['index', 'show'],
]);
Route::get('brand/slug/{slug}', 'App\Http\Controllers\BrandController@getBrandBySlug');

// Attributes
Route::apiResource('attribute', 'App\Http\Controllers\AttributeController',[
  'only' => ['index', 'show'],
]);

// Stores
Route::apiResource('store', 'App\Http\Controllers\StoreController',[
  'only' => ['index', 'show'],
]);
Route::post('store', 'App\Http\Controllers\StoreController@store');
Route::get('store/slug/{slug}', 'App\Http\Controllers\StoreController@getStoreBySlug');

// Order Status
Route::apiResource('orderStatus', 'App\Http\Controllers\OrderStatusController',[
  'only' => ['index', 'show'],
]);

// Blogs
Route::apiResource('blog', 'App\Http\Controllers\BlogController', [
  'only' => ['index', 'show'],
]);
Route::get('blog/slug/{slug}', 'App\Http\Controllers\BlogController@getBlogBySlug');

// Pages
Route::apiResource('page', 'App\Http\Controllers\PageController', [
  'only' => ['index', 'show'],
]);
Route::get('page/slug/{slug}', 'App\Http\Controllers\PageController@getPageBySlug');

// Taxes
Route::apiResource('tax', 'App\Http\Controllers\TaxController', [
  'only' => ['index', 'show'],
]);

// Coupons
Route::apiResource('coupon', 'App\Http\Controllers\CouponController', [
  'only' => ['index', 'show'],
]);

// Currencies
Route::apiResource('currency', 'App\Http\Controllers\CurrencyController', [
  'only' => ['index', 'show'],
]);

// Faqs
Route::apiResource('faq', 'App\Http\Controllers\FaqController', [
  'only' => ['index', 'show'],
]);

// Home
Route::apiResource('home', 'App\Http\Controllers\HomePageController', [
  'only' => ['index', 'show'],
]);

// Theme
Route::apiResource('theme', 'App\Http\Controllers\ThemeController',[
  'only' => ['index', 'show'],
]);

// Question & Answer
Route::apiResource('question-and-answer', 'App\Http\Controllers\QuestionAndAnswerController');
Route::post('question-and-answer/feedback', 'App\Http\Controllers\QuestionAndAnswerController@feedback');

// Subscribe
Route::apiResource('subscribe', 'App\Http\Controllers\SubscribeController',[
  'only' => ['store'],
]);

// Reviews
Route::get('front/review', 'App\Http\Controllers\ReviewController@frontIndex');

// ContactUs
Route::post('/contact-us', 'App\Http\Controllers\ContactUsController@contactUs');

// Checkout
Route::post('checkout','App\Http\Controllers\CheckoutController@verifyCheckout');

// Place Order
Route::post('order', 'App\Http\Controllers\OrderController@store');

// Track Order
Route::any('trackOrder/{uuid?}', 'App\Http\Controllers\OrderController@trackOrder');

// Download Files
Route::get('download/zip/file/{token}/{id}', 'App\Http\Controllers\DownloadController@downloadZip')->middleware('signed')->name('download.zip.link');
Route::get('download/key/file/{token}/{id}', 'App\Http\Controllers\DownloadController@downloadKey')->middleware('signed')->name('download.key.link');
Route::get('download/admin/zip/file/{product_id}/{variation_id?}', 'App\Http\Controllers\DownloadController@adminDownloadZip')->middleware('signed')->name('admin.download.zip.link');

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

  // Notifications
  Route::get('notifications', 'App\Http\Controllers\NotificationController@index');
  Route::put('notifications/markAsRead', 'App\Http\Controllers\NotificationController@markAsRead');
  Route::delete('notifications/{id}', 'App\Http\Controllers\NotificationController@destroy');
  Route::post('notifications/test', 'App\Http\Controllers\NotificationController@test');

  // Cart
  Route::apiResource('cart', 'App\Http\Controllers\CartController');
  Route::put('cart', 'App\Http\Controllers\CartController@update');
  Route::post('sync/cart', 'App\Http\Controllers\CartController@sync');
  Route::put('replace/cart', 'App\Http\Controllers\CartController@replace');
  Route::delete('clear/cart', 'App\Http\Controllers\CartController@clear');

  // Refund
  Route::apiResource('refund', 'App\Http\Controllers\RefundController');
  Route::apiResource('compare', 'App\Http\Controllers\CompareController');
  Route::apiResource('wishlist', 'App\Http\Controllers\WishlistController');

  // Payment
  Route::post('rePayment', 'App\Http\Controllers\OrderController@rePayment');
  Route::get('verifyPayment/{order_number}', 'App\Http\Controllers\OrderController@verifyPayment');

  // Orders
  Route::apiResource('order', 'App\Http\Controllers\OrderController',[
    'only' => ['index','show'],
  ]);
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

  // Attachments
  Route::apiResource('attachment', 'App\Http\Controllers\AttachmentController');
  Route::post('attachment/deleteAll', 'App\Http\Controllers\AttachmentController@deleteAll')->middleware('can:attachment.destroy');

  // Points
  Route::get('points/consumer', 'App\Http\Controllers\PointsController@index')->middleware('can:point.index');

  // Wallets
  Route::get('wallet/consumer', 'App\Http\Controllers\WalletController@index')->middleware('can:wallet.index');

  // Reviews
  Route::apiResource('review', 'App\Http\Controllers\ReviewController');
});
