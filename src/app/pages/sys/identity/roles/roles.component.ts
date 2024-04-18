import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core'
import {
  FormRecord,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'

import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzCardModule } from 'ng-zorro-antd/card'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzSpaceModule } from 'ng-zorro-antd/space'
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table'
import { NzTagModule } from 'ng-zorro-antd/tag'

import { RoleModel, RoleService } from '@core/apis/identity/roles.service'
import { QueryParams } from '@core/services/api.service'

@Component({
  selector: 'app-roles',
  standalone: true,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NzTableModule,
    NzTagModule,
    NzCardModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzSpaceModule
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.less'
})
export class RolesComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef)
  private fb = inject(NonNullableFormBuilder)
  private roleService = inject(RoleService)

  queryForm: FormRecord = this.fb.record({
    name: ['', [Validators.required]]
  })


  isCollapse = true
  loading = false
  pageIndex = 1
  pageSize = 20
  sort = []
  total: number = 1
  items: RoleModel[] = []
  querySchema = {
    properties: {
      name: { type: 'string', title: '角色名称' },
      email: {
        type: 'string',
        title: '邮箱',
        format: 'email'
      }
    }
  }

  ngOnInit(): void {}

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log('onQueryParamsChange')
    this.loadDataFromServer(params)
  }

  loadDataFromServer(params: QueryParams) {
    console.log('start')
    this.loading = true
    this.roleService.query(params).subscribe(data => {
      console.log('finished', data)
      this.loading = false
      this.cdr.markForCheck()
      this.total = data.totalCount // mock the total data here
      this.items = data.items
    })
  }

  resetForm(): void {
    this.queryForm.reset()
  }
  constructor() {}
}
