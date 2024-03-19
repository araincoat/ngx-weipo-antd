import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

enum ThemeType {
  dark = 'dark',
  default = 'default'
}

export type NavTheme = 'dark' | 'light'
export type ThemeLayout = 'sidemenu' | 'topmenu'
export interface ThemeOptions {
  /** 菜单的主题（暗黑模式，明亮模式） */
  navTheme: NavTheme
  /** Ant Design 的主色调 */
  primaryColor: string
  /** 菜单的布局，值为 sidemenu 菜单显示在左侧，值为 topmenu 菜单显示在顶部 */
  layout: ThemeLayout
  /** 内容的布局 Fixed 为定宽到1200px ，Fluid 为流式布局。 */
  contentWidth: 'Fluid' | 'Fixed'
  /** 固定页头，值为 true 或 false */
  fixedHeader: boolean
  /** 下滑时自动隐藏页头，值为 true 或 false */
  autoHideHeader: boolean
  /** 固定侧边菜单，值为 true 或 false */
  fixSiderbar: boolean
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private options$ = new BehaviorSubject<ThemeOptions>({
    navTheme: 'dark',
    primaryColor: '#1890FF', // Ant Design 的主色调
    layout: 'sidemenu',
    contentWidth: 'Fluid',
    fixedHeader: true, // 固定页头
    autoHideHeader: false, // 下滑时自动隐藏页头
    fixSiderbar: true // 固定菜单
  })
  private isCollapsed$ = new BehaviorSubject<boolean>(false)

  // 获取主题参数
  setOptions(mode: ThemeOptions): void {
    this.options$.next(mode)
  }
  getOptions(): Observable<ThemeOptions> {
    return this.options$.asObservable()
  }

  // 菜单是否折叠
  setIsCollapsed(isCollapsed: boolean): void {
    this.isCollapsed$.next(isCollapsed)
  }
  getIsCollapsed(): Observable<boolean> {
    return this.isCollapsed$.asObservable()
  }

  currentTheme = ThemeType.default;

  private reverseTheme(theme: string): ThemeType {
    return theme === ThemeType.dark ? ThemeType.default : ThemeType.dark
  }

  private removeUnusedTheme(theme: ThemeType): void {
    document.documentElement.classList.remove(theme)
    const removedThemeStyle = document.getElementById(theme)
    if (removedThemeStyle) {
      document.head.removeChild(removedThemeStyle)
    }
  }

  private loadCss(href: string, id: string): Promise<Event> {
    return new Promise((resolve, reject) => {
      const style = document.createElement('link')
      style.rel = 'stylesheet'
      style.href = href
      style.id = id
      style.onload = resolve
      style.onerror = reject
      document.head.append(style)
    })
  }

  public loadTheme(firstLoad = true): Promise<Event> {
    const theme = this.currentTheme
    if (firstLoad) {
      document.documentElement.classList.add(theme)
    }
    return new Promise<Event>((resolve, reject) => {
      this.loadCss(`${theme}.css`, theme).then(
        e => {
          if (!firstLoad) {
            document.documentElement.classList.add(theme)
          }
          this.removeUnusedTheme(this.reverseTheme(theme))
          resolve(e)
        },
        e => reject(e)
      )
    })
  }

  public toggleTheme(): Promise<Event> {
    this.currentTheme = this.reverseTheme(this.currentTheme)
    return this.loadTheme(false)
  }
}
