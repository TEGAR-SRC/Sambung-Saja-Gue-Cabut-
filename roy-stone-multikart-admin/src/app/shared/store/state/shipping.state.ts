import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetShippings, CreateShipping, EditShipping, 
         UpdateShipping, DeleteShipping, CreateShippingRule,
         UpdateShippingRule, DeleteShippingRule } from "../action/shipping.action";
import { Shipping } from "../../interface/shipping.interface";
import { ShippingService } from "../../services/shipping.service";
import { NotificationService } from "../../services/notification.service";

export class ShippingStateModel {
  shipping = {
    data: [] as Shipping[]
  }
  selectedShipping: Shipping | null;
}

@State<ShippingStateModel>({
  name: "shipping",
  defaults: {
    shipping: {
      data: []
    },
    selectedShipping: null
  },
})
@Injectable()
export class ShippingState {
  
  constructor(private notificationService: NotificationService,
    private shippingService: ShippingService) {}

  @Selector()
  static shipping(state: ShippingStateModel) {
    return state.shipping;
  }

  @Selector()
  static selectedShipping(state: ShippingStateModel) {
    return state.selectedShipping;
  }

  @Action(GetShippings)
  getShippings(ctx: StateContext<ShippingStateModel>) {
    return this.shippingService.getShippings().pipe(
      tap({
        next: result => { 
          ctx.patchState({
            shipping: {
              data: result
            }
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(CreateShipping)
  create(ctx: StateContext<ShippingStateModel>, action: CreateShipping) {
    return this.shippingService.createShipping(action.payload).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            shipping: {
              data: [...state.shipping.data, ...result]
            }
          });
        },
        complete:() => {
          this.notificationService.showSuccess('Shipping Created Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(EditShipping)
  edit(ctx: StateContext<ShippingStateModel>, { id }: EditShipping) {
    return this.shippingService.editShipping(id).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            selectedShipping: result
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateShipping)
  update(ctx: StateContext<ShippingStateModel>, { payload, id }: UpdateShipping) {
    return this.shippingService.updateShipping(id, payload).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const data = [...state.shipping.data];
            const index = data.findIndex(shipping => shipping.id === id);
            data[index] = result;

            ctx.patchState({
              ...state,
              shipping: {
                data: data
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Shipping Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteShipping)
  delete(ctx: StateContext<ShippingStateModel>, { id }: DeleteShipping) {
    return this.shippingService.deleteShipping(id).pipe(
      tap({
        next: () => { 
          const state = ctx.getState();
          let data = state.shipping.data.filter(value => value.id !== id) 
          ctx.patchState({
            ...state,
            shipping: {
              data: data
            }
          });
        },
        complete:() => {
          this.notificationService.showSuccess('Shipping Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }


  @Action(CreateShippingRule)
  createRule(ctx: StateContext<ShippingStateModel>, action: CreateShippingRule) {
    return this.shippingService.createShippingRule(action.payload).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          if(state.selectedShipping) {
            const rule = [...state.selectedShipping.shipping_rules, result];
            state.selectedShipping.shipping_rules = rule;
            ctx.patchState({
              ...state  
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Shipping Rule Created Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateShippingRule)
  updateRule(ctx: StateContext<ShippingStateModel>, { payload, id }: UpdateShippingRule) {
    return this.shippingService.updateShippingRule(id, payload).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            if(state.selectedShipping) {
              const rule = [...state.selectedShipping.shipping_rules];
              const index = rule.findIndex(rule => rule.id === id);
              rule[index] = result;
              state.selectedShipping.shipping_rules = rule;
              ctx.patchState({
                ...state  
              });
            }
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Shipping Rule Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteShippingRule)
  deleteRule(ctx: StateContext<ShippingStateModel>, { id }: DeleteShippingRule) {
    return this.shippingService.deleteShippingRule(id).pipe(
      tap({
        next: () => { 
          const state = ctx.getState();
          if(state.selectedShipping) {
            const rule = state.selectedShipping.shipping_rules.filter(value => value.id !== id);
            state.selectedShipping.shipping_rules = rule;
            ctx.patchState({
              ...state
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Shipping Rule Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }


}
