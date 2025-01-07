import { Params } from "../../interface/core.interface";

export class GetAttachments {
  static readonly type = "[Attachment] Get";
  constructor(public payload?: Params) {}
}

export class CreateAttachment {
  static readonly type = "[Attachment] Create";
  constructor(public payload: File[]) {}
}

export class DeleteAttachment {
  static readonly type = "[Attachment] Delete";
  constructor(public id: number) {}
}

export class DeleteAllAttachment {
  static readonly type = "[Attachment] Delete All";
  constructor(public ids: number[]) {}
}