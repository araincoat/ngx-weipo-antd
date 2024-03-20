import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'

import { NzCardModule } from 'ng-zorro-antd/card'
import { NzListModule } from 'ng-zorro-antd/list'
import { NzTabsModule } from 'ng-zorro-antd/tabs'
import { NzTagModule } from 'ng-zorro-antd/tag'
import { NzTypographyModule } from 'ng-zorro-antd/typography'

@Component({
  selector: 'app-notice',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NzCardModule,
    NzTabsModule,
    NgTemplateOutlet,
    NzListModule,
    NzTypographyModule,
    NzTagModule
  ],
  templateUrl: './notice.component.html',
  styleUrl: './notice.component.less'
})
export class NoticeComponent {
  notices = Array(0).fill(0);
}
