import { Routes } from '@angular/router'

import { DefaultComponent } from '@shared/layouts/default/default.component'

import { DashboardComponent } from '@pages/default/dashboard/dashboard.component'
import { HomeComponent } from '@pages/default/home/home.component'
import { WelcomeComponent } from '@pages/default/welcome/welcome.component'

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
