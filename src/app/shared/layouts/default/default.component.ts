import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { RouterModule, RouterOutlet } from '@angular/router'

import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzMenuModule } from 'ng-zorro-antd/menu'

import { ThemeOptions, ThemeService } from '@core/services/theme.service'
import {
  menu_sidebar_collapsed_width,
  menu_sidebar_width
} from '@shared/consts'

import { AppService } from '@core/apis/sys/app.service'
import { MenuService } from '@core/services/menu.service'
import { FooterComponent } from '../../components/footer/footer.component'
import { HeaderWidgetComponent } from './header-widget/header-widget.component'
import { MenuComponent } from './menu/menu.component'
import { TabComponent } from './tab/tab.component'

@Component({
  selector: 'app-default',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './default.component.html',
  styleUrl: './default.component.less',
  imports: [
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    RouterModule,
    RouterOutlet,
    NgTemplateOutlet,
    NgStyle,
    NgClass,
    MenuComponent,
    TabComponent,
    HeaderWidgetComponent,
    FooterComponent
  ]
})
export class DefaultComponent implements OnInit {
  destroyRef = inject(DestroyRef)
  themeService = inject(ThemeService)
  private appService = inject(AppService)
  private menuService = inject(MenuService)

  menu_sidebar_width = menu_sidebar_width
  menu_sidebar_collapsed_width = menu_sidebar_collapsed_width

  isCollapsed$ = this.themeService.getIsCollapsed()
  isCollapsed: boolean = false
  themeOptions$ = this.themeService.getOptions()
  theme!: ThemeOptions

  ngOnInit(): void {
    // console.log('ngOnInit')
    this.themeOptions$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(themeOptions => {
        this.theme = themeOptions
      })
    this.isCollapsed$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(isCollapsed => (this.isCollapsed = isCollapsed))

    this.appService
      .getAppInfo()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        // console.log(data)
        this.menuService.add(data.menus)
      })
  }

  changeCollapsed(isCollapsed: boolean): void {
    this.isCollapsed = isCollapsed
    this.themeService.setIsCollapsed(this.isCollapsed)
  }
}
