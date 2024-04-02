import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { APP_INITIALIZER, ApplicationConfig } from '@angular/core'
import {
  RouteReuseStrategy,
  RouterFeatures,
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling
} from '@angular/router'
// import zh from '@angular/common/locales/zh'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
// import { provideNzI18n, zh_CN } from 'ng-zorro-antd/i18n'

import { jwtInterceptor, provideAuth } from '@ngx-weipo/auth'

import { SimpleReuseStrategy } from '@core/services/common/route-strategy'
import { ThemeService } from '@core/services/common/theme.service'
import { environment } from 'src/environments/environment'
import { routes } from './app.routes'
import { provideNzIcons } from './icons-provider'

// registerLocaleData(zh)

/**路由特性 */
const routerFeatures: RouterFeatures[] = [
  withComponentInputBinding(), // 开启路由参数绑定到组件的输入属性,ng16新增特性
  withInMemoryScrolling({ scrollPositionRestoration: 'top' })
  // withHashLocation() // 使用哈希路由withHashLocation
]

/**应用程序初始化 */
const AppInitializerProvider = [
  provideAuth(), // auth服务
  /**初始化主题样式 */
  {
    provide: APP_INITIALIZER,
    useFactory: (themeService: ThemeService) => () => {
      return themeService.loadTheme()
    },
    deps: [ThemeService],
    multi: true
  }
]

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy }, // 路由复用
    provideRouter(routes, ...routerFeatures),
    provideNzIcons(),
    // provideNzI18n(zh_CN),
    ...AppInitializerProvider,
    provideAnimationsAsync(),

    provideHttpClient(
      withInterceptors([...(environment.interceptorFns || []), jwtInterceptor])
    ),
    ...(environment.providers || [])
  ]
}
