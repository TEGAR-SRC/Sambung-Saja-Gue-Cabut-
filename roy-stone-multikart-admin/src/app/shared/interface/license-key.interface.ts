import { PaginateModel } from "./core.interface";
import { Product, Variation } from "./product.interface";
import { User } from "./user.interface";

export interface LicenseKeyModel extends PaginateModel {
    data: LicenseKey[];
}

export interface LicenseKey {
    id: number;
    license_key: string;
    separator: string;
    product_id: number;
    product: Product;
    variation_id: number;
    variation: Variation;
    order_id: number;
    purchased_by: User;
    purchased_by_id: number;
    product_name: string;
    status: boolean;
    created_by_id: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}