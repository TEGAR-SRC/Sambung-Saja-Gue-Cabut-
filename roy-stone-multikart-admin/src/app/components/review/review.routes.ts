
import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { ReviewComponent } from './review.component';

export const reviewRoutes: Routes = [
  {
    path: '',
    component: ReviewComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'review.index'
    }
  }
];
