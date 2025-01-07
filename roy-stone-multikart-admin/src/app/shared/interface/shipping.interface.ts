import { PaginateModel } from "./core.interface";
import { Country } from "./country.interface";

export interface ShippingModel extends PaginateModel {
    data: Shipping[];
}

export interface Shipping {
    id: number;
    country_id: number;
    country: Country;
    status: boolean;
    created_by_id: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    shipping_rules: ShippingRule[]; 
}

export interface ShippingRule {
    id: number;
    name: string;
    shipping_id: number;
    rule_type: string;
    min: number;
    max: number;
    shipping_type: string;
    amount: number;
    status: boolean;
    created_by_id: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}