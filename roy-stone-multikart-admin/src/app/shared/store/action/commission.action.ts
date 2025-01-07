import { Params } from "../../interface/core.interface";

export class GetCommission {
   static readonly type = "[Commission] Get";
   constructor(public payload?: Params) {}
 }
 