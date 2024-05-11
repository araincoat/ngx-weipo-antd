import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { FormlyModule } from '@ngx-formly/core'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { FormlyNzCheckbox } from './checkbox.type'

@NgModule({
  declarations: [FormlyNzCheckbox],
  imports: [
    ReactiveFormsModule,
    NzCheckboxModule,

    FormlyModule.forChild({
      types: [
        {
          name: 'checkbox',
          component: FormlyNzCheckbox,
          wrappers: ['wrapper']
        },
        { name: 'boolean', extends: 'checkbox' }
      ]
    })
  ]
})
export class FormlyNzCheckboxModule {}
