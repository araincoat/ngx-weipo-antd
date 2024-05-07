import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { FormlyModule } from '@ngx-formly/core'

import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzIconModule } from 'ng-zorro-antd/icon'

import { NgTemplateOutlet } from '@angular/common'
import { FormlyObjectLayout } from './object.layout'

@NgModule({
  declarations: [FormlyObjectLayout],
  imports: [
    NgTemplateOutlet,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,

    FormlyModule.forChild({
      types: [{ name: 'object', component: FormlyObjectLayout }]
    })
  ]
})
export class FormlyObjectLayoutModule {}
