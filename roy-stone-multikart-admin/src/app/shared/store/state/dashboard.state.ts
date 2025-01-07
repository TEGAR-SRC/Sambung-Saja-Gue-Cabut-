import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetStatisticsCount, GetRevenueChart } from "../action/dashboard.action";
import { StatisticsCount, RevenueChart } from "./../../interface/dashboard.interface";
import { DashboardService } from "../../services/dashboard.service";

export class DashboardStateModel {
  statistics: StatisticsCount | null;
  revenueChart: RevenueChart | null
}

@State<DashboardStateModel>({
  name: "dashboard",
  defaults: {
    statistics: null,
    revenueChart: null
  },
})
@Injectable()
export class DashboardState {

  constructor(private dashboardService: DashboardService) {}

  @Selector()
  static statistics(state: DashboardStateModel) {
    return state.statistics;
  }

  @Selector()
  static revenueChart(state: DashboardStateModel) {
    return state.revenueChart;
  }

  @Action(GetStatisticsCount)
  getStatisticsCount(ctx: StateContext<DashboardStateModel>, action: GetStatisticsCount) {
    return this.dashboardService.getStatisticsCount(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            statistics: result,
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetRevenueChart)
  getRevenueChart(ctx: StateContext<DashboardStateModel>) {
    return this.dashboardService.getRevenueChart().pipe(
      tap({
        next: result => { 
          ctx.patchState({
            revenueChart: result,
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

}