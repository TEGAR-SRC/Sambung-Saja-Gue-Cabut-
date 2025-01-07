
import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { RefundComponent } from './refund.component';

export const refundRoutes: Routes = [
  {
    path: '',
    component: RefundComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'refund.index'
    }
  }
];
