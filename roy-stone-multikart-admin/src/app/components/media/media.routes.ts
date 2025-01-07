
import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { MediaComponent } from './media.component';

export const mediaRoutes: Routes = [
  {
    path: "",
    component: MediaComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'attachment.index'
    }
  }
];
