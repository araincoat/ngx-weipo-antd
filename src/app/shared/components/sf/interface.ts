import { FormlyFieldConfig } from '@ngx-formly/core'
import { NzSafeAny } from 'ng-zorro-antd/core/types'
import { Observable } from 'rxjs'

export type FormLayout = 'horizontal' | 'vertical' | 'inline'

export type OnClickCallback = (
  value: any
) =>
  | (false | void | {})
  | Promise<false | void | {}>
  | Observable<false | void | {}>
export interface SFModalOptions {
  title?: string
  fields?: FormlyFieldConfig
  model?: NzSafeAny
  onSubmit?: OnClickCallback
}
