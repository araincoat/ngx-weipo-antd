import { Routes } from '@angular/router'


import { RolesComponent } from './identity/roles/roles.component'

export const DEFAULT_ROUTES: Routes = [
  {
    path: 'identity/roles',
    component: RolesComponent,
    data: { key: 'app.identity.roles', text: '角色管理' }
  }
]
