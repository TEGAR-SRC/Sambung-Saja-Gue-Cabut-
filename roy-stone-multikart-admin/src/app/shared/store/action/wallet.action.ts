import { Params } from "../../interface/core.interface";
import { Wallet } from "../../interface/wallet.interface";

export class GetUserTransaction {
  static readonly type = "[Wallet] Transaction Get";
  constructor(public payload?: Params) {}
}

export class CreditWallet {
  static readonly type = "[Wallet] Credit";
  constructor(public payload: Wallet) {}
}

export class DebitWallet {
  static readonly type = "[Wallet] Debit";
  constructor(public payload: Wallet) {}
}