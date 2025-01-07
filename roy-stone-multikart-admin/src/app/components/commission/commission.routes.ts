
import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { CommissionComponent } from './commission.component';

export const commissionRoutes: Routes = [
  {
    path: '',
    component: CommissionComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'commission_history.index'
    }
  }
];
