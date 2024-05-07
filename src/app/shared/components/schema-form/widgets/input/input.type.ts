import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FieldType, FieldTypeConfig } from '@ngx-formly/core'

import { WrapperProps } from '../formly.wrapper'

interface InputProps extends WrapperProps {}

@Component({
  selector: 'formly-field-input',
  template: `
    @if(props.type !== "number"){
    <input
      nz-input
      [formControl]="formControl"
      [formlyAttributes]="field"
      [type]="props.type || 'text'"
      [placeholder]="props.placeholder"
    />
    } @else{
    <nz-input-number
      style="width:100%"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [nzPlaceHolder]="!!props.placeholder ? props.placeholder : ''"
    />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldInput extends FieldType<FieldTypeConfig<InputProps>> {}
