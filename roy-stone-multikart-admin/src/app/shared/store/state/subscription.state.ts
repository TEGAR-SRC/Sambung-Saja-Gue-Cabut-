import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { SubscriptionService } from "../../services/subscription.service";
import { GetSubscriptionList } from "../action/subscription.action";
import { Subscription } from "../../interface/subscription.interface";

export class SubscriptionStateModel {
    subscription = {
        data: [] as Subscription[],
        total: 0
    }
}

@State<SubscriptionStateModel>({
  name: "subscription",
  defaults: {
    subscription: {
      data: [],
      total: 0
    },
  },
})
@Injectable()
export class SubscriptionState {
  
  constructor(private subscriptionService: SubscriptionService) {}

  @Selector()
  static subscribeList(state: SubscriptionStateModel) {
    return state.subscription
  }

  

  @Action(GetSubscriptionList)
  getSubscribeList(ctx: StateContext<SubscriptionStateModel>, action: GetSubscriptionList) {
    return this.subscriptionService.getSubscribeList(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            subscription: {
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
