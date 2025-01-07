
import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { PageComponent } from './page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';

export const pageRoutes: Routes = [
  {
    path: "",
    component: PageComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'page.index'
    }
  },
  {
    path: "create",
    component: CreatePageComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['page.index', 'page.create']
    }
  },
  {
    path: "edit/:id",
    component: EditPageComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['page.index', 'page.edit']
    }
  }
];
