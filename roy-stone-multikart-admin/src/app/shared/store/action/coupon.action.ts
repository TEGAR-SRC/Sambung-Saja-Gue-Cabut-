import { Params } from "../../interface/core.interface";
import { Coupon } from "../../interface/coupon.interface";

export class GetCoupons {
  static readonly type = "[Coupon] Get";
  constructor(public payload?: Params) {}
}

export class CreateCoupon {
  static readonly type = "[Coupon] Create";
  constructor(public payload: Coupon) {}
}

export class EditCoupon {
  static readonly type = "[Coupon] Edit";
  constructor(public id: number) {}
}

export class UpdateCoupon {
  static readonly type = "[Coupon] Update";
  constructor(public payload: Coupon, public id: number) {}
}

export class UpdateCouponStatus {
  static readonly type = "[Coupon] Update Status";
  constructor(public id: number, public status: boolean) {}
}

export class DeleteCoupon {
  static readonly type = "[Coupon] Delete";
  constructor(public id: number) {}
}

export class DeleteAllCoupon {
  static readonly type = "[Coupon] Delete All";
  constructor(public ids: number[]) {}
}