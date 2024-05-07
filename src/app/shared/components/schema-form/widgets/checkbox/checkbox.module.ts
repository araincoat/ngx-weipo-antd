import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { FormlyModule } from '@ngx-formly/core'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { FormlyFieldCheckbox } from './checkbox.type'

@NgModule({
  declarations: [FormlyFieldCheckbox],
  imports: [
    ReactiveFormsModule,
    NzCheckboxModule,

    FormlyModule.forChild({
      types: [
        {
          name: 'checkbox',
          component: FormlyFieldCheckbox,
          wrappers: ['wrapper']
        },
        { name: 'boolean', extends: 'checkbox' }
      ]
    })
  ]
})
export class FormlyCheckboxModule {}
