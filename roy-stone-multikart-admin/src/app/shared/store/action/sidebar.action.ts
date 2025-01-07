import { Params } from "../../interface/core.interface";

export class GetSidebar {
  static readonly type = '[Sidebar] Get';
}

export class GetBadges {
  static readonly type = "[Sidebar] Badges Get";
  constructor(public payload?: Params) {}
}

export class UpdateBadgeValue {
  static readonly type = '[Sidebar] Update Badge';
  constructor(public path: string, public badgeValue: number) {}
}