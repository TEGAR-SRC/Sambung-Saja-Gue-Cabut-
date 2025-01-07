import { Params } from "../../interface/core.interface";
import { Stores } from "../../interface/store.interface";

export class GetStores {
  static readonly type = "[Store] Get";
  constructor(public payload?: Params) {}
}

export class CreateStore {
  static readonly type = "[Store] Create";
  constructor(public payload: Stores) {}
}

export class EditStore {
  static readonly type = "[Store] Edit";
  constructor(public id: number) {}
}

export class UpdateStore {
  static readonly type = "[Store] Update";
  constructor(public payload: Stores, public id: number) {}
}

export class UpdateStoreStatus {
  static readonly type = "[Store] Update Status";
  constructor(public id: number, public status: boolean) {}
}

export class ApproveStoreStatus {
  static readonly type = "[Store] Approve Status";
  constructor(public id: number, public status: boolean) {}
}

export class DeleteStore {
  static readonly type = "[Store] Delete";
  constructor(public id: number) {}
}

export class DeleteAllStore {
  static readonly type = "[Store] Delete All";
  constructor(public ids: number[]) {}
}