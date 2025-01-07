
import { Routes } from '@angular/router';
import { PermissionGuard } from './../../core/guard/permission.guard';
import { BlogComponent } from './blog.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { BlogCategoryComponent } from './category/blog-category/blog-category.component';
import { EditBlogCategoryComponent } from './category/edit-blog-category/edit-blog-category.component';
import { BlogTagComponent } from './tag/blog-tag/blog-tag.component';
import { CreateBlogTagComponent } from './tag/create-blog-tag/create-blog-tag.component';
import { EditBlogTagComponent } from './tag/edit-blog-tag/edit-blog-tag.component';

export const blogRoutes: Routes = [
  {
    path: "",
    component: BlogComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: 'blog.index'
    }
  },
  {
    path: "create",
    component: CreateBlogComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['blog.index', 'blog.create']
    }
  },
  {
    path: "edit/:id",
    component: EditBlogComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['blog.index', 'blog.edit']
    }
  },
  {
    path: "category",
    component: BlogCategoryComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['category.index']
    }
  },
  {
    path: "category/edit/:id",
    component: EditBlogCategoryComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['category.index', 'category.create']
    }
  },
  {
    path: "tag",
    component: BlogTagComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['tag.index']
    }
  },
  {
    path: "tag/create",
    component: CreateBlogTagComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['tag.create']
    }
  },
  {
    path: "tag/edit/:id",
    component: EditBlogTagComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['tag.edit']
    }
  }
];
