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

import { NzLayoutModule } from 'ng-zorro-antd/layout'

import { ThemeOptions, ThemeService } from '@core/services/common/theme.service'
import {
  menu_sidebar_collapsed_width,
  menu_sidebar_width
} from '@shared/consts'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzMenuModule } from 'ng-zorro-antd/menu'
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
    TabComponent
  ]
})
export class DefaultComponent implements OnInit {
  destroyRef = inject(DestroyRef)
  themeService = inject(ThemeService)

  menu_sidebar_width = menu_sidebar_width
  menu_sidebar_collapsed_width = menu_sidebar_collapsed_width

  isCollapsed$ = this.themeService.getIsCollapsed()
  isCollapsed: boolean = false
  themeOptions$ = this.themeService.getOptions()
  theme!: ThemeOptions

  ngOnInit(): void {
    this.themeOptions$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(themeOptions => {
        this.theme = themeOptions
      })
    this.isCollapsed$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(isCollapsed => (this.isCollapsed = isCollapsed))
  }

  changeCollapsed(isCollapsed: boolean): void {
    this.isCollapsed = isCollapsed
    this.themeService.setIsCollapsed(this.isCollapsed)
  }
}
