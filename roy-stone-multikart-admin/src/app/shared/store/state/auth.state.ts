import { Injectable } from "@angular/core";
import { Store, State, Selector, Action, StateContext } from "@ngxs/store";
import { Router } from '@angular/router';
import { tap } from "rxjs/operators";
import { AuthService } from "../../services/auth.service";
import { ForgotPassWord, Login, VerifyEmailOtp, UpdatePassword, Logout, AuthClear } from "../action/auth.action";
import { AccountClear } from "../action/account.action";
import { GetBadges } from "../action/sidebar.action";
import { GetSettingOption } from "../action/setting.action";
import { GetNotification } from "../action/notification.action";
import { NotificationService } from "../../services/notification.service";

export interface AuthStateModel {
  email: string;
  token: string | number;
  access_token: string | null;
  permissions: [];
}

@State<AuthStateModel>({
  name: "auth",
  defaults: {
    email: '',
    token: '',
    access_token: '',
    permissions: [],
  },
})
@Injectable()
export class AuthState {
  
  constructor(private store: Store,
    public router: Router,
    private notificationService: NotificationService,
    private authService: AuthService) {}

  @Selector()
  static accessToken(state: AuthStateModel) {
    return state.access_token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel) {
    return !!state.access_token;
  }

  @Selector()
  static email(state: AuthStateModel) {
    return state.email;
  }

  @Selector()
  static token(state: AuthStateModel) {
    return state.token;
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    this.notificationService.notification = false;
    return this.authService.login(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            access_token: result.access_token,
            permissions: [],
          });
          this.store.dispatch(new GetBadges());
          this.store.dispatch(new GetNotification());
          this.store.dispatch(new GetSettingOption());
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(ForgotPassWord)
  forgotPassword(ctx: StateContext<AuthStateModel>, action: ForgotPassWord) {
    this.notificationService.notification = false;
    return this.authService.forgotPassword(action.payload).pipe(
      tap({
        next: () => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            email: action.payload.email
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(VerifyEmailOtp)
  verifyEmail(ctx: StateContext<AuthStateModel>, action: VerifyEmailOtp) {
    this.notificationService.notification = false;
    return this.authService.verifyEmailOtp(action.payload).pipe(
      tap({
        next: () => {
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            token: action.payload.token
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdatePassword)
  updatePassword(ctx: StateContext<AuthStateModel>, action: UpdatePassword) {
    this.notificationService.notification = false;
    return this.authService.updatePassword(action.payload).pipe(
      tap({
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    this.notificationService.notification = false;
    return this.authService.logout().pipe(
      tap({
        next: result => {
          this.store.dispatch(new AuthClear()).subscribe({
            complete: () => {
              this.router.navigate(['/auth/login']);
            }
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(AuthClear)
  authClear(ctx: StateContext<AuthStateModel>){
    ctx.patchState({
      email: '',
      token: '',
      access_token: null,
      permissions: [],
    });
    this.store.dispatch(new AccountClear());
  }

}
