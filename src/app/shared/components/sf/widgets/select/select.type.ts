import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FieldType, FieldTypeConfig } from '@ngx-formly/core'

import { FormlyFieldSelectProps } from '@ngx-formly/core/select'
import { WrapperProps } from '../formly.wrapper'

interface SelectProps extends WrapperProps, FormlyFieldSelectProps {
  multiple?: boolean
}

// export interface FormlySelectFieldConfig
//   extends FormlyFieldConfig<SelectProps> {
//   type: 'select' | Type<FormlyFieldSelect>
// }

@Component({
  selector: 'formly-field-select',
  template: `
    <nz-select
      [formControl]="formControl"
      [formlyAttributes]="field"
      [class.ng-dirty]="showError"
      [nzPlaceHolder]="props.placeholder!"
      [nzMode]="props.multiple ? 'multiple' : 'default'"
      (ngModelChange)="props.change && props.change(field, $event)"
    >
      @for(item of props.options | formlySelectOptions : field | async; track
      $index){
      <ng-container>
        @if(item.group){
        <nz-option-group [nzLabel]="item.label">
          @for(child of item.group; track $index){
          <nz-option
            [nzValue]="child.value"
            [nzDisabled]="child.disabled"
            [nzLabel]="child.label"
          >
          </nz-option>
          }
        </nz-option-group>
        } @else{
        <nz-option
          [nzValue]="item.value"
          [nzDisabled]="item.disabled"
          [nzLabel]="item.label"
        ></nz-option>
        }
      </ng-container>
      }
    </nz-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyNzSelect extends FieldType<
  FieldTypeConfig<SelectProps>
> {}
