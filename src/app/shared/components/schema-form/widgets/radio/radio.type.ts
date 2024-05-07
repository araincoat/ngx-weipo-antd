import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FieldType, FieldTypeConfig } from '@ngx-formly/core'

import { WrapperProps } from '../formly.wrapper'

interface RadioProps extends WrapperProps {}

// export interface FormlyRadioFieldConfig extends FormlyFieldConfig<RadioProps> {
//   type: 'radio' | Type<FormlyFieldRadio>
// }

@Component({
  selector: 'formly-field-radio',
  template: `
    <nz-radio-group
      [formControl]="formControl"
      (ngModelChange)="props.change && props.change(field, $event)"
    >
      @for (option of props.options | formlySelectOptions : field | async; track
      $index) {
      <label nz-radio [nzValue]="option.value" [nzDisabled]="option.disabled">
        {{ option.label }}
      </label>
      }
    </nz-radio-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldRadio extends FieldType<FieldTypeConfig<RadioProps>> {}
