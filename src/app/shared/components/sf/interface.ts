import { FormlyFieldConfig } from '@ngx-formly/core'
import { NzButtonType } from 'ng-zorro-antd/button'
import { NzSafeAny } from 'ng-zorro-antd/core/types'

export type FormLayout = 'horizontal' | 'vertical' | 'inline'

export type OnClickCallback = (
  value: any
) => (false | void | {}) | Promise<false | void | {}>

export interface SFModalOptions {
  title?: string
  fields?: FormlyFieldConfig
  model?: NzSafeAny
  onSubmit?: OnClickCallback
}

export interface SFButtonOptions {
  label: string
  type?: NzButtonType
  onClick?: OnClickCallback
}
