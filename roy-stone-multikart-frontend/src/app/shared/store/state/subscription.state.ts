import { Injectable } from "@angular/core";
import { Action, StateContext } from "@ngxs/store";
import { tap } from "rxjs";

import { NotificationService } from "../../services/notification.service";
import { SubscriptionService } from "../../services/subscription.service";

import { Subscription } from "../action/subscription.action";

@Injectable()
export class SubscriptionState {

  constructor(
    private notificationService: NotificationService,
    private subscriptionService: SubscriptionService) {}

  @Action(Subscription)
  create(ctx: StateContext<any>, action: Subscription) {
    return this.subscriptionService.sendEmail(action.payload).pipe(
      tap({
        complete:() => {
          this.notificationService.showSuccess('Subscribed successfully');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

}
