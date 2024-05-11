import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'

import { NzRadioModule } from 'ng-zorro-antd/radio'
import { FormlyNzRadio } from './radio.type'

@NgModule({
  declarations: [FormlyNzRadio],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzRadioModule,

    FormlySelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'radio',
          component: FormlyNzRadio,
          wrappers: ['wrapper']
        }
      ]
    })
  ]
})
export class FormlyNzRadioModule {}
