import { Params } from "../../interface/core.interface";

export class GetStatisticsCount {
  static readonly type = "[Dashboard] Statistics Count Get";
  constructor(public payload?: Params) {}
}

export class GetRevenueChart {
    static readonly type = "[Dashboard] Revenue Get";
}