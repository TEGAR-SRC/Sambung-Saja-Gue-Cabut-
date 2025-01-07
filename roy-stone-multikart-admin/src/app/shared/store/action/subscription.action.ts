import { Params } from "../../interface/core.interface";

export class GetSubscriptionList {
  static readonly type = "[Subscription] Get";
  constructor(public payload?: Params) {}
}