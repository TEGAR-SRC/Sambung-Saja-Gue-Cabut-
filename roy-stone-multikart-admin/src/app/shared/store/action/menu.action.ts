import { Params } from "../../interface/core.interface";
import { Menu } from "../../interface/menu.interface";

export class GetMenu {
  static readonly type = '[Menu] Get';
  constructor(public payload?: Params) {}
}

export class CreateMenu {
    static readonly type = "[Menu] Create";
    constructor(public payload: Menu) {}
}

export class EditMenu {
  static readonly type = "[Menu] Edit";
  constructor(public id: number) {}
}

export class UpdateMenu {
  static readonly type = "[Menu] Update";
  constructor(public payload: Menu, public id: number) {}
}

export class UpdateSortMenu {
  static readonly type = "[Menu] Update Sort";
  constructor(public payload: Params) {}
}

export class DeleteMenu {
  static readonly type = "[Menu] Delete";
  constructor(public id: number) {}
}
