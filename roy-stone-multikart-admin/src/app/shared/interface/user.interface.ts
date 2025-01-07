import { PaginateModel } from "./core.interface";
import { Role } from "./role.interface";
import { Country } from "./country.interface";
import { States } from "./state.interface";
import { Attachment } from "./attachment.interface";
import { Wallet } from "./wallet.interface";
import { Point } from "./point.interface";
import { PaymentDetails } from "./payment-details.interface";

export interface UserModel extends PaginateModel {
    data: User[];
}

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    country_code: number;
    profile_image?: Attachment;
    profile_image_id?: number;
    status: boolean;
    email_verified_at: string;
    payment_account: PaymentDetails;
    role_id: number;
    role_name?: string;
    role?: Role;
    address?: UserAddress[];
    point?: Point;
    wallet?: Wallet;
    is_approved: boolean;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface UserAddress {
    id: number;
    user_id: number;
    title: string;
    street: string;
    type: string;
    city: string;
    pincode: string | number;
    state_id: number;
    state: States;
    country_code: number;
    country: Country;
    phone: number;
    country_id: number;
    is_default: boolean;
}