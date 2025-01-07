import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { VendorWalletComponent } from './vendor-wallet.component';

export const vendorWalletRoutes: Routes = [
  {
    path: '',
    component: VendorWalletComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'vendor_wallet.index'
    }
  }
];
