import { Injectable } from "@angular/core";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetCoupons, CreateCoupon, EditCoupon, 
         UpdateCoupon, UpdateCouponStatus, DeleteCoupon, 
         DeleteAllCoupon } from "../action/coupon.action";
import { Coupon } from "../../interface/coupon.interface";
import { CouponService } from "../../services/coupon.service";
import { NotificationService } from "../../services/notification.service";

export class CouponStateModel {
  coupon = {
    data: [] as Coupon[],
    total: 0
  }
  selectedCoupon: Coupon | null;
}

@State<CouponStateModel>({
  name: "coupon",
  defaults: {
    coupon: {
      data: [],
      total: 0
    },
    selectedCoupon: null
  },
})
@Injectable()
export class CouponState {
  
  constructor(private store: Store,
    private notificationService: NotificationService,
    private couponService: CouponService) {}

  @Selector()
  static coupon(state: CouponStateModel) {
    return state.coupon;
  }

  @Selector()
  static selectedCoupon(state: CouponStateModel) {
    return state.selectedCoupon;
  }

  @Selector()
  static coupons(state: CouponStateModel) {
    return state.coupon.data.map(coupon => {
      return { label: coupon?.title, value: coupon?.id }
    });
  }

  @Action(GetCoupons)
  getCoupons(ctx: StateContext<CouponStateModel>, action: GetCoupons) {
    return this.couponService.getCoupons(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            coupon: {
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

  @Action(CreateCoupon)
  create(ctx: StateContext<CouponStateModel>, action: CreateCoupon) {
    return this.couponService.createCoupon(action.payload).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            coupon: {
              data: [...state.coupon.data, result],
              total: state?.coupon.total + 1
            }
          });
        },
        complete:() => {
          this.notificationService.showSuccess('Coupon Created Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(EditCoupon)
  edit(ctx: StateContext<CouponStateModel>, { id }: EditCoupon) {
    return this.couponService.editCoupon(id).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            selectedCoupon: result
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateCoupon)
  update(ctx: StateContext<CouponStateModel>, { payload, id }: UpdateCoupon) {
    return this.couponService.updateCoupon(id, payload).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const coupons = [...state.coupon.data];
            const index = coupons.findIndex(coupon => coupon.id === id);
            coupons[index] = result;

            ctx.patchState({
              ...state,
              coupon: {
                data: coupons,
                total: state.coupon.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Coupon Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateCouponStatus)
  updateStatus(ctx: StateContext<CouponStateModel>, { id, status }: UpdateCouponStatus) {
    return this.couponService.updateCouponStatus(id, status).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const coupons = [...state.coupon.data];
            const index = coupons.findIndex(coupon => coupon.id === id);
            coupons[index] = result;

            ctx.patchState({
              ...state,
              coupon: {
                data: coupons,
                total: state.coupon.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Coupon Status Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteCoupon)
  delete(ctx: StateContext<CouponStateModel>, { id }: DeleteCoupon) {
    return this.couponService.deleteCoupon(id).pipe(
      tap({
        next: () => { 
          this.store.dispatch(new GetCoupons({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Coupon Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteAllCoupon)
  deleteAll(ctx: StateContext<CouponStateModel>, { ids }: DeleteAllCoupon) {
    return this.couponService.deleteAllCoupon(ids).pipe(
      tap({
        next: () => {
          this.store.dispatch(new GetCoupons({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Coupon Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

}
