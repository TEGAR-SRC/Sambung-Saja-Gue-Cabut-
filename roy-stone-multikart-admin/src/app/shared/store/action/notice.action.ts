import { Params } from "../../interface/core.interface";
import { Notice } from "../../interface/notice.interface";

export class GetNotice {
  static readonly type = "[Notice] Get";
  constructor(public payload?: Params) {}
}

export class CreateNotice {
  static readonly type = "[Notice] Create";
  constructor(public payload: Notice) {}
}

export class EditNotice {
  static readonly type = "[Notice] Edit";
  constructor(public id: number | string) {}
}

export class ResentNotice {
  static readonly type = "[Notice] Resent";
  constructor(public id: number | string) {}
}

export class UpdateNotice {
  static readonly type = "[Notice] Update";
  constructor(public payload: Notice, public id: number) {}
}

export class UpdateNoticeStatus {
  static readonly type = "[Notice] Update Status";
  constructor(public id: number, public status: boolean) {}
}

export class MarkAsReadNotice {
  static readonly type = "[Notice] MarkAsRead";
  constructor(public id: number) {}
}

export class DeleteNotice {
  static readonly type = "[Notice] Delete";
  constructor(public id: number) {}
}
 