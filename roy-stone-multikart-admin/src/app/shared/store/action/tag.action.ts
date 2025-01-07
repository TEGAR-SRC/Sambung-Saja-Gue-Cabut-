import { Params } from "../../interface/core.interface";
import { Tag } from "../../interface/tag.interface";

export class GetTags {
  static readonly type = "[Tag] Get";
  constructor(public payload?: Params) {}
}

export class CreateTag {
  static readonly type = "[Tag] Create";
  constructor(public payload: Tag) {}
}

export class EditTag {
  static readonly type = "[Tag] Edit";
  constructor(public id: number) {}
}

export class UpdateTag {
  static readonly type = "[Tag] Update";
  constructor(public payload: Tag, public id: number) {}
}

export class UpdateTagStatus {
  static readonly type = "[Tag] Update Status";
  constructor(public id: number, public status: boolean) {}
}

export class DeleteTag {
  static readonly type = "[Tag] Delete";
  constructor(public id: number) {}
}

export class DeleteAllTag {
  static readonly type = "[Tag] Delete All";
  constructor(public ids: number[]) {}
}

export class ImportTag {
  static readonly type = "[Tag] Import";
  constructor(public payload: File[]) {}
}

export class ExportTag {
  static readonly type = "[Tag] Export";
}