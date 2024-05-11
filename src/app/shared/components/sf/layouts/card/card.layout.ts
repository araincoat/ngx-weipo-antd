import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

import { FieldType, FieldTypeConfig, FormlyFieldProps } from '@ngx-formly/core'

export interface FormCardProps extends FormlyFieldProps {
  title?: string
  columns?: number
}

/** @ignore */
@Component({
  selector: 'formly-card',
  template: `
    <nz-card [nzTitle]="props.title" [nzBordered]="false">
      <div
        nz-row
        [nzGutter]="{ xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 32 }"
      >
        @for(f of field.fieldGroup; track $index) {
        <div nz-col [nzSpan]="f.props!['span'] ?? cardSpan">
          <formly-field [field]="f"></formly-field>
        </div>
        }
      </div>
    </nz-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyCardLayout
  extends FieldType<FieldTypeConfig<FormCardProps>>
  implements OnInit
{
  cardSpan = 24

  ngOnInit(): void {
    console.log('cardSpan', this.cardSpan)

    this.props.columns =
      this.props.columns ?? this.field.parent?.props?.['columns']
    if (this.props.columns) {
      this.cardSpan = Math.floor(24 / this.props.columns)
    }
  }
}
