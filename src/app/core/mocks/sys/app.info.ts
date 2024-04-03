import { AppInfoModel } from '@core/apis/sys/app.service'

const menus: any[] = [
  {
    text: '外部链接',
    icon: 'link',
    children: [
      {
        key: 'baidu',
        text: '百度1',
        url: 'https://www.baidu.com',
        children: [
          {
            key: 'baidu2',
            text: '百度2',
            externalLink: 'https://www.baidu.com',
            children: [
              {
                key: 'baidu3',
                text: '百度3',
                url: 'https://www.baidu.com'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    text: 'dashboard',
    icon: 'dashboard',
    routePath: '/dashboard'
  },
  {
    text: 'welcome',
    icon: 'menu',
    routePath: '/welcome'
  },
  {
    key: 'system management',
    text: '系统管理',
    icon: 'tool',
    children: [
      {
        text: '角色',
        routePath: '/identity/roles'
      },
      {
        text: '用户',
        routePath: '/identity/users'
      }
    ]
  }
]

const appInfo: AppInfoModel = {
  app: {
    name: 'NG-ALAIN Pro',
    description: 'Ng-zorro admin panel front-end framework',
    version: '1.0'
  },
  menus
}

export const AppInfo = {
  '/api/app_info': () => appInfo
}
