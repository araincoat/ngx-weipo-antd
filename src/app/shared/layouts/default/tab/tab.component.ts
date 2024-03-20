import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Router } from '@angular/router'

import { NzCardModule } from 'ng-zorro-antd/card'
import { silentEvent } from 'ng-zorro-antd/core/util'
import {
  NzContextMenuService,
  NzDropDownModule,
  NzDropdownMenuComponent
} from 'ng-zorro-antd/dropdown'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { NzTabsModule } from 'ng-zorro-antd/tabs'

import { NgStyle } from '@angular/common'
import { TabModel, TabService } from '@core/services/common/tab.service'

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.less',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NzCardModule,
    NzIconModule,
    NzTabsModule,
    NzDropDownModule,
    NzMenuModule,
    NgStyle
  ]
})
export class TabComponent implements OnInit {
  router = inject(Router)
  private tabService = inject(TabService)
  private destroyRef = inject(DestroyRef)
  private cdr = inject(ChangeDetectorRef)
  private nzContextMenuService = inject(NzContextMenuService)

  tabs: TabModel[] = []
  tabs$ = this.tabService.getTabs$()

  get selectedIndex(): number {
    return this.tabService.getSelectedIndex()
  }

  ngOnInit(): void {
    this.tabs$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(tabs => {
      this.tabs = tabs
      this.cdr.markForCheck()
    })
  }

  getTabIndex(path: string) {
    return this.tabs.findIndex(tab => tab.path === path)
  }

  openTab(path: string): void {
    this.router.navigateByUrl(path).finally()
  }

  closeTab(e: MouseEvent, index: number): void {
    silentEvent(e)
    if (this.tabs.length === 1) {
      return
    }
    this.tabService.delTab(index)
  }

  closeOtherTabs(e: MouseEvent, index: number): void {
    silentEvent(e)
    this.tabService.delOtherTabs(index)
  }

  closeLeftTabs(e: MouseEvent, index: number): void {
    silentEvent(e)
    this.tabService.delLeftTabs(index)
  }

  closeRightTabs(e: MouseEvent, index: number): void {
    silentEvent(e)
    this.tabService.delRightTabs(index)
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu)
  }
}
