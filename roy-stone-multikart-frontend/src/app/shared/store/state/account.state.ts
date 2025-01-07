import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs";
import { AccountUser, AccountUserUpdatePassword } from "../../interface/account.interface";
import { AccountService } from "../../services/account.service";
import { NotificationService } from "../../services/notification.service";
import { AccountClear, CreateAddress, DeleteAddress, GetUserDetails, UpdateAddress, UpdateUserPassword, UpdateUserProfile } from "../action/account.action";

export class AccountStateModel {
  user: AccountUser | null;
  permissions: [];
}

@State<AccountStateModel>({
    name: "account",
    defaults: {
      user: null,
      permissions: []
    },
})

@Injectable()
export class AccountState{

  constructor(private store: Store,
    private accountService: AccountService,
    private notificationService: NotificationService) {}

  @Selector()
  static user(state: AccountStateModel) {
    return state.user;
  }

  @Selector()
  static permissions(state: AccountStateModel) {
    return state.permissions;
  }

  @Action(GetUserDetails)
  getUserDetails(ctx: StateContext<AccountStateModel>) {
    return this.accountService.getUserDetails().pipe(
      tap({
        next: result => {
          ctx.patchState({
            user: result,
            permissions: result.permission,
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateUserProfile)
  updateProfile(ctx: StateContext<AccountStateModel>, { payload }: UpdateUserProfile) {
    return this.accountService.updateProfile(payload).pipe(
      tap({
        next: result => {
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            user: result
          });
        },
        complete:() => {
          this.notificationService.showSuccess('Profile Updated Successfully.');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateUserPassword)
  updatePassword(ctx: StateContext<AccountUserUpdatePassword>, { payload }: UpdateUserPassword) {
    return this.accountService.updatePassword(payload).pipe(
      tap({
        complete:() => {
          this.notificationService.showSuccess('Password Updated Successfully.');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(CreateAddress)
  createAddress(ctx: StateContext<AccountStateModel>, action: CreateAddress) {
    return this.accountService.createAddress(action.payload).pipe(
      tap({
        next: result => {
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            user: {
              ...state.user!,
              address: [...state.user?.address!, result],
            }
          });
        },
        complete:() => {
          this.notificationService.showSuccess('Address Added Successfully.');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateAddress)
  updateAddress(ctx: StateContext<AccountStateModel>, action: UpdateAddress) {
    return this.accountService.updateAddress(action.payload, action.id).pipe(
      tap({
        next: result => {
          this.store.dispatch(new GetUserDetails());
        },
        complete:() => {
          this.notificationService.showSuccess('Address Updated Successfully.');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteAddress)
  deleteAddress(ctx: StateContext<AccountStateModel>, action: DeleteAddress) {
    return this.accountService.deleteAddress(action.id).pipe(
      tap({
        next: result => {
          const state = ctx.getState();
          const addresses = state.user?.address?.filter(item => item.id !== action.id);
          ctx.patchState({
            user: {
              ...state.user!,
              address: addresses,
            }
          });
        },
        complete:() => {
          this.notificationService.showSuccess('Address Deleted Successfully.');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(AccountClear)
  accountClear(ctx: StateContext<AccountStateModel>){
    ctx.patchState({
      user: null,
      permissions: []
    });
  }
}
