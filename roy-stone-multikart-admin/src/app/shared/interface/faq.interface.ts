import { PaginateModel } from "./core.interface";

export interface FaqModel extends PaginateModel {
    data: Faq[];
}

export interface Faq {
    id: number;
    title: string;
    description: string;
    created_by_id: boolean;
    status: boolean;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}