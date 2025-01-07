import { Injectable } from "@angular/core";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetTaxes, CreateTax, EditTax, 
         UpdateTax, UpdateTaxStatus, DeleteTax, 
         DeleteAllTax } from "../action/tax.action";
import { Tax } from "../../interface/tax.interface";
import { TaxService } from "../../services/tax.service";
import { NotificationService } from "../../services/notification.service";

export class TaxStateModel {
  tax = {
    data: [] as Tax[],
    total: 0
  }
  selectedTax: Tax | null;
}

@State<TaxStateModel>({
  name: "tax",
  defaults: {
    tax: {
      data: [],
      total: 0
    },
    selectedTax: null
  },
})
@Injectable()
export class TaxState {
  
  constructor(private store: Store,
    private notificationService: NotificationService,
    private taxService: TaxService) {}

  @Selector()
  static tax(state: TaxStateModel) {
    return state.tax;
  }

  @Selector()
  static taxes(state: TaxStateModel) {
    return state.tax.data.map((tax: Tax) => {
      return { label: tax?.name, value: tax?.id }
    });
  }

  @Selector()
  static selectedTax(state: TaxStateModel) {
    return state.selectedTax;
  }

  @Action(GetTaxes)
  getTaxes(ctx: StateContext<TaxStateModel>, action: GetTaxes) {
    return this.taxService.getTaxes(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            tax: {
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

  @Action(CreateTax)
  create(ctx: StateContext<TaxStateModel>, action: CreateTax) {
    return this.taxService.createTax(action.payload).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            tax: {
              data: [...state.tax.data, result],
              total: state?.tax.total + 1
            }
          });
        },
        complete:() => {
          this.notificationService.showSuccess('Tax Created Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(EditTax)
  edit(ctx: StateContext<TaxStateModel>, { id }: EditTax) {
    return this.taxService.editTax(id).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            selectedTax: result
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateTax)
  update(ctx: StateContext<TaxStateModel>, { payload, id }: UpdateTax) {
    return this.taxService.updateTax(id, payload).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const taxes = [...state.tax.data];
            const index = taxes.findIndex(tax => tax.id === id);
            taxes[index] = result;

            ctx.patchState({
              ...state,
              tax: {
                data: taxes,
                total: state.tax.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Tax Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateTaxStatus)
  updateStatus(ctx: StateContext<TaxStateModel>, { id, status }: UpdateTaxStatus) {
    return this.taxService.updateTaxStatus(id, status).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const taxes = [...state.tax.data];
            const index = taxes.findIndex(tax => tax.id === id);
            taxes[index] = result;

            ctx.patchState({
              ...state,
              tax: {
                data: taxes,
                total: state.tax.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Tax Status Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteTax)
  delete(ctx: StateContext<TaxStateModel>, { id }: DeleteTax) {
    return this.taxService.deleteTax(id).pipe(
      tap({
        next: () => { 
          this.store.dispatch(new GetTaxes({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Tax Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteAllTax)
  deleteAll(ctx: StateContext<TaxStateModel>, { ids }: DeleteAllTax) {
    return this.taxService.deleteAllTax(ids).pipe(
      tap({
        next: () => {
          this.store.dispatch(new GetTaxes({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Tax Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }
  

}
