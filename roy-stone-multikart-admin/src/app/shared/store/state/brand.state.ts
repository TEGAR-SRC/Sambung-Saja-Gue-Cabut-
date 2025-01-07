import { Injectable } from "@angular/core";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetBrands, CreateBrand, EditBrand, 
         UpdateBrand, UpdateBrandStatus, DeleteBrand, 
         DeleteAllBrand, ExportBrand, ImportBrand } from "../action/brand.action";
import { Brand } from "../../interface/brand.interface";
import { BrandService } from "../../services/brand.service";
import { NotificationService } from "../../services/notification.service";

export class BrandStateModel {
  brand = {
    data: [] as Brand[],
    total: 0
  }
  selectedBrand: Brand | null;
}

@State<BrandStateModel>({
  name: "brand",
  defaults: {
    brand: {
      data: [],
      total: 0
    },
    selectedBrand: null
  },
})
@Injectable()
export class BrandState {
  
  constructor(private store: Store,
    private notificationService: NotificationService,
    private brandService: BrandService) {}

  @Selector()
  static brand(state: BrandStateModel) {
    return state.brand;
  }

  @Selector()
  static selectedBrand(state: BrandStateModel) {
    return state.selectedBrand;
  }

  @Selector()
  static brands(state: BrandStateModel) {
    return state.brand.data.map(res => { 
      return { label: res?.name, value: res?.id }
    });
  }

  @Action(GetBrands)
  getBrands(ctx: StateContext<BrandStateModel>, action: GetBrands) {
    return this.brandService.getBrands(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            brand: {
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

  @Action(CreateBrand)
  create(ctx: StateContext<BrandStateModel>, action: CreateBrand) {
    return this.brandService.createBrand(action.payload).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            brand: {
              data: [...state.brand.data, result],
              total: state?.brand.total + 1
            }
          });
        },
        complete:() => {
          this.notificationService.showSuccess('Brand Created Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(EditBrand)
  edit(ctx: StateContext<BrandStateModel>, { id }: EditBrand) {
    return this.brandService.editBrand(id).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            selectedBrand: result
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateBrand)
  update(ctx: StateContext<BrandStateModel>, { payload, id }: UpdateBrand) {
    return this.brandService.updateBrand(id, payload).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const brands = [...state.brand.data];
            const index = brands.findIndex(brand => brand.id === id);
            brands[index] = result;

            ctx.patchState({
              ...state,
              brand: {
                data: brands,
                total: state.brand.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Brand Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateBrandStatus)
  updateStatus(ctx: StateContext<BrandStateModel>, { id, status }: UpdateBrandStatus) {
    return this.brandService.updateBrandStatus(id, status).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const brands = [...state.brand.data];
            const index = brands.findIndex(brand => brand.id === id);
            brands[index] = result;

            ctx.patchState({
              ...state,
              brand: {
                data: brands,
                total: state.brand.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Brand Status Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteBrand)
  delete(ctx: StateContext<BrandStateModel>, { id }: DeleteBrand) {
    return this.brandService.deleteBrand(id).pipe(
      tap({
        next: () => { 
          this.store.dispatch(new GetBrands({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Brans Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteAllBrand)
  deleteAll(ctx: StateContext<BrandStateModel>, { ids }: DeleteAllBrand) {
    return this.brandService.deleteAllBrand(ids).pipe(
      tap({
        next: () => {
          this.store.dispatch(new GetBrands({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Brand Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(ImportBrand)
  import(ctx: StateContext<BrandStateModel>, action: ImportBrand) {
    return this.brandService.importBrand(action.payload).pipe(
      tap({
        next: result => {
          this.store.dispatch(new GetBrands({'page': 1, 'paginate': 15}));
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(ExportBrand)
  export(ctx: StateContext<BrandStateModel>, action: ExportBrand) {
    return this.brandService.exportBrand().pipe(
      tap({
        next: result => {
          const blob = new Blob([result], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'brand.csv';
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
