
import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { StoreComponent } from './store.component';
import { CreateStoreComponent } from './create-store/create-store.component';
import { EditStoreComponent } from './edit-store/edit-store.component';

export const storeRoutes: Routes = [
  {
    path: "",
    component: StoreComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'store.index'
    }
  },
  {
    path: "create",
    component: CreateStoreComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['store.index', 'store.create']
    }
  },
  {
    path: "edit/:id",
    component: EditStoreComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['store.index', 'store.edit']
    }
  }
];
