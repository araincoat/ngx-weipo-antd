import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FieldType, FieldTypeConfig } from '@ngx-formly/core'

import { WrapperProps } from '../formly.wrapper'

interface CheckboxProps extends WrapperProps {
  indeterminate?: boolean
}

// export interface FormlyCheckboxFieldConfig
//   extends FormlyFieldConfig<CheckboxProps> {
//   type: 'checkbox' | Type<FormlyFieldCheckbox>
// }

@Component({
  selector: 'formly-field-checkbox',
  template: `
    <label
      nz-checkbox
      [formControl]="formControl"
      [formlyAttributes]="field"
      [nzIndeterminate]="props.indeterminate && formControl.value == null"
      (ngModelChange)="props.change && props.change(field, $event)"
    >
      {{ props.label }}
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyNzCheckbox extends FieldType<
  FieldTypeConfig<CheckboxProps>
> {
  override defaultOptions = {
    props: {
      indeterminate: true,
      hideLabel: true
    }
  }
}
