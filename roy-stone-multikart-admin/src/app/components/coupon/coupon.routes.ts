
import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { CouponComponent } from './coupon.component';
import { CreateCouponComponent } from './create-coupon/create-coupon.component';
import { EditCouponComponent } from './edit-coupon/edit-coupon.component';

export const couponRoutes: Routes = [
  {
    path: "",
    component: CouponComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'coupon.index'
    }
  },
  {
    path: "create",
    component: CreateCouponComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['coupon.index', 'coupon.create']
    }
  },
  {
    path: "edit/:id",
    component: EditCouponComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['coupon.index', 'coupon.edit']
    }
  }
];
