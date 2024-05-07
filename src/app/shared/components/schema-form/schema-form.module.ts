import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { FormlyModule } from '@ngx-formly/core'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzIconModule } from 'ng-zorro-antd/icon'

import { FormlyCardLayoutModule } from './layouts/card/card.module'
import { FormlyCollapseLayoutModule } from './layouts/collapse/collapse.module'
import { FormlyObjectLayoutModule } from './layouts/object/object.module'
import { SchemaFormComponent } from './schema-form.component'
import { FormlyCheckboxModule } from './widgets/checkbox/checkbox.module'
import { FormlyDateModule } from './widgets/date/date.module'
import { FormlyWrapper } from './widgets/formly.wrapper'
import { FormlyInputModule } from './widgets/input/input.module'
import { FormlyRadioModule } from './widgets/radio/radio.module'
import { FormlyNzSelectModule } from './widgets/select/select.module'
import { FormlySwitchModule } from './widgets/switch/switch.module'
import { FormlyTextAreaModule } from './widgets/textarea/textarea.module'

@NgModule({
  declarations: [SchemaFormComponent, FormlyWrapper],
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,

    FormlyModule.forChild({
      // types: [{ name: 'object', component: FormlyObject }],
      wrappers: [{ name: 'wrapper', component: FormlyWrapper }]
    }),
    // 导入布局组件
    FormlyObjectLayoutModule,
    FormlyCollapseLayoutModule,
    FormlyCardLayoutModule,
    //导入组件
    FormlyCheckboxModule,
    FormlyInputModule,
    FormlyRadioModule,
    FormlyNzSelectModule,
    FormlySwitchModule,
    FormlyTextAreaModule,
    FormlyDateModule
  ],
  exports: [SchemaFormComponent]
})
export class SchemaFormModule {}
