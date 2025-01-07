import { Params } from "../../interface/core.interface";
import { Faq } from "../../interface/faq.interface";

export class GetFaqs {
  static readonly type = "[Faq] Get";
  constructor(public payload?: Params) {}
}

export class CreateFaq {
  static readonly type = "[Faq] Create";
  constructor(public payload: Faq) {}
}

export class EditFaq {
  static readonly type = "[Faq] Edit";
  constructor(public id: number) {}
}

export class UpdateFaq {
  static readonly type = "[Faq] Update";
  constructor(public payload: Faq, public id: number) {}
}

export class UpdateFaqStatus {
  static readonly type = "[Faq] Update Status";
  constructor(public id: number, public status: boolean) {}
}

export class ApproveFaqStatus {
  static readonly type = "[Faq] Approve Status";
  constructor(public id: number, public status: boolean) {}
}

export class DeleteFaq {
  static readonly type = "[Faq] Delete";
  constructor(public id: number) {}
}

export class DeleteAllFaq {
  static readonly type = "[Faq] Delete All";
  constructor(public ids: number[]) {}
}