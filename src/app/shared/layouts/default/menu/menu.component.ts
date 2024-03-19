import { AsyncPipe, NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { NavigationEnd, Router, RouterLink } from '@angular/router'
import { MenuModel, MenuService } from '@core/services/common/menu.service'
import { ThemeOptions, ThemeService } from '@core/services/common/theme.service'

import { NzButtonModule } from 'ng-zorro-antd/button'
import { silentEvent } from 'ng-zorro-antd/core/util'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { filter, tap } from 'rxjs'

@Component({
  selector: 'app-menu',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NzMenuModule,
    NzButtonModule,
    NzIconModule,
    NgTemplateOutlet,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  private cdr = inject(ChangeDetectorRef)
  private destroyRef = inject(DestroyRef)
  private router = inject(Router)
  private themeService = inject(ThemeService)
  private menuService = inject(MenuService)

  isCollapsed$ = this.themeService.getIsCollapsed()
  themeOptions$ = this.themeService.getOptions()
  theme!: ThemeOptions
  menus: MenuModel[] = []

  constructor() {
    this.themeService.getOptions().subscribe(options => {
      this.theme = options
      this.cdr.markForCheck()
    })
    this.menuService
      .getChange()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.menus = data
        this.menus = [
          // {
          //   key: 'system management',
          //   text: '系统管理',
          //   icon: 'tool',
          //   children: [
          //     {
          //       key: 'roles',
          //       text: '角色',
          //       link: '/identity/roles'
          //     },
          //     {
          //       key: 'users',
          //       text: '用户',
          //       link: '/identity/users'
          //     }
          //   ]
          // },
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
          }
        ]
        this.cdr.markForCheck()
      })
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        tap(() => {
          //处理nzSelected
          this.flatMenu(this.menus, this.router.url)
          this.cdr.markForCheck()
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe()
  }

  collapsedEvent() {
    this.isCollapsed$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(isCollapsed => {
          if (!isCollapsed) {
          }
          this.cdr.markForCheck()
        })
      )
      .subscribe()
  }

  flatMenu(menus: MenuModel[], routePath: string): void {
    menus.forEach(menu => {
      menu.selected = false
      // menu['open'] = false
      if (routePath.includes(menu.routePath ?? '')) {
        menu.selected = true
        // menu['open'] = true
      }
      if (!!menu.children && menu.children.length > 0) {
        this.flatMenu(menu.children, routePath)
      }
    })
  }

  changeRoute(e: MouseEvent, menu: MenuModel) {
    if (menu.url) {
      silentEvent(e)
      window.open(menu.url, menu.target ?? '_blank')
      return
    }
    this.router.navigate([menu.routePath])
  }
}
