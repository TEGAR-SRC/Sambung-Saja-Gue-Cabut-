import { User } from "./user.interface";

export interface VenderWallet {
   id?: number;
   consumer_id: number;
   balance: number;
   transactions: Transactions;
   vendor: User;
   created_at?: string;
   updated_at?: string;
   deleted_at?: string;
}

export interface Transactions {
   current_page: number;
   data: TransactionsData[];
   first_page_url: string;
   from: string;
   last_page: number;
   last_page_url: string;
   links: [];
   next_page_url: string | null;
   path: string;
   per_page: number;
   prev_page_url: string | null;
   to: number;
   total: number;
}

export interface TransactionsData {
   id?: number;
   amount: number;
   detail: string;
   from: string;
   type: string;
   type_status: string;
   vendor_id: number;
   vendor_wallet_id: number;
   created_at?: string;
   updated_at?: string;
   deleted_at?: string;
}

export interface TransactionsPayload {
   vendor_id: number;
   balance: number;
}