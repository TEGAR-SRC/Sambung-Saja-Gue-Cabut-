import { PaginateModel } from "./core.interface";

export interface Wallet {
    id?: number;
    consumer_id: number;
    balance: number;
    transactions: Transactions;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface Transactions extends PaginateModel {
    data: TransactionsData[];
}

export interface TransactionsData {
    id?: number;
    wallet_id: number;
    order_id: number;
    point_id: number;
    amount: number;
    type: string;
    type_status: string;
    detail: string;
    from: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}
