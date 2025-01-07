import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { NotificationService } from "../../services/notification.service";
import { GetVendorTransaction, CreditVendorWallet, DebitVendorWallet  } from "../action/vendor-wallet.action";
import { VendorWalletService } from "../../services/vendor-wallet.service";
import { TransactionsData } from "../../interface/vendor-wallet.interface";

export class vendorWalletStateModel {
  vendorWallet = {
    consumer_id: null as number | null,
    balance: 0,
    transactions: {
      data: [] as TransactionsData[],
      total: 0
    }
  }
}

@State<vendorWalletStateModel>({
  name: "vendorWallet",
  defaults: {
   vendorWallet: {
      consumer_id: null,
      balance: 0,
      transactions: {
        data: [],
        total: 0
      }
    }
  },
})
@Injectable()
export class VendorWalletState {
  
  constructor(private notificationService: NotificationService,
    private vendorWalletService: VendorWalletService) {}

  @Selector()
  static vendorWallet(state: vendorWalletStateModel) {
    return state.vendorWallet;
  }

  @Action(GetVendorTransaction)
  getVendorTransaction(ctx: StateContext<vendorWalletStateModel>, { payload }: GetVendorTransaction) {
    return this.vendorWalletService.getVendorTransaction(payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            vendorWallet: {
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
            vendorWallet: {
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

  @Action(CreditVendorWallet)
  credit(ctx: StateContext<vendorWalletStateModel>, action: CreditVendorWallet) {
    return this.vendorWalletService.credit(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            vendorWallet: {
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

  @Action(DebitVendorWallet)
  debit(ctx: StateContext<vendorWalletStateModel>, action: DebitVendorWallet) {
    return this.vendorWalletService.debit(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            vendorWallet: {
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