import { Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { ContentComponent } from './shared/components/layout/content/content.component';
import { content } from './shared/routes/routes';
import { FullComponent } from './shared/components/layout/full/full.component';
import { fullRoutes } from './shared/routes/full.routes';
import { Error404Component } from './errors/error404/error404.component';

export const routes: Routes = [
   {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full",
  },
  {
    path: "auth",
    loadChildren: () => import('./components/auth/auth.routes').then(m => m.auth),
    canActivateChild: [AuthGuard],
  },
  {
    path: "",
    component: ContentComponent,
    children: content,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: FullComponent,
    children: fullRoutes
  },
  {
    path: '**',
    pathMatch: 'full',
    component: Error404Component
  }
];
