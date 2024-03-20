import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    data: { preload: true },
    loadChildren: () =>
      import('@shared/layouts/default/default.routes').then(
        m => m.DEFAULT_ROUTES
      )
  }
]
