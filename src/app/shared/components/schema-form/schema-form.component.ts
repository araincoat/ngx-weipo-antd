import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core'
import { FormGroup } from '@angular/forms'

import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core'
import { FormlyJsonschema } from '@ngx-formly/core/json-schema'

import { NzSafeAny } from 'ng-zorro-antd/core/types'
import { FormLayout } from './interface'

@Component({
  selector: 'sf',
  exportAs: 'sf2',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if(fields){
    <form
      nz-form
      [nzLayout]="layout"
      [formGroup]="_form"
      (ngSubmit)="onSubmit()"
    >
      <formly-form
        [form]="_form"
        [fields]="_fields"
        [model]="_model"
      ></formly-form>
    </form>
    }
  `
})
export class SchemaFormComponent implements OnChanges {
  _form = new FormGroup({})
  _options: FormlyFormOptions = {}
  _fields: FormlyFieldConfig[] = []
  _model: NzSafeAny

  @Input() layout: FormLayout = 'horizontal'
  @Input() model?: NzSafeAny = {}
  @Input() schema?: any
  @Input() fields: FormlyFieldConfig = {}

  @Output() formSubmit = new EventEmitter<any>()

  constructor(private formlyJsonschema: FormlyJsonschema) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.schema) {
      this._fields = [this.formlyJsonschema.toFieldConfig(this.schema)]
    } else {
      this._fields = [this.fields]
    }

    this._model = this.model
  }

  onSubmit() {
    if (this._form.valid) {
      this.formSubmit.emit(this.model)
    }
  }

  formValid() {
    return this._form.valid
  }
}
