
import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { OrderComponent } from './order.component';
import { DetailsComponent } from './details/details.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const orderRoutes: Routes = [
  {
    path: '',
    component: OrderComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'order.index'
    }
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'order.index'
    }
  },
  {
    path: 'create',
    component: CreateOrderComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['order.index', 'order.create']
    }
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['order.index', 'order.create']
    }
  }
];
