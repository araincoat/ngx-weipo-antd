import { Routes } from '@angular/router'

import { PassportComponent } from '@shared/layouts/passport/passport.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'

export const PASSPORT_ROUTES: Routes = [
  {
    path: '',
    component: PassportComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  }
]
