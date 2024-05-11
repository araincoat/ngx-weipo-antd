import { NgTemplateOutlet } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { FormlyModule } from '@ngx-formly/core'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzCardModule } from 'ng-zorro-antd/card'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzModalModule } from 'ng-zorro-antd/modal'

import { SFComponent } from './sf.component'

import { FormlyCardLayoutModule } from './layouts/card/card.module'
import { FormlyCollapseLayoutModule } from './layouts/collapse/collapse.module'
import { FormlyObjectLayoutModule } from './layouts/object/object.module'

import { SFService } from './sf.service'
import { FormlyNzCheckboxModule } from './widgets/checkbox/checkbox.module'
import { FormlyNzDatePickerModule } from './widgets/date/date.module'
import { FormlyWrapper } from './widgets/formly.wrapper'
import { FormlyNzInputModule } from './widgets/input/input.module'
import { FormlyNzRadioModule } from './widgets/radio/radio.module'
import { FormlyNzSelectModule } from './widgets/select/select.module'
import { FormlyNzSwitchModule } from './widgets/switch/switch.module'
import { FormlyNzTextAreaModule } from './widgets/textarea/textarea.module'

@NgModule({
  declarations: [SFComponent, FormlyWrapper],
  imports: [
    ReactiveFormsModule,
    NgTemplateOutlet,
    NzModalModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzCardModule,

    FormlyModule.forChild({
      wrappers: [{ name: 'wrapper', component: FormlyWrapper }]
    }),
    // 导入布局组件
    FormlyObjectLayoutModule,
    FormlyCollapseLayoutModule,
    FormlyCardLayoutModule,
    //导入组件
    FormlyNzCheckboxModule,
    FormlyNzInputModule,
    FormlyNzRadioModule,
    FormlyNzSelectModule,
    FormlyNzSwitchModule,
    FormlyNzTextAreaModule,
    FormlyNzDatePickerModule
  ],
  providers: [SFService],
  exports: [SFComponent]
})
export class SFModule {}
