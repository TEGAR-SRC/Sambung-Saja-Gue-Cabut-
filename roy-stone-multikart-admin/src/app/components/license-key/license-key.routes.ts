
import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { LicenseKeyComponent } from './license-key.component';
import { CreateLicenseKeyComponent } from './create-license-key/create-license-key.component';
import { EditLicenseKeyComponent } from './edit-license-key/edit-license-key.component';

export const licenseKeyRoutes: Routes = [
  {
    path: '',
    component: LicenseKeyComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'license_key.index'
    }
  },
  {
    path: "create",
    component: CreateLicenseKeyComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['license_key.index', 'license_key.create']
    }
  },
  {
    path: "edit/:id",
    component: EditLicenseKeyComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['license_key.index', 'license_key.edit']
    }
  }
];
