import { Params } from "../../interface/core.interface";
import { Tax } from "../../interface/tax.interface";

export class GetTaxes {
  static readonly type = "[Tax] Get";
  constructor(public payload?: Params) {}
}

export class CreateTax {
  static readonly type = "[Tax] Create";
  constructor(public payload: Tax) {}
}

export class EditTax {
  static readonly type = "[Tax] Edit";
  constructor(public id: number) {}
}

export class UpdateTax {
  static readonly type = "[Tax] Update";
  constructor(public payload: Tax, public id: number) {}
}

export class UpdateTaxStatus {
  static readonly type = "[Tax] Update Status";
  constructor(public id: number, public status: boolean) {}
}

export class DeleteTax {
  static readonly type = "[Tax] Delete";
  constructor(public id: number) {}
}

export class DeleteAllTax {
  static readonly type = "[Tax] Delete All";
  constructor(public ids: number[]) {}
}