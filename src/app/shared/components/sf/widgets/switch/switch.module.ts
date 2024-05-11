import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { FormlyModule } from '@ngx-formly/core'
import { NzSwitchModule } from 'ng-zorro-antd/switch'
import { FormlyNzSwitch } from './switch.type'

@NgModule({
  declarations: [FormlyNzSwitch],
  imports: [
    ReactiveFormsModule,
    NzSwitchModule,

    FormlyModule.forChild({
      types: [
        {
          name: 'switch',
          component: FormlyNzSwitch,
          wrappers: ['wrapper']
        },
        { name: 'boolean', extends: 'switch' }
      ]
    })
  ]
})
export class FormlyNzSwitchModule {}
