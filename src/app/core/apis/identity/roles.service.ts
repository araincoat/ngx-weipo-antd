import { Injectable, inject } from '@angular/core'

import { ApiService, PagedResponse, QueryParams } from '@core/services/api.service'

export interface RoleModel {
  name: string
  isDefault: boolean
  isStatic: boolean
  isPublic: boolean
  concurrencyStamp: string
  id: string
  extraProperties: {}
}

@Injectable({ providedIn: 'root' })
export class RoleService {
  private api = inject(ApiService)

  query(params: QueryParams) {
    return this.api.get<PagedResponse<RoleModel>>('/api/identity/roles', params)
  }
}
