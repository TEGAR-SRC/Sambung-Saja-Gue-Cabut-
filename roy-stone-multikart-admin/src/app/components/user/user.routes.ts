
import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { UserComponent } from './user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

export const userRoutes: Routes = [
  {
    path: "",
    component: UserComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'user.index'
    }
  },
  {
    path: "create",
    component: CreateUserComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['user.index', 'user.create']
    }
  },
  {
    path: "edit/:id",
    component: EditUserComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['user.index', 'user.edit']
    }
  }
];
