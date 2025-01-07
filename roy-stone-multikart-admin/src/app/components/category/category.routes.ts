
import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { CategoryComponent } from './category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

export const categoryRoutes: Routes = [
  {
    path: "",
    component: CategoryComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'category.index'
    }
  },
  {
    path: "edit/:id",
    component: EditCategoryComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['category.index', 'category.edit']
    }
  }
];
