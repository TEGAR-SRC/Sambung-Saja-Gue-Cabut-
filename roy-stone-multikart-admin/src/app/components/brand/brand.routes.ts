
import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { BrandComponent } from './brand.component';
import { CreateBrandComponent } from './create-brand/create-brand.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component';

export const brandRoutes: Routes = [
  {
    path: "",
    component: BrandComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'brand.index'
    }
  },
  {
    path: "create",
    component: CreateBrandComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['brand.index', 'brand.create']
    }
  },
  {
    path: "edit/:id",
    component: EditBrandComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['brand.index', 'brand.edit']
    }
  },
];
