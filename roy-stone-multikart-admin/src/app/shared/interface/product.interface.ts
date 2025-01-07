import { PaginateModel } from "./core.interface";
import { Attachment } from "./attachment.interface";
import { Attribute, AttributeValue } from "./attribute.interface";
import { Category } from "./category.interface";
import { Stores } from "./store.interface";
import { Tag } from "./tag.interface";
import { Tax } from "./tax.interface";
import { Brand } from "./brand.interface";
import { LicenseKey } from "./license-key.interface";

export interface ProductModel extends PaginateModel {
    data: Product[];
}

export interface Product {
    id: number;
    product_type: string;
    name: string;
    slug: string;
    short_description: string;
    description: string;
    type: string;
    product_thumbnail_id: number;
    product_thumbnail: Attachment;
    watermark: boolean;
    watermark_position: string;
    watermark_image_id: number;
    watermark_image: Attachment;
    product_galleries_id: [];
    product_galleries: Attachment[];
    unit: string;
    weight: number;
    price: number;
    sale_price: number;
    discount: number;
    wholesale_price_type: string;
    wholesales: WholesalePrice[];
    is_sale_enable: boolean,
    sale_starts_at: string,
    sale_expired_at: string,
    sku: string;
    stock_status: string;
    stock: string;
    visible_time: string;
    quantity: number;
    store_id: number;
    size_chart_image_id: number;
    size_chart_image: Attachment;
    estimated_delivery_text: string;
    return_policy_text: string;
    safe_checkout: boolean;
    secure_checkout: boolean;
    social_share: boolean;
    encourage_order: boolean;
    encourage_view: boolean;
    is_free_shipping: boolean;
    is_featured: boolean;
    is_trending: boolean;
    is_return: boolean;
    shipping_days: number;
    tax_id: number;
    tax: Tax;
    status: boolean;
    meta_title: string;
    meta_description: string;
    product_meta_image: Attachment;
    product_meta_image_id: number;
    tags: Tag[];
    tag: Tag;
    categories: Category[];
    category: Category;
    brand_id: number;
    brand: Brand;
    store: Stores;
    store_name: string;
    orders_count: string | number;
    order_amount: string | number;
    attribute_values: [];
    variations: Variation[];
    variants: Variant[];
    attributes: Attribute[];
    attributes_ids: number[];
    is_random_related_products: boolean;
    digital_files: Attachment[];
    digital_file_ids: number[];
    is_licensable: boolean;
    is_licensekey_auto: string;
    license_key: string;
    license_keys: LicenseKey[];
    separator: string;
    preview_type: string;
    preview_audio_file: Attachment;
    preview_audio_file_id: number;
    preview_video_file: Attachment;
    preview_video_file_id: number;
    preview_url: string;
    is_external: boolean;
    external_url: string;
    external_button_text: string;
    related_products: number[];
    cross_sell_products: number[];
    pivot?: PivotProduct;
    created_by_id: number;
    is_approved: boolean;
    total_in_approved_products: number;
    published_at: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface WholesalePrice {
    id?: number | null;
    min_qty: number;
    max_qty: number;
    value: number;
}

export interface PivotProduct {
    order_id: number;
    product_id: number;
    quantity: number;
    shipping_cost: number;
    single_price: number;
    subtotal: number;
    variation_id?: number;
    variation: Variation;
    wholesale_price: number;
}

export interface Variation {
    id?: number;
    name: string;
    price: number;
    sale_price: number;
    stock_status: string;
    sku: string;
    discount: number;
    quantity: number;
    digital_files: Attachment[];
    digital_file_ids: number[];
    variation_galleries_id: number[];
    variation_galleries: Attachment[];
    is_licensable: boolean;
    is_licensekey_auto: string;
    license_key: string;
    license_keys: LicenseKey[];
    separator: string;
    variation_image: Attachment;
    variation_image_id: number;
    variation_options: VariationOption[];
    attribute_values: AttributeValue[];
    status: boolean;
}

export interface VariationOption {
    name: string;
    value: string;
}

export interface Variant {
    id: number | null;
    attribute_values: number[] | null;
    options: any;
    variant_option: any;
}

export interface VariationCombination {
    name: string;
    attribute_values: number[];
}

export interface SelectedVariant {
    id: number;
    attribute_id: number;
}

export interface CustomSelect2Product {
    label :string;
    value: string | number;
    data :  ProductData; 
}
  
export interface ProductData {
    image: string;
    name: string;
    slug: string;
    stock_status: string;
    type: string;
}
  