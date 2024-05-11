import { FormlyFieldConfig } from '@ngx-formly/core'
import { Observable } from 'rxjs'

export type FormLayout = 'horizontal' | 'vertical' | 'inline'

export type OnClickCallback = () =>
  | (false | void | {})
  | Promise<false | void | {}>
  | Observable<false | void | {}>
export interface SFModalOptions {
  title?: string
  fields?: FormlyFieldConfig
  onSubmit?: OnClickCallback
}
