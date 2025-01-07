import { Component, ViewChild } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Logout } from '../../../../store/action/auth.action';
import { AuthState } from '../../../../store/state/auth.state';
import { Observable } from 'rxjs';
import { AccountState } from '../../../../store/state/account.state';
import { AccountUser } from '../../../../interface/account.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../../../widgets/modal/confirmation-modal/confirmation-modal.component';
import { AuthService } from '../../../../services/auth.service';
import { LoginModalComponent } from '../../../widgets/modal/login-modal/login-modal.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule,
            ConfirmationModalComponent, LoginModalComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  public isLogin: boolean;
  
  @ViewChild("loginModal") LoginModal: LoginModalComponent;

  @Select(AccountState.user) user$: Observable<AccountUser>;
  @Select(AuthState.isAuthenticated) isAuthenticated$: Observable<Boolean>;


  constructor(private authService: AuthService, private modal: NgbModal, public route: Router) {
  }

  ngOnInit(){
    this.isAuthenticated$.subscribe(res => {
      this.isLogin = Boolean(res)
    })
  }

  account(){
    this.authService.redirectUrl = '/account/dashboard';
    if(this.isLogin){
      this.route.navigate(['/account/dashboard'])
    } else {
      this.authService.isLogin = true;
    }
  }

  logout() {
    this.modal.open(ConfirmationModalComponent, { centered: true });
  }
}
