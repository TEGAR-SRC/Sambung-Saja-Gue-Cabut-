import { Params } from "../../interface/core.interface";
import { Category } from "../../interface/category.interface";

export class GetCategories {
  static readonly type = "[Category] Get";
  constructor(public payload?: Params) {}
}

export class CreateCategory {
  static readonly type = "[Category] Create";
  constructor(public payload: Category) {}
}

export class EditCategory {
  static readonly type = "[Category] Edit";
  constructor(public id: number) {}
}

export class UpdateCategory {
  static readonly type = "[Category] Update";
  constructor(public payload: Category, public id: number) {}
}

export class DeleteCategory {
  static readonly type = "[Category] Delete";
  constructor(public id: number, public type: string | null) {}
}

export class ImportCategory {
  static readonly type = "[Category] Import";
  constructor(public payload: File[]) {}
}

export class ExportCategory {
  static readonly type = "[Category] Export";
}