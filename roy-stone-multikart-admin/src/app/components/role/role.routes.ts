
import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { RoleComponent } from './role.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { EditRoleComponent } from './edit-role/edit-role.component';

export const roleRoutes: Routes = [
  {
    path: "",
    component: RoleComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'role.index'
    }
  },
  {
    path: "create",
    component: CreateRoleComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['role.index', 'role.create']
    }
  },
  {
    path: "edit/:id",
    component: EditRoleComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['role.index', 'role.edit']
    }
  }
];
