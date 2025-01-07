import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetUserTransaction, CreditWallet, DebitWallet } from "../action/wallet.action";
import { TransactionsData } from "../../interface/wallet.interface";
import { WalletService } from "../../services/wallet.service";
import { NotificationService } from "../../services/notification.service";

export class WalletStateModel {
  wallet = {
    consumer_id: null as number | null,
    balance: 0 as number,
    transactions: {
      data: [] as TransactionsData[],
      total: 0
    }
  }
}

@State<WalletStateModel>({
  name: "wallet",
  defaults: {
    wallet: {
      consumer_id: null,
      balance: 0 as number,
      transactions: {
        data: [],
        total: 0
      }
    }
  },
})
@Injectable()
export class WalletState {
  
  constructor(private notificationService: NotificationService,
    private walletService: WalletService) {}

  @Selector()
  static wallet(state: WalletStateModel) {
    return state.wallet;
  }

  @Action(GetUserTransaction)
  getUserTransations(ctx: StateContext<WalletStateModel>, { payload }: GetUserTransaction) {
    return this.walletService.getUserTransaction(payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            wallet: {
              consumer_id: result?.consumer_id,
              balance: result?.balance,
              transactions: {
                data: result?.transactions?.data,
                total: result?.transactions?.total ? result?.transactions?.total : result?.transactions?.data?.length
              }
            }
          });
        },
        error: err => { 
          ctx.patchState({
            wallet: {
              consumer_id: null,
              balance: 0,
              transactions: {
                data: [],
                total: 0
              }
            }
          });
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(CreditWallet)
  credit(ctx: StateContext<WalletStateModel>, action: CreditWallet) {
    return this.walletService.credit(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            wallet: {
              consumer_id: result?.consumer_id,
              balance: result?.balance,
              transactions: {
                data: result?.transactions?.data,
                total: result?.transactions?.total ? result?.transactions?.total : result?.transactions?.data?.length
              }
            }
          });
        },
        complete:() => {
          this.notificationService.showSuccess('Balance Credited Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DebitWallet)
  debit(ctx: StateContext<WalletStateModel>, action: DebitWallet) {
    return this.walletService.debit(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            wallet: {
              consumer_id: result?.consumer_id,
              balance: result?.balance,
              transactions: {
                data: result?.transactions?.data,
                total: result?.transactions?.total ? result?.transactions?.total : result?.transactions?.data?.length
              }
            }
          });
        },
        complete:() => {
          this.notificationService.showSuccess('Balance Debited Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

}
