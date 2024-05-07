import { FormlyFieldConfig } from '@ngx-formly/core'
import { NzSafeAny } from 'ng-zorro-antd/core/types'

export type FormLayout = 'horizontal' | 'vertical' | 'inline'

export type FormMode = 'default' | 'search' | 'edit'

export interface FormSchemaDefinition {
  [key: string]: FormSchema
}

export interface FormSchema {
  [key: string]: NzSafeAny

  /**
   * 该关键字用于指定 JSON Schema 版本信息，可以省略
   */
  $schema?: string
  /**
   * 表单字段的类型
   * 顶级必须的type必须是object类型，且代表根目录
   */
  type?: 'object' | 'string' | 'integer' | 'number' | 'boolean' | 'array'

  //#region 对象类型
  //==========================================================================
  /**
   * 定义对象中的属性及其Schema。
   */
  properties?: { [key: string]: FormSchema }
  /**
   * 指定对象中必须有的属性
   */
  required?: string[]
  /**
   * 对象中属性的最小数量
   */
  minProperties?: number
  /**
   * 对象中属性的最大数量
   */
  maxProperties?: number
  //==========================================================================
  //#endregion

  //#region 字符串校验
  //==========================================================================
  /**
   * 字符串最小长度，不能为负数
   * `type`="string" 时有效
   */
  minLength?: number
  /**
   * 字符串最大长度，不能为负数
   * `type`="string" 时有效
   */
  maxLength?: number
  /**
   * 匹配正则表达式
   * `type`="string" 时有效
   */
  pattern?: string
  /**
   * 数据格式
   */
  format?: string
  //==========================================================================
  //#endregion

  //#region 数值校验
  //==========================================================================
  /**
   * 数字必须是给定数字（正数）的倍数
   * `type`="integer" | "number" 时有效
   */
  multipleOf?: number
  /**
   * 数值允许的最小值
   * `type`="integer" | "number" 时有效
   */
  minimum?: number
  /**
   * 数值允许的最大值
   * `type`="integer" | "number" 时有效
   */
  maximum?: number
  /**
   * 数值允许的最小值（不包含）
   * `type`="integer" | "number" 时有效
   */
  exclusiveMinimum?: boolean
  /**
   * 数值允许的最大值（不包含）
   * `type`="integer" | "number" 时有效
   */
  exclusiveMaximum?: boolean
  //==========================================================================
  //#endregion

  //#region 数组校验
  //==========================================================================
  /**
   * 数组元素类型
   * `type`="array" 时有效
   */
  items?: Array<FormSchema>
  /**
   * 约束数组最小的元素个数
   * `type`="array" 时有效
   */
  minItems?: number
  /**
   * 约束数组最大的元素个数
   * `type`="array" 时有效
   */
  maxItems?: number
  /**
   * 约束数组元素是否唯一
   * `type`="array" 时有效
   */
  uniqueItems?: boolean
  //==========================================================================
  //#endregion

  //#region 注释
  //==========================================================================
  /**
   * 表单字段的标签
   */
  title?: string
  /**
   * 表单字段的副标题描述
   */
  description?: string
  /**
   * 默认值
   */
  default?: NzSafeAny
  /**
   * 是否只读
   */
  readonly?: boolean
  //==========================================================================
  //#endregion

  //#region 定义片段
  //==========================================================================
  /**
   *
   */
  definitions?: FormSchemaDefinition
  /**
   * 引用其他地方的一个 Schema 片段
   * 例如：{ "$ref": "#/definitions/address" }
   */
  $ref?: string
  //==========================================================================
  //#endregion

  //#region 自定义属性
  //==========================================================================
  widget?: { formlyConfig: FormlyFieldConfig }
  //==========================================================================
  //#endregion
}
