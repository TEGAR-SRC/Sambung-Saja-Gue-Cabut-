
import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { TagComponent } from './tag.component';
import { CreateTagComponent } from './create-tag/create-tag.component';
import { EditTagComponent } from './edit-tag/edit-tag.component';

export const tagRoutes: Routes = [
  {
    path: "",
    component: TagComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'tag.index'
    }
  },
  {
    path: "create",
    component: CreateTagComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['tag.index', 'tag.create']
    }
  },
  {
    path: "edit/:id",
    component: EditTagComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['tag.index', 'tag.edit']
    }
  },
];
