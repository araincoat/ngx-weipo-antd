import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormlyFieldConfig } from '@ngx-formly/core'

import { SchemaTableColumn } from '@shared/components/schema-table/interface'
import { SchemaTableModule } from '@shared/components/schema-table/schema-table.module'
import { SFModule } from '@shared/components/sf/sf.module'

@Component({
  selector: 'app-roles',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="inner-content">
      <sf [fields]="fields" (formSubmit)="search($event)"></sf>

      <st title="角色管理" [columns]="columns">
        <ng-template #nameTpl>123 </ng-template>
      </st>
    </div>
  `,
  imports: [SFModule, SchemaTableModule]
})
export class RolesComponent {
  fields: FormlyFieldConfig = {
    type: 'object',
    props: {
      mode: 'search'
    },
    fieldGroup: [
      {
        key: 'name',
        type: 'string',
        props: {
          label: '角色名称'
        }
      }
    ]
  }

  columns: SchemaTableColumn[] = [
    {
      title: '角色名称',
      index: 'name',
      render: 'nameTpl'
    },
    {
      title: '操作'
    }
  ]

  // onQueryParamsChange(params: NzTableQueryParams): void {
  //   this.loadDataFromServer(params)
  // }

  // loadDataFromServer(params: QueryParams) {
  //   // console.log('start')
  //   this.loading = true
  //   this.roleService.query(params).subscribe(data => {
  //     // console.log('finished', data)
  //     this.loading = false
  //     this.total = data.totalCount // mock the total data here
  //     this.items = data.items
  //     this.cdr.markForCheck()
  //   })
  // }

  constructor() {}

  search($event: any) {
    // $event.pageIndex = this.pageIndex
    // $event.pageSize = this.pageSize
    // console.log($event)
    // this.loadDataFromServer({} as QueryParams)
  }
}
