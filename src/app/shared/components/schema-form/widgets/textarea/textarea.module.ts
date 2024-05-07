import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'

import { NzInputModule } from 'ng-zorro-antd/input'

import { FormlyFieldTextArea } from './textarea.type'

@NgModule({
  declarations: [FormlyFieldTextArea],
  imports: [
    ReactiveFormsModule,
    NzInputModule,

    FormlyModule.forChild({
      types: [
        {
          name: 'textarea',
          component: FormlyFieldTextArea,
          wrappers: ['wrapper']
        }
      ]
    })
  ]
})
export class FormlyTextAreaModule {}
