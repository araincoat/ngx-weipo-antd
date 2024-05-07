import { Routes } from '@angular/router'

import { DashboardComponent } from '@pages/default/dashboard/dashboard.component'
import { HomeComponent } from '@pages/default/home/home.component'
import { WelcomeComponent } from '@pages/default/welcome/welcome.component'
import { TestComponent } from './test/test.component'

export const DEFAULT_ROUTES: Routes = [
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
  },
  {
    path: 'test',
    component: TestComponent,
    data: { key: 'app.test', text: '测试' }
  },
]
