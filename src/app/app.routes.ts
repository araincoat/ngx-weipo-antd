import { Routes } from '@angular/router'

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: '',
    loadChildren: () =>
      import('@pages/default/default.routes').then(m => m.DEFAULT_ROUTES)
  },
  {
    path: '',
    loadChildren: () =>
      import('@pages/passport/passport.routes').then(m => m.PASSPORT_ROUTES)
  },
  { path: '**', redirectTo: '/home' }
]
