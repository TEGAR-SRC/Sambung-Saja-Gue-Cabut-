
import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { AttributeComponent } from './attribute.component';
import { CreateAttributeComponent } from './create-attribute/create-attribute.component';
import { EditAttributeComponent } from './edit-attribute/edit-attribute.component';

export const attributeRoutes: Routes = [
  {
    path: "",
    component: AttributeComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'attribute.index'
    }
  },
  {
    path: "create",
    component: CreateAttributeComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['attribute.index', 'attribute.create']
    }
  },
  {
    path: "edit/:id",
    component: EditAttributeComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['attribute.index', 'attribute.edit']
    }
  }
];
