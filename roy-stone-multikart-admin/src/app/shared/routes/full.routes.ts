import { Routes } from "@angular/router";

export const fullRoutes: Routes = [
   {
      path: 'error',
      loadChildren: () => import('../../errors/error.routes').then(r => r.errorRoutes)
   }
]