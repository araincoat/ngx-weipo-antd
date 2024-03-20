import { ChangeDetectionStrategy, Component } from '@angular/core'

import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzBadgeModule } from 'ng-zorro-antd/badge'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NoticeComponent } from "../notice/notice.component"

@Component({
    selector: 'app-header-widget',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './header-widget.component.html',
    styleUrl: './header-widget.component.less',
    imports: [NzDropDownModule, NzAvatarModule, NzIconModule, NzBadgeModule, NoticeComponent]
})
export class HeaderWidgetComponent {
  loginUser: any = {
    email: 'Administrator',
    avator: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  }

  logout(): void {
    alert('logout')
  }
}
