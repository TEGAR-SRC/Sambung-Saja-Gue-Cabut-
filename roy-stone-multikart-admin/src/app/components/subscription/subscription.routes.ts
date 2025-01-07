import { Routes } from '@angular/router';
import { PermissionGuard } from '../../core/guard/permission.guard';
import { SubscriptionComponent } from './subscription.component';

export const subscriptionRoutes: Routes = [
  {
    path: "",
    component: SubscriptionComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'subscribe.index'
    }
  },
];
