import { PaginateModel } from "./core.interface";
import { Order } from "./order.interface";
import { Stores } from "./store.interface"

export interface CommissionModel extends PaginateModel {
   data: Commission[];
}

export interface Commission {
   id: number;
   order: Order;
   order_id: string;
   store: Stores;
   store_id: number;
   store_name: string;
   admin_commission: number;
   vendor_commission: number;
   created_at?: string;
   updated_at?: string;
   deleted_at?: string;
}