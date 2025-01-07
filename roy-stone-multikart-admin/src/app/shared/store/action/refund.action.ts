import { Params } from "../../interface/core.interface";

export class GetRefund {
    static readonly type = "[Refund] Get";
    constructor(public payload?: Params) {}
}

export class UpdateRefundStatus {
    static readonly type = "[Refund] Put";
    constructor(public id: number, public status: string) {}
}