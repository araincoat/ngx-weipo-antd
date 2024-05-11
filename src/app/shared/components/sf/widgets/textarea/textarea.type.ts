import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FieldType, FieldTypeConfig } from '@ngx-formly/core'

import { WrapperProps } from '../formly.wrapper'

interface TextAreaProps extends WrapperProps {
  rows?: number
  autosize?: boolean | { minRows: number; maxRows: number }
}

@Component({
  selector: 'formly-field-textarea',
  template: `
    <textarea
      nz-input
      [placeholder]="props.placeholder"
      [rows]="props.rows"
      [nzAutosize]="props.autosize!"
      [formControl]="formControl"
      [formlyAttributes]="field"
    ></textarea>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyNzTextArea extends FieldType<
  FieldTypeConfig<TextAreaProps>
> {
  override defaultOptions = {
    props: {
      autosize: false
    }
  }
}
