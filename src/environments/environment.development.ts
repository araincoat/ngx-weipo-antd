import { mockInterceptor, provideMock } from '@ngx-weipo/mock'
import * as mocks from 'src/mocks'
import { Environment } from './interface'

export const environment = {
  production: false,
  oAuth: {
    issuer: 'https://localhost:44375',
    redirectUri: 'http://localhost:4200',
    clientId: 'BookStore_App',
    scope: 'offline_access BookStore'
  },
  api: {
    baseUrl: 'https://localhost:44312'
  },
  interceptorFns: [mockInterceptor],
  providers: [provideMock({}, mocks)]
} as Environment
