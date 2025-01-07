
import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { CurrencyComponent } from './currency.component';
import { CreateCurrencyComponent } from './create-currency/create-currency.component';
import { EditCurrencyComponent } from './edit-currency/edit-currency.component';

export const currencyRoutes: Routes = [
  {
    path: "",
    component: CurrencyComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'currency.index'
    }
  },
  {
    path: "create",
    component: CreateCurrencyComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['currency.index', 'currency.create']
    }
  },
  {
    path: "edit/:id",
    component: EditCurrencyComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['currency.index', 'currency.edit']
    }
  }
];
