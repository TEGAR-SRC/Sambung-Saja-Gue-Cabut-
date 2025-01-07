import { Stores } from "../../interface/store.interface";
import { AccountUser, AccountUserUpdatePassword } from "./../../interface/account.interface";

export class GetUserDetails {
  static readonly type = "[Account] User Get";
}

export class UpdateUserProfile {
  static readonly type = "[Account] User Update";
  constructor(public payload: AccountUser) {}
}

export class UpdateUserPassword {
  static readonly type = "[Account] User Update Password";
  constructor(public payload: AccountUserUpdatePassword) {}
}

export class updateStoreDetails {
  static readonly type = "[Account] Update Store Profile";
  constructor(public payload: Stores) {}
}

export class AccountClear {
  static readonly type = "[Account] Clear";
  constructor() {}
}