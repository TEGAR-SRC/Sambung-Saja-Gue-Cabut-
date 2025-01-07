
import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { WithdrawalComponent } from './withdrawal.component';

export const withdrawalRoutes: Routes = [
  {
    path: '',
    component: WithdrawalComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'withdraw_request.index'
    }
  }
];
