import { Routes } from '@angular/router'

import { DashboardComponent } from '@pages/dashboard/dashboard.component'
import { HomeComponent } from '@pages/home/home.component'
import { WelcomeComponent } from '@pages/welcome/welcome.component'
import { DefaultComponent } from './default.component'

export const DEFAULT_ROUTES: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/home' },
      {
        path: 'home',
        component: HomeComponent,
        data: { key: 'app.home', text: '首页' }
      },
      {
        path: 'welcome',
        component: WelcomeComponent,
        data: { key: 'app.welcome', text: '欢迎' }
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { key: 'app.dashboard', text: '仪表盘' }
      }
    ]
  }
]

export const WELCOME_ROUTES: Routes = [
  { path: '', component: WelcomeComponent }
]
