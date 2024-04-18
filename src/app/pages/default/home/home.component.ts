import { Component } from '@angular/core'

import { SFComponent } from '@shared/components/sf/sf.component'

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
  imports: [SFComponent]
})
export class HomeComponent {}
