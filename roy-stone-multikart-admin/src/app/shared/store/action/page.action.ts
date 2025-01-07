import { Params } from "../../interface/core.interface";
import { Page } from "../../interface/page.interface";

export class GetPages {
  static readonly type = "[Page] Get";
  constructor(public payload?: Params) {}
}

export class CreatePage {
  static readonly type = "[Page] Create";
  constructor(public payload: Page) {}
}

export class EditPage {
  static readonly type = "[Page] Edit";
  constructor(public id: number) {}
}

export class UpdatePage {
  static readonly type = "[Page] Update";
  constructor(public payload: Page, public id: number) {}
}

export class UpdatePageStatus {
  static readonly type = "[Page] Update Status";
  constructor(public id: number, public status: boolean) {}
}

export class DeletePage {
  static readonly type = "[Page] Delete";
  constructor(public id: number) {}
}

export class DeleteAllPage {
  static readonly type = "[Page] Delete All";
  constructor(public ids: number[]) {}
}