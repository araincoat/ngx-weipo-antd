import { Component } from '@angular/core'
import { NzIconModule } from 'ng-zorro-antd/icon'

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NzIconModule],

  templateUrl: './footer.component.html'
})
export class FooterComponent {}
