import { Product, Variation } from "./product.interface";

export interface CartModel {
    is_digital_only: boolean;
    items: Cart[];
    total: number;
}

export interface Cart {
    id: number;
    product_id: number;
    variation: Variation;
    variation_id: number;
    consumer_id: number;
    quantity: number;
    sub_total: number;
    wholesale_price: number | null;
    product: Product;
    created_by_id: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface CartAddOrUpdate {
    id?: number;
    product_id: number;
    variation_id: number | null | String;
    quantity: number;
}