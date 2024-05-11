import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { FormlyModule } from '@ngx-formly/core'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'

import { FormlyNzDatePicker } from './date.type'

@NgModule({
  declarations: [FormlyNzDatePicker],
  imports: [
    ReactiveFormsModule,
    NzDatePickerModule,

    FormlyModule.forChild({
      types: [
        {
          name: 'date',
          component: FormlyNzDatePicker,
          wrappers: ['wrapper']
        }
      ]
    })
  ]
})
export class FormlyNzDatePickerModule {}
