import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router'
import { NzSafeAny } from 'ng-zorro-antd/core/types'

/** 基础的路由复用策略 */
export class SimpleReuseStrategy implements RouteReuseStrategy {
  static snapshot: { [key: string]: NzSafeAny } = {} // 存储路由快照

  // 这个参数的目的是，在当前页签中点击删除按钮，虽然页签关闭了，但是在路由离开的时候，还是会将已经关闭的页签的组件缓存，
  // 用这个参数来记录，是否需要缓存当前路由
  public static deleteKey: string | null

  // private getRouteUrl(route: ActivatedRouteSnapshot) {
  //   return (route as any)['_routerState'].url.replace(/\//g, '_')
  // }

  public static deleteRouteSnapshot(key: string) {
    SimpleReuseStrategy.deleteKey = key
    delete SimpleReuseStrategy.snapshot[key]
    // console.log('deleteRouteSnapshot', key, SimpleReuseStrategy.snapshot);
  }

  public static deleteAllRouteSnapshot() {
    SimpleReuseStrategy.deleteKey = null
    SimpleReuseStrategy.snapshot = {}
  }

  /**
   * @description: 路由是否允许复用（路由离开时触发）
   * @param {type} route
   * @return: boolean true-允许 false-禁止
   */
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // 返回true表示允许分离（可以依据route数据或其他条件判断）
    if (route.data['key']) return true
    else return false
  }

  /**
   * @description: 存储路由快照（路由离开时触发）
   * @param {type}
   */
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    //console.log(this.getRouteUrl(route))
    // if (SimpleReuseStrategy.deleteKey && SimpleReuseStrategy.deleteKey == this.getRouteUrl(route)) {
    //   //如果待删除是当前路由则不存储快照
    //   SimpleReuseStrategy.deleteKey = null
    //   return
    // }

    const key = route.data['key']
    if (SimpleReuseStrategy.deleteKey === key) {
      SimpleReuseStrategy.deleteKey = null
      delete SimpleReuseStrategy.snapshot[key]
      return
    }

    SimpleReuseStrategy.snapshot[key] = { snapshot: route, handle: handle }
    //console.log('handlers', key, SimpleReuseStrategy.handlers);
  }

  /**
   * @description: 是否允许还原路由快照（进入路由触发）
   * 在缓存中有的都认为允许还原路由
   * @param {type} route
   * @return:boolean true-允许 false-禁止
   */
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const key = route.data['key']
    return !!route.routeConfig && !!SimpleReuseStrategy.snapshot[key]
  }

  /**
   * @description: 获取存储的路由
   * 从缓存中获取快照
   * @param {type} route
   * @return:若无则返回null
   */
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const key = route.data['key']
    if (!route.routeConfig || !SimpleReuseStrategy.snapshot[key]) return null

    return SimpleReuseStrategy.snapshot[key].handle
  }

  /**
   * @description: 同一路由时,复用路由（进入路由触发）
   * @param {type}
   * @return:boolean true-复用 false-不复用
   */
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    // console.log(future.data)

    // 懒加载读取不到data，通过此方法下钻到最下一级路由
    // while (future.firstChild) {
    //   future = future.firstChild;
    // }

    // console.log(future.data)

    return future.routeConfig === curr.routeConfig
  }
}
