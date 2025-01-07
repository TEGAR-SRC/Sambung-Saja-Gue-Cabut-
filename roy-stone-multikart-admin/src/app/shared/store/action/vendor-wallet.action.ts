import { Params } from "../../interface/core.interface";
import { TransactionsPayload } from "../../interface/vendor-wallet.interface";

export class GetVendorTransaction {
  static readonly type = "[Vendor Wallet] Transaction Get";
  constructor(public payload?: Params) {}
}
 
export class CreditVendorWallet {
  static readonly type = "[Vendor Wallet] Credit";
  constructor(public payload: TransactionsPayload) {}
}
 
export class DebitVendorWallet {
  static readonly type = "[Vendor Wallet] Debit";
  constructor(public payload: TransactionsPayload) {}
}