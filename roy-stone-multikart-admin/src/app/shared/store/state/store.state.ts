import { Injectable } from "@angular/core";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { UpdateBadgeValue } from "../action/sidebar.action";
import { GetStores, CreateStore, EditStore, UpdateStore, UpdateStoreStatus, DeleteStore, 
         DeleteAllStore, ApproveStoreStatus} from "../action/store.action";
import { Stores } from "../../interface/store.interface";
import { StoreService } from "../../services/store.service";
import { NotificationService } from "../../services/notification.service";

export class StoreStateModel {
  store = {
    data: [] as Stores[],
    total: 0
  }
  selectedStore: Stores | null;
}

@State<StoreStateModel>({
  name: "store",
  defaults: {
    store: {
      data: [],
      total: 0
    },
    selectedStore: null
  },
})
@Injectable()
export class StoreState {
  
  constructor(private store: Store,
    private notificationService: NotificationService,
    private storeService: StoreService) {}

  @Selector()
  static store(state: StoreStateModel) {
    return state.store;
  }

  @Selector()
  static stores(state: StoreStateModel) {
    return state.store.data.map(store => {
      return { label: store?.store_name, value: store?.id }
    });
  }

  @Selector()
  static selectedStore(state: StoreStateModel) {
    return state.selectedStore;
  }

  @Action(GetStores)
  getStores(ctx: StateContext<StoreStateModel>, action: GetStores) {
    return this.storeService.getStores(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            store: {
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

  @Action(CreateStore)
  create(ctx: StateContext<StoreStateModel>, action: CreateStore) {
    return this.storeService.createStore(action.payload).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            store: {
              data: [...state.store.data, result],
              total: state?.store.total + 1
            }
          });
        },
        complete:() => {
          this.notificationService.showSuccess('Store Created Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(EditStore)
  edit(ctx: StateContext<StoreStateModel>, { id }: EditStore) {
    return this.storeService.editStore(id).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            selectedStore: result
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateStore)
  update(ctx: StateContext<StoreStateModel>, { payload, id }: UpdateStore) {
    return this.storeService.updateStore(id, payload).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const stores = [...state.store.data];
            const index = stores.findIndex(store => store.id === id);
            stores[index] = result;

            ctx.patchState({
              ...state,
              store: {
                data: stores,
                total: state.store.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Store Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateStoreStatus)
  updateStatus(ctx: StateContext<StoreStateModel>, { id, status }: UpdateStoreStatus) {
    return this.storeService.updateStoreStatus(id, status).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const stores = [...state.store.data];
            const index = stores.findIndex(store => store.id === id);
            stores[index] = result;

            ctx.patchState({
              ...state,
              store: {
                data: stores,
                total: state.store.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Store Status Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }


  @Action(ApproveStoreStatus)
  approveStatus(ctx: StateContext<StoreStateModel>, { id, status }: ApproveStoreStatus) {
    return this.storeService.approveStoreStatus(id, status).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const stores = [...state.store.data];
            const index = stores.findIndex(store => store.id === id);
            stores[index] = result;

            ctx.patchState({
              ...state,
              store: {
                data: stores,
                total: state.store.total
              }
            });
            this.store.dispatch(new UpdateBadgeValue('/store', result?.total_in_approved_stores));
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Store Status Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteStore)
  delete(ctx: StateContext<StoreStateModel>, { id }: DeleteStore) {
    return this.storeService.deleteStore(id).pipe(
      tap({
        next: () => { 
          this.store.dispatch(new GetStores({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Store Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteAllStore)
  deleteAll(ctx: StateContext<StoreStateModel>, { ids }: DeleteAllStore) {
    return this.storeService.deleteAllStore(ids).pipe(
      tap({
        next: () => {
          const state = ctx.getState();
          let store = state.store.data.filter(value => !ids.includes(value.id));
          this.store.dispatch(new GetStores({'page': 1, 'paginate': 15}));
          ctx.patchState({
            ...state,
            store: {
              data: store,
              total: state.store.total - ids.length
            }
          });
        },
        complete:() => {
          this.notificationService.showSuccess('Stores Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

}
