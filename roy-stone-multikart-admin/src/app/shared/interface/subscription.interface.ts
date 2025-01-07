import { PaginateModel } from "./core.interface";

export interface SubscriptionModel extends PaginateModel {
    data: Subscription[];
}

export interface Subscription {
    id: number;
    email: string
    created_at?: string;
    updated_at?: string;
}