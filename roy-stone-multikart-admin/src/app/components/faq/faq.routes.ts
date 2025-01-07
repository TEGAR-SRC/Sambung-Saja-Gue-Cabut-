import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { CreateFaqComponent } from './create-faq/create-faq.component';
import { EditFaqComponent } from './edit-faq/edit-faq.component';
import { FaqComponent } from './faq.component';

export const faqRoutes: Routes = [
  {
    path: '',
    component: FaqComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'faq.index'
    }
  },
  {
    path: "create",
    component: CreateFaqComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['faq.index', 'faq.create']
    }
  },
  {
    path: "edit/:id",
    component: EditFaqComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['faq.index', 'faq.edit']
    }
  }
];
