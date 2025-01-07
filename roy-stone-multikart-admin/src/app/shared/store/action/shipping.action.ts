import { Shipping, ShippingRule } from "../../interface/shipping.interface";

export class GetShippings {
  static readonly type = "[Shipping] Get";
  constructor() {}
}

export class CreateShipping {
  static readonly type = "[Shipping] Create";
  constructor(public payload: Shipping) {}
}

export class EditShipping {
  static readonly type = "[Shipping] Edit";
  constructor(public id: number) {}
}

export class UpdateShipping {
  static readonly type = "[Shipping] Update";
  constructor(public payload: Shipping, public id: number) {}
}

export class DeleteShipping {
  static readonly type = "[Shipping] Delete";
  constructor(public id: number) {}
}

// For Shipping Rule
  
export class CreateShippingRule {
  static readonly type = "[Shipping] Rule Create";
  constructor(public payload: ShippingRule) {}
}
  
export class EditShippingRule {
  static readonly type = "[Shipping] Rule Edit";
  constructor(public id: number) {}
}
  
export class UpdateShippingRule {
  static readonly type = "[Shipping] Rule Update";
  constructor(public payload: ShippingRule, public id: number) {}
}
  
export class DeleteShippingRule {
  static readonly type = "[Shipping] Rule Delete";
  constructor(public id: number) {}
}