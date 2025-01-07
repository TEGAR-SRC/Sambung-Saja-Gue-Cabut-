import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { SettingComponent } from './setting.component';

export const SettingRoutes: Routes = [
    {
        path: "",
        component: SettingComponent,
        canActivate: [PermissionGuard],
        data: { 
          permission: 'setting.index' 
        }
    }
];
