
import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { WalletComponent } from './wallet.component';

export const walletRoutes: Routes = [
  {
    path: "",
    component: WalletComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'wallet.index'
    }
  }
];
