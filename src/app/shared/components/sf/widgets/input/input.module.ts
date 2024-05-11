import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'

import { NzInputModule } from 'ng-zorro-antd/input'
import { NzInputNumberModule } from 'ng-zorro-antd/input-number'

import { FormlyNzInput } from './input.type'

@NgModule({
  declarations: [FormlyNzInput],
  imports: [
    ReactiveFormsModule,
    NzInputModule,
    NzInputNumberModule,

    FormlyModule.forChild({
      types: [
        {
          name: 'input',
          component: FormlyNzInput,
          wrappers: ['wrapper']
        },
        { name: 'string', extends: 'input' },
        {
          name: 'password',
          extends: 'input',
          defaultOptions: {
            props: {
              type: 'password'
            }
          }
        },
        {
          name: 'number',
          extends: 'input',
          defaultOptions: {
            props: {
              type: 'number'
            }
          }
        },
        {
          name: 'integer',
          extends: 'input',
          defaultOptions: {
            props: {
              type: 'number'
            }
          }
        }
      ]
    })
  ]
})
export class FormlyNzInputModule {}
