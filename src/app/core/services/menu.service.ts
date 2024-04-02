import { Injectable } from '@angular/core'
import { NzSafeAny } from 'ng-zorro-antd/core/types'
import { BehaviorSubject, Observable } from 'rxjs'

export interface MenuModel {
  [key: string]: NzSafeAny

  /**菜单唯一标识 */
  key?: string
  /**菜单标题 */
  text?: string
  /**菜单图标 */
  icon?: string
  /**菜单路由地址 */
  routePath?: string
  /**菜单链接 */
  url?: string
  /**打开方式 */
  target?: '_blank' | '_self' | '_parent' | '_top'
  /**是否选中 */
  selected?: boolean
  /**是否禁用 */
  disabled?: boolean
  /**子菜单*/
  children?: MenuModel[]
}

@Injectable({ providedIn: 'root' })
export class MenuService {
  private _change$ = new BehaviorSubject<MenuModel[]>([])

  getChange(): Observable<MenuModel[]> {
    return this._change$.asObservable()
  }

  private data: MenuModel[] = []
  get menus(): MenuModel[] {
    return this.data
  }

  add(items: MenuModel[]) {
    this.data = items
    this._change$.next(this.data)
  }

  clear(): void {
    this.data = []
    this._change$.next(this.data)
  }

  find(menus: MenuModel[], target: string): MenuModel | undefined {
    for (const menu of menus) {
      if (menu.key === target) {
        return menu
      }

      if (menu.children && menu.children.length > 0) {
        const foundInChildren = this.find(menu.children, target)
        if (foundInChildren) {
          return foundInChildren
        }
      }
    }

    return undefined // 如果在所有层级中都没有找到，则返回undefined
  }

  findByRoutePath(menus: MenuModel[], target: string): MenuModel | undefined {
    for (const menu of menus) {
      if (menu.routePath === target) {
        return menu
      }

      if (menu.children && menu.children.length > 0) {
        const foundInChildren = this.findByRoutePath(menu.children, target)
        if (foundInChildren) {
          return foundInChildren
        }
      }
    }

    return undefined // 如果在所有层级中都没有找到，则返回undefined
  }
}
