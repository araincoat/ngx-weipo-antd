import { Routes } from '@angular/router'
import { authJWTCanActivate } from '@ngx-weipo/auth'
import { DefaultComponent } from '@shared/layouts/default/default.component'

export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/home' },
      {
        path: '',
        loadChildren: () =>
          import('@pages/default/default.routes').then(m => m.DEFAULT_ROUTES)
      },
      {
        path: '',
        loadChildren: () =>
          import('@pages/sys/sys.routes').then(m => m.DEFAULT_ROUTES)
      }
    ],
    canActivate: [authJWTCanActivate]
  },
  {
    path: '',
    loadChildren: () =>
      import('@pages/passport/passport.routes').then(m => m.PASSPORT_ROUTES)
  },
  { path: '**', redirectTo: '/home' }
]
