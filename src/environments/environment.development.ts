import * as mocks from '@core/mocks'
import { mockInterceptor, provideMock } from '@ngx-weipo/mock'
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
  providers: [provideMock({ delay: 1000 }, mocks)]
} as Environment
