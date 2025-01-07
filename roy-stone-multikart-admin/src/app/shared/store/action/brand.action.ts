import { Params } from "../../interface/core.interface";
import { Brand } from "../../interface/brand.interface";

export class GetBrands {
  static readonly type = "[Brand] Get";
  constructor(public payload?: Params) {}
}

export class CreateBrand {
  static readonly type = "[Brand] Create";
  constructor(public payload: Brand) {}
}

export class EditBrand {
  static readonly type = "[Brand] Edit";
  constructor(public id: number) {}
}

export class UpdateBrand {
  static readonly type = "[Brand] Update";
  constructor(public payload: Brand, public id: number) {}
}

export class UpdateBrandStatus {
  static readonly type = "[Brand] Update Status";
  constructor(public id: number, public status: boolean) {}
}

export class DeleteBrand {
  static readonly type = "[Brand] Delete";
  constructor(public id: number) {}
}

export class DeleteAllBrand {
  static readonly type = "[Brand] Delete All";
  constructor(public ids: number[]) {}
}

export class ImportBrand {
  static readonly type = "[Brand] Import";
  constructor(public payload: File[]) {}
}

export class ExportBrand {
  static readonly type = "[Brand] Export";
}