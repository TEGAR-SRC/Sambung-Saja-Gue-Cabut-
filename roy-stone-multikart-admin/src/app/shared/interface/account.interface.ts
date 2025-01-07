import { Attachment } from "./attachment.interface";
import { Role, Permission } from "./role.interface";
import { Stores } from "./store.interface";
import { Wallet } from "./wallet.interface";

export interface AccountUser {
    id: number;
    name: string;
    email: string;
    status: boolean;
    country_code: number;
    phone: string;
    profile: string;
    profile_image?: Attachment;
    profile_image_id?: number;
    email_verified_at?: string;
    store?: Stores;
    vendor_wallet: Wallet;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    role: Role;
    permission: Permission[];
}

export interface AccountUserUpdatePassword {
    current_password: string;
    new_password: string;
    confirm_password: string;
}