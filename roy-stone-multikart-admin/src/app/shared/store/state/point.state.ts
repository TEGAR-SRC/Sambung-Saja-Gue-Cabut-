import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetUserTransaction, CreditPoint, DebitPoint } from "../action/point.action";
import { TransactionsData } from "../../interface/point.interface";
import { PointService } from "../../services/point.service";
import { NotificationService } from "../../services/notification.service";

export class PointStateModel {
  point = {
    consumer_id: null as number | null,
    balance: 0 as number,
    transactions: {
      data: [] as TransactionsData[],
      total: 0
    }
  }
}

@State<PointStateModel>({
  name: "point",
  defaults: {
    point: {
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
export class PointState {
  
  constructor(private notificationService: NotificationService,
    private pointService: PointService) {}

  @Selector()
  static point(state: PointStateModel) {
    return state.point;
  }

  @Action(GetUserTransaction)
  getUserTransaction(ctx: StateContext<PointStateModel>, { payload }: GetUserTransaction) {
    return this.pointService.getUserTransaction(payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            point: {
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
            point: {
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

  @Action(CreditPoint)
  credit(ctx: StateContext<PointStateModel>, action: CreditPoint) {
    return this.pointService.credit(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            point: {
              consumer_id: result?.consumer_id!,
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

  @Action(DebitPoint)
  debit(ctx: StateContext<PointStateModel>, action: DebitPoint) {
    return this.pointService.debit(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            point: {
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
