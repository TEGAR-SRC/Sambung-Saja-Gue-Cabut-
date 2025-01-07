import { Injectable } from "@angular/core";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { Sidebar, Badges } from "../../interface/sidebar.interface";
import { NavService } from "../../services/nav.service";
import { tap } from "rxjs";
import * as data from '../../data/menu';
import { GetBadges, GetSidebar, UpdateBadgeValue } from "../action/sidebar.action";

export class SidebarStateModel {
  menu = {
    data: [] as Sidebar[],
  }
  badges: Badges | null
}

@State<SidebarStateModel>({
  name: "sidebar",
  defaults: {
    menu: {
      data: [],
    },
    badges: null
  },
})
@Injectable()
export class SidebarState {

  constructor(private store: Store,
    private navService: NavService) {}

  @Selector()
  static menu(state: SidebarStateModel) {
    return state.menu;
  }

  @Selector()
  static badges(state: SidebarStateModel) {
    return state.badges;
  }
 
  private updateBadgeValueRecursive(
    menuItems: Sidebar[],
    path: string,
    badgeValue: number
  ) {
    for (const item of menuItems) {
      if (item.path && item.path.toString() == path.toString()) {
        item.badgeValue = badgeValue;
        break;
      }
      if (item.children) {
        this.updateBadgeValueRecursive(item.children, path, badgeValue);
      }
    }
  }

  @Action(GetSidebar)
  getMenu(ctx: StateContext<SidebarStateModel>) {
    ctx.patchState({
      menu: {
        data: data.menu,
      }
    });
  }

  @Action(GetBadges)
  getBadges(ctx: StateContext<SidebarStateModel>, action: GetBadges) {
    return this.navService.getBadges(action.payload).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            badges: result
          });
          this.store.dispatch(new UpdateBadgeValue('/product', result?.product?.total_in_approved_products));
          this.store.dispatch(new UpdateBadgeValue('/store', result?.store?.total_in_approved_stores));
          this.store.dispatch(new UpdateBadgeValue('/refund', result?.refund?.total_pending_refunds));
          this.store.dispatch(new UpdateBadgeValue('/withdrawal', result?.withdraw_request?.total_pending_withdraw_requests));
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateBadgeValue)
  updateBadgeValue(ctx: StateContext<SidebarStateModel>, { path, badgeValue }: UpdateBadgeValue) {
    const state = ctx.getState();
    this.updateBadgeValueRecursive(state?.menu?.data, path, badgeValue);
    ctx.patchState({
      ...state,
    });
  }

}