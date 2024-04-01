import { HttpInterceptorFn } from '@angular/common/http'
import { EnvironmentProviders, Provider } from '@angular/core'

export interface Environment {
  [key: string]: any

  /**
   * 是否生产环境
   */
  production: boolean
  /**
   * API 配置
   */
  api: ApiConfig
  /**
   * OAuth 配置
   */
  oAuthConfig: OAuthConfig
  /**
   * 定义在 `app.config.ts` 导入的 providers 列表
   */
  providers?: Array<Provider | EnvironmentProviders>
  /**
   * 定义在 `app.config.ts` 导入的 interceptorFns 列表
   */
  interceptorFns?: HttpInterceptorFn[]
}

export interface OAuthConfig {
  issuer?: string
  clientId?: string
  redirectUri?: string
  scope?: string
}

export interface ApiConfig {
  baseUrl: string
}
