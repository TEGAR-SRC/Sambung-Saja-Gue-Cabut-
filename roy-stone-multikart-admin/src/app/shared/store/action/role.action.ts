import { Params } from "../../interface/core.interface";
import { Role } from "../../interface/role.interface";

export class GetRoles {
  static readonly type = "[Role] Get";
  constructor(public payload?: Params) {}
}

export class GetRoleModules {
  static readonly type = "[Role] Module Get";
  constructor() {}
}

export class CreateRole {
  static readonly type = "[Role] Create";
  constructor(public payload: Role) {}
}

export class EditRole {
  static readonly type = "[Role] Edit";
  constructor(public id: number) {}
}

export class UpdateRole {
  static readonly type = "[Role] Update";
  constructor(public payload: Role, public id: number) {}
}

export class DeleteRole {
  static readonly type = "[Role] Delete";
  constructor(public id: number) {}
}

export class DeleteAllRole {
  static readonly type = "[Role] Delete All";
  constructor(public ids: number[]) {}
}
