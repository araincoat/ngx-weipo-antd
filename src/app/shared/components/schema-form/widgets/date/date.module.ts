import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { FormlyModule } from '@ngx-formly/core'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'

import { FormlyFieldDate } from './date.type'

@NgModule({
  declarations: [FormlyFieldDate],
  imports: [
    ReactiveFormsModule,
    NzDatePickerModule,

    FormlyModule.forChild({
      types: [
        {
          name: 'date',
          component: FormlyFieldDate,
          wrappers: ['wrapper']
        }
      ]
    })
  ]
})
export class FormlyDateModule {}
