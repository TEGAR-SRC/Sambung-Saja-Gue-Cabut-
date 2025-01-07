import { Currency } from "../../interface/currency.interface";
import { Params } from "../../interface/core.interface";

export class GetCurrencies {
  static readonly type = "[Currency] Get";
  constructor(public payload?: Params) {}
}

export class CreateCurrency {
  static readonly type = "[Currency] Create";
  constructor(public payload: Currency) {}
}

export class EditCurrency {
  static readonly type = "[Currency] Edit";
  constructor(public id: number) {}
}

export class UpdateCurrency {
  static readonly type = "[Currency] Update";
  constructor(public payload: Currency, public id: number) {}
}

export class UpdateCurrencyStatus {
  static readonly type = "[Currency] Update Status";
  constructor(public id: number, public status: boolean) {}
}

export class DeleteCurrency {
  static readonly type = "[Currency] Delete";
  constructor(public id: number) {}
}

export class DeleteAllCurrency {
  static readonly type = "[Currency] Delete All";
  constructor(public ids: number[]) {}
}