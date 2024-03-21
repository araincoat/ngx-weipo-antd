import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { FooterComponent } from '../../components/footer/footer.component'

@Component({
  selector: 'app-passport',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './passport.component.html',
  styleUrl: './passport.component.less',
  imports: [RouterOutlet, NzLayoutModule, NzIconModule, FooterComponent]
})
export class PassportComponent {}
