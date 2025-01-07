import { PaginateModel } from "./core.interface";
import { User } from "./user.interface";

export interface WithdrawalModel extends PaginateModel {
    data: Withdrawal[];
}

export interface Withdrawal {
    id: number;
    amount: number;
    message: string;
    status: string;
    withdrawal_status: string;
    vendor_wallet_id: number;
    vendor_id: number;
    user: User;
    vendor_name: string;
    payment_type: string;
    is_used: string;
    total_pending_withdraw_requests: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}
