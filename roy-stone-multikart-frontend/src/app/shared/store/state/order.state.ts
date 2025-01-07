import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";

import { Order, OrderCheckout } from "../../interface/order.interface";

import { NotificationService } from "../../services/notification.service";
import { OrderService } from "../../services/order.service";

import { Checkout, DownloadInvoice, GetOrders, OrderTracking, PlaceOrder, RePayment, ViewOrder } from "../action/order.action";

export class OrderStateModel {
  order = {
    data: [] as Order[],
    total: 0
  }
  selectedOrder: Order | null
  checkout: OrderCheckout | null
}

@State<OrderStateModel>({
  name: "order",
  defaults: {
    order: {
      data: [],
      total: 0
    },
    selectedOrder: null,
    checkout: null
  },
})
@Injectable()
export class OrderState {

  constructor(private notificationService: NotificationService,
    private router: Router,
    private orderService: OrderService) {}

  @Selector()
  static order(state: OrderStateModel) {
    return state.order;
  }

  @Selector()
  static selectedOrder(state: OrderStateModel) {
    return state.selectedOrder;
  }

  @Selector()
  static checkout(state: OrderStateModel) {
    return state.checkout;
  }

  @Action(GetOrders)
  getOrders(ctx: StateContext<OrderStateModel>, action: GetOrders) {
    return this.orderService.getOrders(action?.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            order: {
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

  @Action(ViewOrder)
  viewOrder(ctx: StateContext<OrderStateModel>, { id }: ViewOrder) {
    this.orderService.skeletonLoader = true;
    return this.orderService.viewOrder(id).pipe(
      tap({
        next: result => {
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            selectedOrder: result
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        },
        complete: () => {
          this.orderService.skeletonLoader = false;
        }
      })
    );
  }

  @Action(Checkout)
  checkout(ctx: StateContext<OrderStateModel>, action: Checkout) {
    return this.orderService.checkout(action?.payload).pipe(
      tap({
        next: result => {
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            checkout: result
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(PlaceOrder)
  placeOrder(ctx: StateContext<OrderStateModel>, action: PlaceOrder) {
    return this.orderService.placeOrder(action?.payload).pipe(
      tap({
        next: result => {
          if((action.payload.payment_method == 'cod' || action.payload.payment_method == 'bank_transfer') && !result.is_guest) {
            console.log("🚀 ~ OrderState ~ placeOrder ~ result.is_guest:", result.is_guest)
            this.router.navigateByUrl(`/account/order/details/${result.order_number}`);
            
          } else if((action.payload.payment_method == 'cod' || action.payload.payment_method == 'bank_transfer') && result.is_guest) {
            this.router.navigate([ 'order/details' ], { queryParams: { order_number: result.order_number, email_or_phone: action?.payload?.email } });
            console.log({ queryParams: { order_number: result.order_number, email_or_phone: action?.payload?.consumer?.email } }, action?.payload)
          } else {
            window.open(result.url, "_self");
          }
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(RePayment)
  rePayment(ctx: StateContext<OrderStateModel>, action: RePayment) {
    return this.orderService.rePayment(action.payload).pipe(
      tap({
        next: result => {
          if((action.payload.payment_method == 'cod' || action.payload.payment_method == 'bank_transfer') && !result.is_guest) {
            this.router.navigateByUrl(`/account/order/details/${result.order_number}`);
          } else if((action.payload.payment_method == 'cod' || action.payload.payment_method == 'bank_transfer') && result.is_guest) {
            this.router.navigate([ 'order/details' ], { queryParams: { order_number: result.order_number, email_or_phone: result.email } });
          } else {
            window.open(result.url, "_self");
          }
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(OrderTracking)
  orderTracking(ctx: StateContext<OrderStateModel>, action: OrderTracking) {
    // this.notificationService.notification = false;
    return this.orderService.orderTracking(action.payload).pipe(
      tap({
        next: result => {
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            selectedOrder: result
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DownloadInvoice)
  downloadInvoice(ctx: StateContext<OrderStateModel>, action: DownloadInvoice) {
    return this.orderService.downloadInvoice(action.payload).pipe(
      tap({
        next: result => {
          const blob = new Blob([result], { type: 'pdf' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `invoice-${action.payload['order_number']}.pdf`;
          link.click();
          window.URL.revokeObjectURL(url);
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }
 
}
