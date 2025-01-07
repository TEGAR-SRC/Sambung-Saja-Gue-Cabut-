
import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { PointComponent } from './point.component';

export const pointRoutes: Routes = [
  {
    path: "",
    component: PointComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'point.index'
    }
  }
];
