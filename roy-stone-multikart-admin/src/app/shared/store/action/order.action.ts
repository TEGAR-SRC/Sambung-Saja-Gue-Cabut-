import { Params } from "../../interface/core.interface";
import { CheckoutPayload } from "../../interface/order.interface";

export class GetOrders {
  static readonly type = "[Order] Get";
  constructor(public payload?: Params) {}
}

export class SelectUser {
  static readonly type = "[Order] User";
  constructor(public id: number) {}
}

export class ViewOrder {
  static readonly type = "[Order] View";
  constructor(public id: number) {}
}

export class Checkout {
  static readonly type = "[Order] Checkout";
  constructor(public payload: CheckoutPayload) {}
}

export class PlaceOrder {
  static readonly type = "[Order] Place";
  constructor(public payload: CheckoutPayload) {}
}

export class UpdateOrderStatus {
  static readonly type = "[Order] Update Status";
  constructor(public id: number, public payload: { order_status_id: number, note: string, changed_at: string }) {}
}

export class DownloadInvoice {
  static readonly type = "[Order] Invoice";
  constructor(public payload: Params) {}
}

export class Clear {
  static readonly type = "[Order] Clear";
  constructor() {}
}