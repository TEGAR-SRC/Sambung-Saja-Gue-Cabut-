
import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { ShippingComponent } from './shipping.component';
import { ShippingCountryComponent } from './shipping-country/shipping-country.component';

export const shippingRoutes: Routes = [
  {
    path: "",
    component: ShippingComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'shipping.index'
    }
  },
  {
    path: "edit/:id",
    component: ShippingCountryComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['shipping.index', 'shipping.edit']
    }
  }
];
