import { Injectable, inject } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'

import { BehaviorSubject, Observable, filter, tap } from 'rxjs'

import { SimpleReuseStrategy } from '@core/services/common/route-strategy'

export interface TabModel {
  key: string
  text: string
  path: string
}

@Injectable({ providedIn: 'root' })
export class TabService {
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)

  private selectedIndex = 0
  private tabs$ = new BehaviorSubject<TabModel[]>([])
  private tabs: TabModel[] = []

  constructor() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        tap(event => {
          if (event instanceof NavigationEnd) {
            let route = this.activatedRoute.root
            while (route.firstChild) {
              route = route.firstChild
            }

            const snapshot = route.snapshot
            if (snapshot.data['key']) {
              const tab = {
                key: snapshot.data['key'],
                text:
                  snapshot.data['text'] ??
                  snapshot.url.map(segment => segment.path).join('/'),
                path: event.urlAfterRedirects.split('?')[0]
              }

              this.addTab(tab)
            }
          }
        }),
        takeUntilDestroyed()
      )
      .subscribe()
  }

  getSelectedIndex(): number {
    return this.selectedIndex
  }
  getTabs$(): Observable<TabModel[]> {
    return this.tabs$.asObservable()
  }
  setTabs$(tabs: TabModel[]): void {
    this.tabs$.next(tabs)
    // console.log(this.tabs)
  }

  addTab(tab: TabModel) {
    if (!this.tabs.find(value => value.path === tab.path)) {
      this.tabs.push(tab)
    }
    this.selectedIndex = this.tabs.findIndex(value => value.path === tab.path)
    this.setTabs$(this.tabs)
  }
  delTab(index: number) {
    // 在reuse-strategy.ts中删除当前路由的缓存
    SimpleReuseStrategy.deleteRouteSnapshot(this.tabs[index].key)
    // 删除tab标签
    this.tabs.splice(index, 1)
    if (index === this.selectedIndex) {
      //切换当前展示的tab标签索引
      this.selectedIndex = index - 1 < 0 ? 0 : index - 1
      // 跳转到新tab
      this.router.navigateByUrl(this.tabs[this.selectedIndex].path)
    } else if (index < this.selectedIndex) {
      this.selectedIndex = this.selectedIndex - 1
    } else if (index > this.selectedIndex) {
      // 大于当前展示的tab标签，不需要处理
    }
    this.setTabs$(this.tabs)
  }
  delOtherTabs(index: number): void {
    // 要删除的tabs
    const deleteArray = this.tabs.filter(
      tab => tab.key !== this.tabs[index].key
    )
    // 删除其他tab标签
    this.tabs = [this.tabs[index]]
    // 其他的都关闭了，所以索引等于0
    this.selectedIndex = 0
    // 如果选中的标签页不是当前标签页，则需要跳转到当前标签页
    if (this.selectedIndex !== index) {
      this.router.navigateByUrl(this.tabs[this.selectedIndex].path)
    }
    // 在reuse-strategy.ts中删除路由的缓存
    deleteArray.forEach(value => {
      SimpleReuseStrategy.deleteRouteSnapshot(value.key)
    })
    this.setTabs$(this.tabs)
  }
  delLeftTabs(index: number): void {
    // 要删除的tabs
    const deleteArray = this.tabs.filter((tab, tabIndex) => tabIndex < index)
    // 删除左侧的tab标签
    this.tabs.splice(0, index)
    // 左边的tab标签都关闭了，所以索引等于0
    this.selectedIndex = 0
    // 如果当前的标签页被删除了，则需要跳转到选中的标签页
    if (this.selectedIndex < index) {
      this.router.navigateByUrl(this.tabs[this.selectedIndex].path)
    }
    // 在reuse-strategy.ts中删除路由的缓存
    deleteArray.forEach(value => {
      SimpleReuseStrategy.deleteRouteSnapshot(value.key)
    })
    this.setTabs$(this.tabs)
  }
  delRightTabs(index: number): void {
    // 要删除的tabs
    const deleteArray = this.tabs.filter((tab, tabIndex) => tabIndex > index)
    // 删除右侧的tab标签
    this.tabs.length = index + 1
    // 如果当前的标签页被删除了，则需要跳转到选中的标签页
    if (this.selectedIndex > index) {
      this.selectedIndex = index
      this.router.navigateByUrl(this.tabs[this.selectedIndex].path)
    }
    // 在reuse-strategy.ts中删除路由的缓存
    deleteArray.forEach(value => {
      SimpleReuseStrategy.deleteRouteSnapshot(value.key)
    })
    this.setTabs$(this.tabs)
  }

  clearTabs(): void {
    this.tabs = []
    console.log('clearTabs', this.tabs)
    this.setTabs$(this.tabs)
  }
}
