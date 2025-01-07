import { Injectable } from "@angular/core";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { of, tap } from "rxjs";
import { GetCartItems, AddToCart, UpdateCart, DeleteCart, ClearCart } from "../action/cart.action";
import { Cart } from "../../interface/cart.interface";
import { CartService } from "../../services/cart.service";
import { NotificationService } from "../../services/notification.service";

export interface CartStateModel {
  is_digital_only: boolean | number | null;
  items: Cart[];
  total: number;
}
  
@State<CartStateModel>({
  name: "cart",
  defaults: {
    is_digital_only: null,
    items: [],
    total: 0
  },
})
@Injectable()
export class CartState {
    
  constructor(private cartService: CartService,
    private notificationService: NotificationService,
    private store: Store) {}

  @Selector()
  static cartItems(state: CartStateModel) {
    return state.items;
  }

  @Selector()
  static cartTotal(state: CartStateModel) {
    return state.total;
  }

  @Selector()
  static cartHasDigital(state: CartStateModel) {
    return state.is_digital_only;
  }

  @Action(GetCartItems)
  getCartItems(ctx: StateContext<CartStateModel>) {
    return this.cartService.getCartItems().pipe(
      tap({
        next: result => { 
          ctx.patchState(result);
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(AddToCart)
  add(ctx: StateContext<CartStateModel>, action: AddToCart) {
    return this.cartService.addToCart(action.payload).pipe(
      tap({
        next: result => {
          if(result.items.length) {
            const state = ctx.getState();
            const cart  = [...state.items];
            const index = cart.findIndex(item => item.id === result.items[0].id);

            let output = { ...state };

            if(index != -1) {
              cart[index].quantity = cart[index]?.quantity + action?.payload.quantity;

              if(cart[index].product?.wholesales?.length) {
                let wholesale = cart[index].product.wholesales.find(value => value.min_qty <= cart[index].quantity && value.max_qty >= cart[index].quantity) || null;
                if(wholesale && cart[index].product.wholesale_price_type == 'fixed') {
                  cart[index].sub_total = cart[index].quantity * wholesale.value;
                  cart[index].wholesale_price = cart[index].sub_total / cart[index].quantity;
                } else if(wholesale && cart[index].product.wholesale_price_type == 'percentage') {
                  cart[index].sub_total = cart[index].quantity * (cart[index]?.variation ? cart[index]?.variation?.sale_price : cart[index].product.sale_price);
                  cart[index].sub_total = cart[index].sub_total - (cart[index].sub_total * (wholesale.value / 100));
                  cart[index].wholesale_price = cart[index].sub_total / cart[index].quantity;
                } else {
                  cart[index].sub_total = cart[index]?.quantity * (cart[index]?.variation ? cart[index]?.variation?.sale_price : cart[index].product.sale_price);
                  cart[index].wholesale_price = null;
                }
              } else {
                cart[index].sub_total = cart[index]?.quantity * (cart[index]?.variation ? cart[index]?.variation?.sale_price : cart[index].product.sale_price);
                cart[index].wholesale_price = null;
              }
              
            } else {
              output.items = [...state.items, ...result.items];
            }

            // Calculate Total
            output.total = output.items.reduce((prev, curr: Cart) => {
              return (prev + Number(curr.sub_total));
            }, 0);
            
            output.is_digital_only = result.is_digital_only;
            ctx.patchState(output);
          }
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateCart)
  update(ctx: StateContext<CartStateModel>, action: UpdateCart) {
    const state = ctx.getState();
    const cart = [...state.items];
    const index = cart.findIndex(item => item.id === action.payload.id);
    const productQty = cart[index]?.variation ? cart[index]?.variation?.quantity : cart[index]?.product?.quantity;

    if(productQty < cart[index]?.quantity + action?.payload.quantity) {
      this.notificationService.showError(`You cannot add more than ${productQty} items available in stock.`);
      return false;
    }

    cart[index].quantity = cart[index]?.quantity + action?.payload.quantity;

    if(cart[index].product?.wholesales?.length) {
      let wholesale = cart[index].product.wholesales.find(value => value.min_qty <= cart[index].quantity && value.max_qty >= cart[index].quantity) || null;
      if(wholesale && cart[index].product.wholesale_price_type == 'fixed') {
        cart[index].sub_total = cart[index].quantity * wholesale.value;
        cart[index].wholesale_price = cart[index].sub_total / cart[index].quantity;
      } else if(wholesale && cart[index].product.wholesale_price_type == 'percentage') {
        cart[index].sub_total = cart[index].quantity * (cart[index]?.variation ? cart[index]?.variation?.sale_price : cart[index].product.sale_price);
        cart[index].sub_total = cart[index].sub_total - (cart[index].sub_total * (wholesale.value / 100));
        cart[index].wholesale_price = cart[index].sub_total / cart[index].quantity;
      } else {
        cart[index].sub_total = cart[index]?.quantity * (cart[index]?.variation ? cart[index]?.variation?.sale_price : cart[index].product.sale_price);
        cart[index].wholesale_price = null;
      }
    } else {
      cart[index].sub_total = cart[index]?.quantity * (cart[index]?.variation ? cart[index]?.variation?.sale_price : cart[index].product.sale_price);
      cart[index].wholesale_price = null;
    }

    if(cart[index].quantity < 1) {
      this.store.dispatch(new DeleteCart(action.payload.id!));
      return of();
    }

    let total = state.items.reduce((prev, curr: Cart) => {
      return (prev + Number(curr.sub_total));
    }, 0);
  
    ctx.patchState({
      ...state,
      total: total
    });

    return this.cartService.updateCart(action.payload).pipe(
      tap({
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteCart)
  delete(ctx: StateContext<CartStateModel>, { id }: DeleteCart) {
    const state = ctx.getState();
    let cart  = state.items.filter(value => value.id !== id);
    let total = state.items.reduce((prev, curr: Cart) => {
      return (prev + Number(curr.sub_total));
    }, 0);
    ctx.patchState({
      items: cart,
      total: total
    });
    return this.cartService.deleteCart(id).pipe(
      tap({
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(ClearCart)
  clearCart(ctx: StateContext<CartStateModel>) {
    ctx.patchState({
      items: [],
      total: 0
    });
  }

}
  