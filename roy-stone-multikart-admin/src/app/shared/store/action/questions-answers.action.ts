import { Params } from "../../interface/core.interface";

export class GetQuestionAnswers {
  static readonly type = "[Question] Get";
  constructor(public payload?: Params) {}
}

export class EditQuestionAnswers {
  static readonly type = "[Question] Edit";
  constructor(public id: number) {}
}

export class UpdateQuestionAnswers {
  static readonly type = "[Question] put";
  constructor(public payload: Params, public id: number) {}
}

export class DeleteQuestionAnswers {
  static readonly type = "[Question] Delete";
  constructor(public id: number) {}
}

export class DeleteAllQuestionAnswers {
  static readonly type = "[Question] Delete All";
  constructor(public ids: number[]) {}
}