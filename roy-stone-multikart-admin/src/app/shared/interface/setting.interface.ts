import { Attachment } from "./attachment.interface";
import { Currency } from "./currency.interface";
import { CategoriesIconList, FeaturedBanners } from "./theme.interface";

export interface Setting {
   id?: number;
   values: Values;
}

export interface Values {
   general: General;
   activation: Activation;
   wallet_points: WalletPoints;
   email: Email;
   sms_methods: SMSMethods;
   media_configuration: MediaConfig;
   vendor_commissions: VendorCommissions;
   refund: Refund;
   google_reCaptcha?: GoogleReCaptcha;
   delivery: Delivery;
   payment_methods: PaymentMethods;
   analytics: Analytics;
   maintenance: Maintenance;
}

export interface MediaConfig {
   media_disk: string;
   aws_access_key_id: string;
   aws_secret_access_key: string;
   aws_bucket: string;
   aws_default_region: string;
}


export interface SMSMethods {
   default_sms_method: string;
   twilio: Twilio;
   config: Config;
}

export interface Config {
   cancel_order_sms: boolean | number,
   refund_request_sms: boolean | number,
   withdraw_request_sms: boolean | number,
   pending_order_sms: boolean | number,
   place_order_sms: boolean | number,
   signup_bonus_sms: boolean | number,
   update_order_status_sms: boolean | number,
   update_refund_request_sms: boolean | number,
   update_withdraw_request_sms: boolean | number,
   vendor_register_sms: boolean | number,
}

export interface Twilio {
   title: string;
   status: true;
   twilio_sid: string;
   twilio_auth_token: string;
   twilio_number: string;
}
 
export interface Language {
   language: string;
   code: string;
   icon: string;
 }
 
export interface DayInterval {
   title: string;
   description: string;
}

export interface General {
   light_logo_image?: Attachment;
   dark_logo_image?: Attachment;
   favicon_image?: Attachment;
   tiny_logo_image?: Attachment;
   light_logo_image_id?: number;
   dark_logo_image_id?: number;
   tiny_logo_image_id?: number;
   favicon_image_id?: number;
   site_name: string;
   site_url: string;
   site_title: string;
   site_tagline:string;
   default_timezone:string;
   default_currency_id: number;
   admin_site_language_direction: string;
   min_order_amount:number;
   min_order_free_shipping:number;
   product_sku_prefix: string;
   default_currency: Currency;
   mode: string;
   copyright: string;
}

export interface Activation {
   multivendor: number | boolean;
   point_enable: number | boolean;
   coupon_enable: number | boolean;
   wallet_enable: number | boolean;
   catalog_enable: number | boolean;
   stock_product_hide: number | boolean;
   store_auto_approve: number | boolean;
   product_auto_approve: number | boolean;
   guest_checkout: number | boolean;
   track_order: number | boolean;
   send_sms: number | boolean;
   login_number: number | boolean;
}

export interface WalletPoints {
   signup_points: number;
   min_per_order_amount: number;
   point_currency_ratio: number;
   reward_per_order_amount: number;
}

export interface Email {
   email: string;
   mail_host: string;
   mail_port: number;
   mail_mailer: string;
   mail_password: string;
   mail_username: string;
   mail_encryption: string;
   mail_from_name: string;
   mail_from_address: string;
   mailgun_domain: string;
   mailgun_secret: string;
   system_test_mail: number | boolean;
   password_reset_mail: number | boolean;
   visitor_inquiry_mail: number | boolean;
   cancel_order_mail: number | boolean;
   refund_request_mail: number | boolean;
   withdrawal_request_mail: number | boolean;
   pending_order_alert_mail: number | boolean;
   order_confirmation_mail: number | boolean;
   signup_welcome_mail: number | boolean;
   order_status_update_mail: number | boolean;
   refund_status_update_mail: number | boolean;
   withdrawal_status_update_mail: number | boolean;
   new_vendor_notification_mail: number | boolean;
}

export interface VendorCommissions {
   status: number,
   min_withdraw_amount: number,
   default_commission_rate: number,
   is_category_based_commission: number
}

export interface Refund {
   status: boolean;
   refundable_days: number;
}

