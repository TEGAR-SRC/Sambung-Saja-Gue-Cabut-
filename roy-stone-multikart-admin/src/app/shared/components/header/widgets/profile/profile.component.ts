import { Component, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AccountState } from '../../../../store/state/account.state';
import { Observable } from 'rxjs';
import { AccountUser } from '../../../../interface/account.interface';
import { Logout } from '../../../../store/action/auth.action';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationModalComponent } from '../../../ui/modal/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, ConfirmationModalComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  @Select(AccountState.user) user$: Observable<AccountUser>;

  // @ViewChild("confirmationModal") ConfirmationModal: ConfirmationModalComponent;

  public active: boolean = false;

  constructor(private store: Store) {
  }

  clickHeaderOnMobile(){
    this.active = !this.active
  }

  logout() {
    this.store.dispatch(new Logout());
  }

}
