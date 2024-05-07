import { NgTemplateOutlet } from '@angular/common'
import { NgModule } from '@angular/core'

import { FormlyModule } from '@ngx-formly/core'
import { NzCollapseModule } from 'ng-zorro-antd/collapse'

import { NzGridModule } from 'ng-zorro-antd/grid'
import { FormlyCollapseLayout } from './collapse.layout'

@NgModule({
  declarations: [FormlyCollapseLayout],
  imports: [
    NgTemplateOutlet,
    NzCollapseModule,
    NzGridModule,

    FormlyModule.forChild({
      types: [{ name: 'collapse', component: FormlyCollapseLayout }]
    })
  ]
})
export class FormlyCollapseLayoutModule {}