export interface GoogleReCaptcha {
   secret: string
   status: number | boolean;
   site_key: string
}

export interface Delivery {
   default_delivery: number | boolean;
   default: DeliveryDay;
   same_day_delivery: boolean;
   same_day: DeliveryDay;
   same_day_intervals: DayInterval[];
}

export interface DeliveryDay {
   title: Setting;
   description: string;
}

export interface DeliveryBlock {
   delivery_description: string | null;
   delivery_interval: string | null;
}

export interface PaymentMethods {
   paypal: Paypal;
   stripe: StripeAndRazorpay;
   razorpay: StripeAndRazorpay;
   mollie: Mollie;
   cod: COD;
   phonepe: Phonepe;
   instamojo: Instamojo;
   ccavenue: Ccavenue;
   bkash: Bkash;
   flutter_wave: FlutterWave;
   paystack: Paystack;
   sslcommerz: Sslcommerz;
   bank_transfer: BankTransfer;
}

export interface Paypal {
   status: number | boolean;
   title: string;
   client_id: string;
   client_secret: string;
   sandbox_mode: string;
}

export interface StripeAndRazorpay {
   key: string;
   title: string;
   secret: string;
   status: number | boolean;
}

export interface Mollie {
   status: number | boolean;
   title: string;
   secret_key: string;
}

export interface COD {
   title: string;
   status: number | boolean;
}

export interface Phonepe {
   status: number | boolean;
   title: string;
   merchant_id: string;
   salt_Key: string;
   salt_index: string;
   sandbox_mode: string;
}

export interface Instamojo {
   status: number | boolean;
   title: string;
   client_id: string;
   client_secret: string;
   salt_key: string;
   sandbox_mode: string;
}

export interface Ccavenue {
   status: number | boolean;
   title: string;
   merchant_id: string;
   working_key: string;
   access_code: string;
   sandbox_mode: number | boolean;
}

export interface Bkash {
   status: number | boolean;
   title: string;
   app_key: string;
   app_secret: string;
   username: string;
   password: string;
   sandbox_mode: number | boolean;
}

export interface FlutterWave {
   status: number | boolean;
   title: string;
   public_key: string;
   secret_key: string;
   secret_hash: string;
   sandbox_mode: number | boolean;
}

export interface Paystack {
   status: number | boolean;
   title: string;
   public_key: string;
   secret_key: string;
   sandbox_mode: number | boolean;
}

export interface Sslcommerz {
   status: number | boolean;
   title: string;
   store_id: string;
   store_password: string;
   sandbox_mode: number | boolean;
}

export interface BankTransfer {
   status: number | boolean;
   title: string;
}

export interface Maintenance {
   title: string;
   maintenance_mode: boolean;
   maintenance_image_id: number;
   maintenance_image: Attachment;
   description: string;
   start_date: string;
   end_date: string;
}


export interface AppSetting {
   id?: number;
   values: AppValues;
}

export interface AppValues {
   home_banner: FeaturedBanners;
   categories_list: CategoriesIconList;
   offer_products: ProductSection;
   section_1_products: ProductSection;
   section_2_products: ProductSection;
   coupons: coupons;
   section_3_products: ProductSection;
   seller: Seller;
   brands: Brands;
   blogs: Blogs;
   navigate_button: NavigateButton;
   products_ids: number[]
}

export interface Seller {
   status: boolean;
   title: number[];
   sub_title: number[];
   store_ids: number[];
 }
 
 
export interface Blogs {
   title: string;
   sub_title?: string;
   status: boolean;
   blog_ids: number[];
 }

export interface Brands {
   status: boolean;
   title: string;
   brand_ids: number[]
}

export interface NavigateButton {
   status: boolean;
   title: string;
   button_text: string;
   path: string;
}

export interface coupons {
   status: boolean;
   title: string;
   sub_title: string;
   coupon_ids : number[];
}

export interface Analytics {
   facebook_pixel: {
      status : number | boolean;
      pixel_id: string;
   }
   google_analytics: {
      status: number | boolean;
      measurement_id: string;
   }
}

 
export interface ProductSection {
   title: string;
   sub_title?: string;
   product_ids: number[];
   status: boolean;
 }
  