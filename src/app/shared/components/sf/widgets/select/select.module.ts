import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'

import { NzSelectModule } from 'ng-zorro-antd/select'
import { FormlyNzSelect } from './select.type'

@NgModule({
  declarations: [FormlyNzSelect],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzSelectModule,

    FormlySelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'select',
          component: FormlyNzSelect,
          wrappers: ['wrapper']
        },
        { name: 'enum', extends: 'select' }
      ]
    })
  ]
})
export class FormlyNzSelectModule {}
