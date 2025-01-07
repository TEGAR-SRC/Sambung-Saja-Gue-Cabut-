import { Params } from "../../interface/core.interface";
import { Point } from "../../interface/point.interface";

export class GetUserTransaction {
  static readonly type = "[Point] Transaction Get";
  constructor(public payload?: Params) {}
}

export class CreditPoint {
  static readonly type = "[Point] Credit";
  constructor(public payload: Point) {}
}

export class DebitPoint {
  static readonly type = "[Point] Debit";
  constructor(public payload: Point) {}
}