import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'

import { NzInputModule } from 'ng-zorro-antd/input'

import { FormlyNzTextArea } from './textarea.type'

@NgModule({
  declarations: [FormlyNzTextArea],
  imports: [
    ReactiveFormsModule,
    NzInputModule,

    FormlyModule.forChild({
      types: [
        {
          name: 'textarea',
          component: FormlyNzTextArea,
          wrappers: ['wrapper']
        }
      ]
    })
  ]
})
export class FormlyNzTextAreaModule {}
