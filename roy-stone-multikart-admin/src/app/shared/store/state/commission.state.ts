import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetCommission } from "../action/commission.action";
import { Commission } from "../../interface/commission.interface";
import { CommissionService } from "../../services/commission.service";

export class CommissionStateModel {
  commission = {
    data: [] as Commission[],
    total: 0
  }
}

@State<CommissionStateModel>({
  name: "commission",
  defaults: {
   commission: {
      data: [],
      total: 0
    },
  },
})
@Injectable()
export class CommissionState {
  
  constructor(private commissionService: CommissionService) {}

  @Selector()
  static commission(state: CommissionStateModel) {
    return state.commission;
  }

  @Action(GetCommission)
  getCommission(ctx: StateContext<CommissionStateModel>, action: GetCommission) {
    return this.commissionService.getCommissionHistory(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            commission: {
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

}