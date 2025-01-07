import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { ThemeOptionComponent } from './theme-option.component';

export const themeOptionRoutes: Routes = [
    {
        path: '',
        component: ThemeOptionComponent,
        canActivate: [PermissionGuard],
        data: { 
          permission: 'theme_option.index' 
        }
      }
];
