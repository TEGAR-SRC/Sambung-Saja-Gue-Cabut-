import { Injectable } from "@angular/core";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { NotificationService } from "../../services/notification.service";
import { LicenseKeyService } from "../../services/license-key.service";
import { LicenseKey } from "../../interface/license-key.interface";
import { GetLicenseKeys, CreateLicenseKey, EditLicenseKey, UpdateLicenseKey, UpdateLicenseKeyStatus,
         DeleteLicenseKey, DeleteAllLicenseKey } from "../action/license-key.actions";

export class LicenseKeyStateModel {
  licenseKey = {
    data: [] as LicenseKey[],
    total: 0
  }
  selectedLicenseKey: LicenseKey | null;
}

@State<LicenseKeyStateModel>({
  name: "licenseKey",
  defaults: {
    licenseKey: {
      data: [],
      total: 0
    },
    selectedLicenseKey: null
  },
})
@Injectable()
export class LicenseKeysState {
  
  constructor(private store: Store,
    private notificationService: NotificationService,
    private licenseKeyServiceService: LicenseKeyService) {}

  @Selector()
  static licenseKey(state: LicenseKeyStateModel) {
    return state.licenseKey;
  }

  @Selector()
  static selectedLicenseKey(state: LicenseKeyStateModel) {
    return state.selectedLicenseKey;
  }

  @Action(GetLicenseKeys)
  getLicenseKeys(ctx: StateContext<LicenseKeyStateModel>, action: GetLicenseKeys) {
    return this.licenseKeyServiceService.getLicenseKeys(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            licenseKey: {
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

  @Action(CreateLicenseKey)
  create(ctx: StateContext<LicenseKeyStateModel>, action: CreateLicenseKey) {
    return this.licenseKeyServiceService.createLicenseKey(action.payload).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            licenseKey: {
              data: [...state.licenseKey.data, result],
              total: state?.licenseKey.total + 1
            }
          });
        },
        complete:() => {
          this.notificationService.showSuccess('License Created Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(EditLicenseKey)
  edit(ctx: StateContext<LicenseKeyStateModel>, { id }: EditLicenseKey) {
    return this.licenseKeyServiceService.editLicenseKey(id).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            selectedLicenseKey: result
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateLicenseKey)
  update(ctx: StateContext<LicenseKeyStateModel>, { payload, id }: UpdateLicenseKey) {
    return this.licenseKeyServiceService.updateLicenseKey(id, payload).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const licenseKeys = [...state.licenseKey.data];
            const index = licenseKeys.findIndex(faq => faq.id === id);
            licenseKeys[index] = result;

            ctx.patchState({
              ...state,
              licenseKey: {
                data: licenseKeys,
                total: state.licenseKey.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('License Key Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateLicenseKeyStatus)
  updateStatus(ctx: StateContext<LicenseKeyStateModel>, { id, status }: UpdateLicenseKeyStatus) {
    return this.licenseKeyServiceService.updateLicenseKeyStatus(id, status).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const licenseKeys = [...state.licenseKey.data];
            const index = licenseKeys.findIndex(faq => faq.id === id);
            licenseKeys[index] = result;

            ctx.patchState({
              ...state,
              licenseKey: {
                data: licenseKeys,
                total: state.licenseKey.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('License Key Status Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteLicenseKey)
  delete(ctx: StateContext<LicenseKeyStateModel>, { id }: DeleteLicenseKey) {
    return this.licenseKeyServiceService.deleteLicenseKey(id).pipe(
      tap({
        next: () => { 
          this.store.dispatch(new GetLicenseKeys({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('License Key Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteAllLicenseKey)
  deleteAll(ctx: StateContext<LicenseKeyStateModel>, { ids }: DeleteAllLicenseKey) {
    return this.licenseKeyServiceService.deleteAllLicenseKey(ids).pipe(
      tap({
        next: () => {
          this.store.dispatch(new GetLicenseKeys({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('License Key Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

}
