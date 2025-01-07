import { Injectable, ViewChild } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { LoginModalComponent } from '../../shared/components/widgets/modal/login-modal/login-modal.component';
import { AuthService } from '../../shared/services/auth.service';
import { GetUserDetails } from '../../shared/store/action/account.action';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard{

  @ViewChild("loginModal") LoginModal: LoginModalComponent;

  constructor(private store: Store,
    private router: Router,
    private modal: NgbModal,
    private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let is_redirect;

    // Store the attempted URL for redirecting after login
    this.authService.redirectUrl = state.url;

    // Redirect to the login page
    if(!this.store.selectSnapshot(state => state.auth && state.auth.access_token)) {
      this.authService.isLogin = true;
      is_redirect = false
    } else {
      is_redirect = true
    }

    this.store.dispatch(new GetUserDetails()).subscribe({
      complete: () => {
        return true;
      }
    });

    return is_redirect;
  }

  canActivateChild(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    if (!!this.store.selectSnapshot(state => state.auth && state.auth.access_token)) {
      if(this.router.url.startsWith('/account') || this.router.url == '/checkout' || this.router.url == '/compare')
        this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
