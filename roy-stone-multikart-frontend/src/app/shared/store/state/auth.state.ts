import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { NotificationService } from "../../services/notification.service";
import { AccountClear } from "../action/account.action";
import { AuthClear, ForgotPassword, Login, LoginWithNumber, Logout, Register, UpdatePassword, VerifyNumberOTP, VerifyOTP } from "../action/auth.action";
import { ClearCart } from "../action/cart.action";
import { AddToWishlist } from "../action/wishlist.action";
import { AuthNumberLoginState } from "../../interface/auth.interface";

export interface AuthStateModel {
  email: String;
  number: AuthNumberLoginState | null;
  token: String | Number;
  access_token: String | null;
  permissions: [];
}

@State<AuthStateModel>({
  name: "auth",
  defaults: {
    email: '',
    token: '',
    number: null,
    access_token: '',
    permissions: [],
  },
})
@Injectable()
export class AuthState {

  constructor(private store: Store, public router: Router,
    private notificationService: NotificationService,
    private modalService: NgbModal,
    private authService: AuthService) {}

  @Selector()
  static accessToken(state: AuthStateModel): String | null {
    return state.access_token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): Boolean {
    return !!state.access_token;
  }

  @Selector()
  static email(state: AuthStateModel): String {
    return state.email;
  }

  @Selector()
  static number(state: AuthStateModel): AuthNumberLoginState | null {
    return state.number;
  }

  @Selector()
  static token(state: AuthStateModel): String | Number {
    return state.token;
  }

  @Action(Register)
  register(ctx: StateContext<AuthStateModel>, action: Register) {
    return this.authService.register(action.payload).pipe(
      tap({
        next: result => {
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            access_token: result.access_token,
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
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
        },
        error: err => {
          throw new Error(err?.error?.message);
        },
        complete: () => {
          if(this.authService.redirectUrl){
            this.router.navigateByUrl(this.authService.redirectUrl)
          }
          this.authService.redirectUrl = undefined; 
          if(localStorage.getItem('wishlist')){

            this.store.dispatch(new AddToWishlist({product_id: Number(localStorage.getItem('wishlist'))}))
          }
        }
      })
    );
  }

  @Action(LoginWithNumber)
  loginWithNumber(ctx: StateContext<AuthStateModel>, action: LoginWithNumber) {
    this.notificationService.notification = false;
    return this.authService.loginWithNumber(action.payload).pipe(
      tap({
        next: result => {
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            number: action.payload
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        },
        complete: () => {
          if(localStorage.getItem('wishlist')){
            this.store.dispatch(new AddToWishlist({product_id: localStorage.getItem('wishlist')}))
          }
        }
      })
    );
  }

  @Action(ForgotPassword)
  forgotPassword(ctx: StateContext<AuthStateModel>, action: ForgotPassword) {
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

  @Action(VerifyOTP)
  verifyEmail(ctx: StateContext<AuthStateModel>, action: VerifyOTP) {
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

  @Action(VerifyNumberOTP)
  verifyNumber(ctx: StateContext<AuthStateModel>, action: VerifyNumberOTP) {
    this.notificationService.notification = false;
    return this.authService.verifyNumberOtp(action.payload).pipe(
      tap({
        next: (result) => {
          ctx.patchState({
            access_token: result.access_token,
            permissions: [],
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        },
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
          this.store.dispatch(new AuthClear());
        },
        complete: () => {
          this.modalService.dismissAll();
          this.router.navigate(['/']);
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
    this.authService.redirectUrl = undefined;
    this.store.dispatch(new AccountClear());
    this.store.dispatch(new ClearCart());
  }
}
