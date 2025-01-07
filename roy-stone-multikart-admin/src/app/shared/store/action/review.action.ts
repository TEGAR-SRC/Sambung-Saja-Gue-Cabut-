import { Params } from "../../interface/core.interface";

export class GetReviews {
    static readonly type = "[Review] Get";
    constructor(public payload?: Params) {}
}

export class DeleteReview {
    static readonly type = "[Review] Delete";
    constructor(public id: number) {}
}
  
export class DeleteAllReview {
    static readonly type = "[Review] Delete All";
    constructor(public ids: number[]) {}
}
