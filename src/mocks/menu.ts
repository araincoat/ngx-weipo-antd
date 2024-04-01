const DATA: any[] = [
  // {
  //   level: 1,
  //   title: '首页',
  //   icon: 'home',
  //   link: '/home',
  //   // externalLink: 'https://www.baidu.com',
  //   // target: '_blank',
  // },
  {
    text: '仪表盘1',
    icon: 'dashboard',
    children: [
      {
        key: 'baidu',
        text: '百度1',
        externalLink: 'https://www.baidu.com',
        children: [
          {
            key: 'baidu2',
            text: '百度2',
            externalLink: 'https://www.baidu.com',
            children: [
              {
                key: 'baidu3',
                text: '百度3',
                externalLink: 'https://www.baidu.com'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 'system management',
    text: '系统管理',
    icon: 'tool',
    children: [
      {
        key: 'roles',
        text: '角色',
        link: '/identity/roles'
      },
      {
        key: 'users',
        text: '用户',
        link: '/identity/users'
      }
    ]
  },
  {
    text: '仪表盘2',
    icon: 'dashboard',
    children: [
      {
        text: 'welcome',
        link: '/welcome'
      }
    ]
  }
]
export const MENUS = {
  '/menus': () => DATA
}
