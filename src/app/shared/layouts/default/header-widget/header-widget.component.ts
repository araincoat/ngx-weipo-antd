import { ChangeDetectionStrategy, Component, inject } from '@angular/core'

import { LoginService } from '@services/account/login.service'
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzBadgeModule } from 'ng-zorro-antd/badge'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NoticeComponent } from '../notice/notice.component'

@Component({
  selector: 'app-header-widget',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header-widget.component.html',
  styleUrl: './header-widget.component.less',
  imports: [
    NzDropDownModule,
    NzAvatarModule,
    NzIconModule,
    NzBadgeModule,
    NoticeComponent
  ]
})
export class HeaderWidgetComponent {
  private loginService = inject(LoginService)

  loginUser: any = this.loginService.payload

  logout(): void {
    this.loginService.logout()
  }
}
