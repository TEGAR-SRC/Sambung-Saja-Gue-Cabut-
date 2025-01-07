import { Injectable } from "@angular/core";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetCurrencies, CreateCurrency, EditCurrency, 
         UpdateCurrency, UpdateCurrencyStatus, DeleteCurrency, 
         DeleteAllCurrency } from "../action/currency.action";
import { Currency } from "../../interface/currency.interface";
import { CurrencyService } from "../../services/currency.service";
import { NotificationService } from "../../services/notification.service";

export class CurrencyStateModel {
  currency = {
    data: [] as Currency[],
    total: 0
  }
  selectedCurrency: Currency | null;
}

@State<CurrencyStateModel>({
  name: "currency",
  defaults: {
    currency: {
      data: [],
      total: 0
    },
    selectedCurrency: null
  },
})
@Injectable()
export class CurrencyState {
  
  constructor(private store: Store,
    private notificationService: NotificationService,
    private currencyService: CurrencyService) {}

  @Selector()
  static currency(state: CurrencyStateModel) {
    return state.currency;
  }

  @Selector()
  static currencies(state: CurrencyStateModel) {
    return state.currency.data.map(res => { 
      return { label: res?.code, value: res?.id }
    });
  }

  @Selector()
  static selectedCurrency(state: CurrencyStateModel) {
    return state.selectedCurrency;
  }

  @Action(GetCurrencies)
  getCurrencies(ctx: StateContext<CurrencyStateModel>, action: GetCurrencies) {
    return this.currencyService.getCurrencies(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            currency: {
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

  @Action(CreateCurrency)
  create(ctx: StateContext<CurrencyStateModel>, action: CreateCurrency) {
    return this.currencyService.createCurrency(action.payload).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            currency: {
              data: [...state.currency.data, result],
              total: state?.currency.total + 1
            }
          });
        },
        complete:() => {
          this.notificationService.showSuccess('Currency Created Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(EditCurrency)
  edit(ctx: StateContext<CurrencyStateModel>, { id }: EditCurrency) {
    return this.currencyService.editCurrency(id).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            selectedCurrency: result
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateCurrency)
  update(ctx: StateContext<CurrencyStateModel>, { payload, id }: UpdateCurrency) {
    return this.currencyService.updateCurrency(id, payload).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const currencies = [...state.currency.data];
            const index = currencies.findIndex(currency => currency.id === id);
            currencies[index] = result;

            ctx.patchState({
              ...state,
              currency: {
                data: currencies,
                total: state.currency.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Currency Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateCurrencyStatus)
  updateStatus(ctx: StateContext<CurrencyStateModel>, { id, status }: UpdateCurrencyStatus) {
    return this.currencyService.updateCurrencyStatus(id, status).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const currencies = [...state.currency.data];
            const index = currencies.findIndex(currency => currency.id === id);
            currencies[index] = result;

            ctx.patchState({
              ...state,
              currency: {
                data: currencies,
                total: state.currency.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Currency Status Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteCurrency)
  delete(ctx: StateContext<CurrencyStateModel>, { id }: DeleteCurrency) {
    return this.currencyService.deleteCurrency(id).pipe(
      tap({
        next: () => { 
          this.store.dispatch(new GetCurrencies({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Currency Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteAllCurrency)
  deleteAll(ctx: StateContext<CurrencyStateModel>, { ids }: DeleteAllCurrency) {
    return this.currencyService.deleteAllCurrency(ids).pipe(
      tap({
        next: () => {
          this.store.dispatch(new GetCurrencies({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Currency Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

}
