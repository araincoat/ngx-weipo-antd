import { ChangeDetectionStrategy, Component } from '@angular/core'

import { FieldWrapper, FormlyFieldConfig, FormlyFieldProps } from '@ngx-formly/core'

export interface WrapperProps extends FormlyFieldProps {
  hideRequiredMarker?: boolean
  hideLabel?: boolean
  labelWidth?: string | number
  labelAlign?: 'left' | 'right'
  LabelWrap?: boolean
}

@Component({
  selector: 'formly-wrapper',
  template: `
    <nz-form-item>
      @if(props.hideLabel !== true){
      <nz-form-label
        [nzFlex]="props.labelWidth ?? '100px'"
        [nzLabelWrap]="props.LabelWrap ?? true"
        [nzLabelAlign]="props.labelAlign ?? 'right'"
        [nzRequired]="props.required && props.hideRequiredMarker !== true"
        [nzFor]="id"
      >
        {{ !!props.label ? props.label : field.key }}
      </nz-form-label>
      }
      <nz-form-control
        nzFlex="auto"
        [nzValidateStatus]="errorState"
        [nzErrorTip]="errorTpl"
        [nzExtra]="props.description"
      >
        <ng-container #fieldComponent></ng-container>
        <ng-template #errorTpl let-control>
          <formly-validation-message [field]="field" />
        </ng-template>
      </nz-form-control>
    </nz-form-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyWrapper extends FieldWrapper<FormlyFieldConfig<WrapperProps>> {
  get errorState() {
    return this.showError ? 'error' : ''
  }
}
