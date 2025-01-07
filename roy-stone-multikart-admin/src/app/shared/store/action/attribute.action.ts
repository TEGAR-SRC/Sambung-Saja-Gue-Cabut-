import { Params } from "../../interface/core.interface";
import { Attribute } from "../../interface/attribute.interface";

export class GetAttributes {
  static readonly type = "[Attribute] Get";
  constructor(public payload?: Params) {}
}

export class GetAttributeValues {
  static readonly type = "[Attribute] Value Get";
  constructor(public payload?: Params) {}
}

export class CreateAttribute {
  static readonly type = "[Attribute] Create";
  constructor(public payload: Attribute) {}
}

export class EditAttribute {
  static readonly type = "[Attribute] Edit";
  constructor(public id: number) {}
}

export class UpdateAttribute {
  static readonly type = "[Attribute] Update";
  constructor(public payload: Attribute, public id: number) {}
}

export class UpdateAttributeStatus {
  static readonly type = "[Attribute] Update Status";
  constructor(public id: number, public status: boolean) {}
}

export class DeleteAttribute {
  static readonly type = "[Attribute] Delete";
  constructor(public id: number) {}
}

export class DeleteAllAttribute {
  static readonly type = "[Attribute] Delete All";
  constructor(public ids: number[]) {}
}

export class ImportAtribute {
  static readonly type = "[Attribute] Import";
  constructor(public payload: File[]) {}
}

export class ExportAttribute {
  static readonly type = "[Attribute] Export";
}
