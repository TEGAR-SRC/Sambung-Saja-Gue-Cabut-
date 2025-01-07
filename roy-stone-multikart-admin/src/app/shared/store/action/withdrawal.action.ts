import { Params } from "../../interface/core.interface";

export class GetWithdrawRequest {
    static readonly type = "[Withdraw] Get";
    constructor(public payload?: Params) {}
}

export class UpdateWithdrawStatus {
    static readonly type = "[Withdraw] Update";
    constructor(public id: number, public status: boolean) {}
}

export class WithdrawRequest {
    static readonly type = "[Withdraw] Request";
    constructor(public payload: Params) {}
}