import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject
} from '@angular/core'
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'

import { NzCardModule } from 'ng-zorro-antd/card'
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table'
import { NzTagModule } from 'ng-zorro-antd/tag'

import { RoleModel, RoleService } from '@core/apis/identity/roles.service'
import { QueryParams } from '@core/services/api.service'
import { FormSchema } from '@shared/components/schema-form/interface'
import { SchemaFormModule } from '@shared/components/schema-form/schema-form.module'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzIconModule } from 'ng-zorro-antd/icon'

@Component({
  selector: 'app-roles',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NzTableModule,
    NzTagModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    ReactiveFormsModule,
    SchemaFormModule
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.less'
})
export class RolesComponent {
  private cdr = inject(ChangeDetectorRef)
  private fb = inject(NonNullableFormBuilder)
  private roleService = inject(RoleService)

  schema: FormSchema = {
    type: 'object',
    widget: {
      formlyConfig: {
        props: {
          mode: 'search'
        }
      }
    },
    properties: {
      name: {
        type: 'string',
        title: '角色名称',
        widget: {
          formlyConfig: {
            props: {
              placeholder: ' 输入角色名称'
            }
          }
        }
      }
    }
  }

  isCollapse = true
  loading = false
  pageIndex = 1
  pageSize = 10
  sort = []
  total: number = 0
  items: RoleModel[] = []

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.loadDataFromServer(params)
  }

  loadDataFromServer(params: QueryParams) {
    // console.log('start')
    this.loading = true
    this.roleService.query(params).subscribe(data => {
      // console.log('finished', data)
      this.loading = false
      this.total = data.totalCount // mock the total data here
      this.items = data.items
      this.cdr.markForCheck()
    })
  }

  constructor() {}

  search($event: any) {
    $event.pageIndex = this.pageIndex
    $event.pageSize = this.pageSize
    console.log($event)
    // this.loadDataFromServer({} as QueryParams)
  }
}
