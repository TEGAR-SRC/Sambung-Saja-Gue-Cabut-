import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { MenuComponent } from './menu.component';

export const MenuRoutes: Routes = [
    {
        path: "",
        component: MenuComponent,
        canActivate: [PermissionGuard],
        data: { 
            permission: 'menu.index' 
        }
    },
    {
        path: "edit/:id",
        component: EditMenuComponent,
        canActivate: [PermissionGuard],
        data: { 
            permission: ['menu.index', 'menu.edit'] 
        }
    }
];
