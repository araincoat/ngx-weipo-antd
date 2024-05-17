import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core'
import { NavigationEnd, NavigationError, RouteConfigLoadStart, Router, RouterOutlet } from '@angular/router'
import { PreloaderService } from '@core/services/preloader.service'

import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal'

import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, NzModalModule],
  template: `<router-outlet />`
})
export class AppComponent implements OnInit {
  router = inject(Router)
  modalService = inject(NzModalService)
  preloaderService = inject(PreloaderService)

  ngOnInit(): void {
    let configLoad = false
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        configLoad = true
      }
      if (configLoad && event instanceof NavigationError) {
        this.modalService.confirm({
          nzTitle: `提醒`,
          nzContent: environment.production
            ? `应用可能已发布新版本，请点击刷新才能生效。`
            : `无法加载路由：${event.url}`,
          nzCancelDisabled: false,
          nzOkText: '刷新',
          nzCancelText: '忽略',
          nzOnOk: () => location.reload()
        })
      }
      if (event instanceof NavigationEnd) {
        this.preloaderService.donePreloader()
        // donePreloader()
      }
    })
  }
}
