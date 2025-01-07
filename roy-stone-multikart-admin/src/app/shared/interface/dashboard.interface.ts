export interface StatisticsCount {
    total_revenue: number;
    total_orders: number;
    total_users: number;
    total_products: number;
    total_stores: number;
    total_refunds: number;
    total_withdraw_requests: number;
    total_out_of_delivery_orders: number;
    total_shipped_orders: number;
    total_cancelled_orders: number;
    total_processing_orders: number;
    total_pending_orders: number;
    total_delivered_orders: number;
}

export interface RevenueChart {
    revenues: number[];
    commissions: number[];
    months: string[];
}