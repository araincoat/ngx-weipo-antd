import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

import { FieldType, FieldTypeConfig, FormlyFieldProps } from '@ngx-formly/core'

export interface FormCollapseProps extends FormlyFieldProps {
  header?: string
  active?: boolean
  collapseSpan?: number
}

/** @ignore */
@Component({
  selector: 'formly-collapse',
  template: `
    <nz-collapse class="m-b-24">
      <nz-collapse-panel [nzHeader]="props.header" [nzActive]="props.active">
        <div
          nz-row
          [nzGutter]="{ xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 32 }"
        >
          @for(f of field.fieldGroup; track $index) {
          <div nz-col [nzSpan]="f.props!['span'] ?? props.collapseSpan">
            <formly-field [field]="f"></formly-field>
          </div>
          }
        </div>
      </nz-collapse-panel>
    </nz-collapse>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyCollapseLayout
  extends FieldType<FieldTypeConfig<FormCollapseProps>>
  implements OnInit
{
  override defaultOptions = {
    props: {
      active: true,
      collapseSpan: 12
    }
  }

  ngOnInit(): void {}
}
