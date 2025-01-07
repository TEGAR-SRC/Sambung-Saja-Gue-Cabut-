import { Injectable } from "@angular/core";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { UpdateBadgeValue } from "../action/sidebar.action";
import { GetWithdrawRequest, UpdateWithdrawStatus, WithdrawRequest } from "../action/withdrawal.action";
import { Withdrawal } from "../../interface/withdrawal.interface";
import { WithdrawalService } from "../../services/withdrawal.service";
import { NotificationService } from "../../services/notification.service";

export class WithdrawalStateModel {
  withdrawal = {
    data: [] as Withdrawal[],
    total: 0
  }
}

@State<WithdrawalStateModel>({
  name: "withdrawal",
  defaults: {
    withdrawal: {
      data: [],
      total: 0
    },
  },
})

@Injectable()
export class WithdrawalState {
  
  constructor(private store: Store,
    private notificationService: NotificationService,
    private withdrawalService: WithdrawalService) {}

  @Selector()
  static withdrawal(state: WithdrawalStateModel) {
    return state.withdrawal;
  }

  @Action(GetWithdrawRequest)
  getWithdrawal(ctx: StateContext<WithdrawalStateModel>, action: GetWithdrawRequest) {
    return this.withdrawalService.getWithdrawRequest(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            withdrawal: {
              data: result.data,
              total: result?.total ? result?.total : result.data?.length
            }
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(WithdrawRequest)
  createRequest(ctx: StateContext<WithdrawalStateModel>, action: WithdrawRequest) {
    return this.withdrawalService.withdrawRequest(action.payload).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            withdrawal: {
              data: [...state.withdrawal.data, result],
              total: state?.withdrawal.total + 1
            }
          });
        },
        complete:() => {
          this.notificationService.showSuccess('Your Request Send Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateWithdrawStatus)
  updateWithdrawStatus(ctx: StateContext<WithdrawalStateModel>, { id, status }: UpdateWithdrawStatus) {
    return this.withdrawalService.updateWithdrawStatus(id, status).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const withdrawals = [...state.withdrawal.data];
            const index = withdrawals.findIndex(withdrawal => withdrawal.id === id);
            withdrawals[index] = result;

            ctx.patchState({
              ...state,
              withdrawal: {
                data: withdrawals,
                total: state.withdrawal.total
              }
            });
            this.store.dispatch(new UpdateBadgeValue('/withdrawal', result?.total_pending_withdraw_requests));
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Withdraw Status Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }
  
}