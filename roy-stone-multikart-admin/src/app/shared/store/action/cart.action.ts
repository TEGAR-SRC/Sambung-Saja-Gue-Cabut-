import { CartAddOrUpdate } from "../../interface/cart.interface";

export class GetCartItems {
  static readonly type = "[Cart] Get";
}

export class AddToCart {
  static readonly type = "[Cart] Add";
  constructor(public payload: CartAddOrUpdate) {}
}

export class UpdateCart {
  static readonly type = "[Cart] Update";
  constructor(public payload: CartAddOrUpdate) {}
}

export class DeleteCart {
  static readonly type = "[Cart] Delete";
  constructor(public id: number) {}
}

export class ClearCart {
  static readonly type = "[Cart] Clear";
  constructor() {}
}