import { NgTemplateOutlet } from '@angular/common'
import { NgModule } from '@angular/core'

import { FormlyModule } from '@ngx-formly/core'

import { NzCardModule } from 'ng-zorro-antd/card'
import { NzGridModule } from 'ng-zorro-antd/grid'
import { FormlyCardLayout } from './card.layout'

@NgModule({
  declarations: [FormlyCardLayout],
  imports: [
    NgTemplateOutlet,
    NzCardModule,
    NzGridModule,

    FormlyModule.forChild({
      types: [{ name: 'card', component: FormlyCardLayout }]
    })
  ]
})
export class FormlyCardLayoutModule {}
