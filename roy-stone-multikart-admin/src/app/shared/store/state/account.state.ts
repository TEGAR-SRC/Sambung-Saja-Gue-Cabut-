import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetUserDetails, UpdateUserProfile, UpdateUserPassword, AccountClear, updateStoreDetails } from "../action/account.action";
import { AccountUser } from "./../../interface/account.interface";
import { AccountService } from "../../services/account.service";
import { NotificationService } from "../../services/notification.service";
import { Permission } from "../../interface/role.interface";

export class AccountStateModel {
  user: AccountUser | null |any;
  permissions: Permission[];
  roleName: string | null;
}

@State<AccountStateModel>({
  name: "account",
  defaults: {
    user: null,
    permissions: [],
    roleName: null
  },
})
@Injectable()
export class AccountState {

  constructor(private accountService: AccountService,
      private notificationService: NotificationService, 
      public router: Router) {}

  @Selector()
  static user(state: AccountStateModel) {
    return state.user;
  }

  @Selector()
  static permissions(state: AccountStateModel) {
    return state.permissions;
  }

  @Selector()
  static getRoleName(state: AccountStateModel) {
    return state.roleName;
  }

  @Action(GetUserDetails)
  getUserDetails(ctx: StateContext<AccountStateModel>) {
    return this.accountService.getUserDetails().pipe(
      tap({
        next: result => { 
          ctx.patchState({
            user: result,
            permissions: result.permission,
            roleName: result.role.name
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
          this.notificationService.showSuccess('Profile Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })  
    );
  }

  @Action(UpdateUserPassword)
  updatePassword(ctx: StateContext<AccountStateModel>, { payload }: UpdateUserPassword) {
    return this.accountService.updatePassword(payload).pipe(
      tap({
        complete:() => {
          this.notificationService.showSuccess('Password Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(updateStoreDetails)
  updateStoreDetails(ctx: StateContext<AccountStateModel>, { payload }: updateStoreDetails) {
    return this.accountService.updateStore(payload).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          const updateStore = { ...state.user.store, store: result };
          ctx.patchState({ ...state, user: updateStore });
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

  @Action(AccountClear)
  accountClear(ctx: StateContext<AccountStateModel>){
    ctx.patchState({
      user: null,
      permissions: [],
      roleName: null
    });
  }

}