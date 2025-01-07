
import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { ProductComponent } from './product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

export const productRoutes: Routes = [
  {
    path: "",
    component: ProductComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'product.index'
    }
  },
  {
    path: "create",
    component: CreateProductComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['product.index', 'product.create']
    }
  },
  {
    path: "edit/:id",
    component: EditProductComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['product.index', 'product.edit']
    }
  }
];
