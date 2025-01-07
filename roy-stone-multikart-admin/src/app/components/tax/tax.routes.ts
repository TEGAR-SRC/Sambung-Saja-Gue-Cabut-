
import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { TaxComponent } from './tax.component';
import { CreateTaxComponent } from './create-tax/create-tax.component';
import { EditTaxComponent } from './edit-tax/edit-tax.component';

export const taxRoutes: Routes = [
  {
    path: "",
    component: TaxComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'tax.index'
    }
  },
  {
    path: "create",
    component: CreateTaxComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['tax.index', 'tax.create']
    }
  },
  {
    path: "edit/:id",
    component: EditTaxComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['tax.index', 'tax.edit']
    }
  }
];
