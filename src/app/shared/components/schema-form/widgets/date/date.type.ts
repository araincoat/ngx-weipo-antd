import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FieldType, FieldTypeConfig } from '@ngx-formly/core'

import { WrapperProps } from '../formly.wrapper'

interface DateProps extends WrapperProps {
  mode: 'date' | 'week' | 'month' | 'year'

  range: boolean

  showTime: boolean
  showToday: boolean
  showNow: boolean
}

@Component({
  selector: 'formly-field-date',
  template: `
    @if(range){
    <nz-range-picker
      style="width:100%"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [nzMode]="mode"
    ></nz-range-picker>
    } @else {
    <nz-date-picker
      style="width:100%"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [nzMode]="mode"
      [nzShowTime]="showTime"
      [nzShowToday]="showToday"
      [nzShowNow]="showNow"
    >
    </nz-date-picker>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldDate extends FieldType<FieldTypeConfig<DateProps>> {
  get mode() {
    return this.props.mode ?? 'date'
  }

  get range() {
    return this.props.range ?? true
  }

  get showTime() {
    return this.props.showTime ?? false
  }

  get showToday() {
    return this.props.showToday ?? true
  }

  get showNow() {
    return this.props.showNow ?? true
  }
}
