import { Routes } from '@angular/router'

import { PassportComponent } from '@shared/layouts/passport/passport.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'

export const PASSPORT_ROUTES: Routes = [
  {
    path: '',
    component: PassportComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { key: 'app.login', text: '登录' }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: { key: 'app.register', text: '注册' }
      }
    ]
  }
]
