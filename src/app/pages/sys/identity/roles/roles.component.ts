import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core'

import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table'
import { NzTagModule } from 'ng-zorro-antd/tag'

import { RoleModel, RoleService } from '@core/apis/identity/roles.service'
import { QueryParams } from '@core/services/api.service'

@Component({
  selector: 'app-roles',
  standalone: true,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzTableModule, NzTagModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.less'
})
export class RolesComponent implements OnInit {
  loading = false
  pageIndex = 1
  pageSize = 20
  sort = []
  total: number = 1
  items: RoleModel[] = []

  private cdr = inject(ChangeDetectorRef)
  private roleService = inject(RoleService)

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
}
