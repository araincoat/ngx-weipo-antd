import { mockInterceptor, provideMock } from '@ngx-weipo/mock'
import * as mocks from 'src/mocks'
import { Environment } from './interface'

export const environment = {
  production: false,
  interceptorFns: [mockInterceptor],
  providers: [provideMock({}, mocks)]
} as Environment
