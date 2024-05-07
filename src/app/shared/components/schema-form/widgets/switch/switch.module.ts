import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { FormlyModule } from '@ngx-formly/core'
import { NzSwitchModule } from 'ng-zorro-antd/switch'
import { FormlyFieldSwitch } from './switch.type'

@NgModule({
  declarations: [FormlyFieldSwitch],
  imports: [
    ReactiveFormsModule,
    NzSwitchModule,

    FormlyModule.forChild({
      types: [
        {
          name: 'switch',
          component: FormlyFieldSwitch,
          wrappers: ['wrapper']
        },
        { name: 'boolean', extends: 'switch' }
      ]
    })
  ]
})
export class FormlySwitchModule {}
