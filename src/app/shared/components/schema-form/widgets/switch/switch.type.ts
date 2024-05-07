import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core'
import { FieldType, FieldTypeConfig } from '@ngx-formly/core'

import { WrapperProps } from '../formly.wrapper'

interface SwitchProps extends WrapperProps {
  size: 'small' | 'default'
  checkedChildren: string | TemplateRef<void> | null
  unCheckedChildren: string | TemplateRef<void> | null
}

// export interface FormlySwitchFieldConfig
//   extends FormlyFieldConfig<SwitchProps> {
//   type: 'switch' | Type<FormlyFieldSwitch>
// }

@Component({
  selector: 'formly-field-switch',
  template: `
    <nz-switch
      [formControl]="formControl"
      [formlyAttributes]="field"
      [nzSize]="props.size"
      [nzCheckedChildren]="props.checkedChildren"
      [nzUnCheckedChildren]="props.unCheckedChildren"
    ></nz-switch>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldSwitch extends FieldType<
  FieldTypeConfig<SwitchProps>
> {}
