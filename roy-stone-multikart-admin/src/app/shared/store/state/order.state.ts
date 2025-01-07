import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetOrders, SelectUser, ViewOrder, Checkout, PlaceOrder, UpdateOrderStatus, Clear, DownloadInvoice } from "../action/order.action";
import { Order, OrderCheckout } from "../../interface/order.interface";
import { User } from "../../interface/user.interface";
import { UserService } from "../../services/user.service";
import { OrderService } from "../../services/order.service";

export class OrderStateModel {
  order = {
    data: [] as Order[],
    total: 0
  }
  selectedOrder: Order | null
  selectedUser: User | null
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
    selectedUser: null,
    checkout: null
  },
})
@Injectable()
export class OrderState {
  
  constructor(private router: Router,
    private orderService: OrderService,
    private userService: UserService) {}

  @Selector()
  static order(state: OrderStateModel) {
    return state.order;
  }

  @Selector()
  static selectedUser(state: OrderStateModel) {
    return state.selectedUser;
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

  @Action(SelectUser)
  selectUser(ctx: StateContext<OrderStateModel>, { id }: SelectUser) {
    return this.userService.editUser(id).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            selectedUser: result,
            checkout: null
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
          this.router.navigateByUrl(`/order/details/${result.order_number}`);
        },
        error: err => { 
          throw new Error(err?.error?.message);
        },
      })
    );
  }

  @Action(UpdateOrderStatus)
  updateOrderStatus(ctx: StateContext<OrderStateModel>, { id, payload }: UpdateOrderStatus) {
    return this.orderService.updateOrderStatus(id, payload).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const orders = [...state.order.data];
            const index = orders.findIndex(order => order.id === id);
            orders[index] = result;

            ctx.patchState({
              ...state,
              order: {
                data: orders,
                total: state.order.total
              },
              selectedOrder: result
            });
          }
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

  @Action(Clear)
  clear(ctx: StateContext<OrderStateModel>) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      selectedUser: null,
      checkout: null
    });
  }

}  