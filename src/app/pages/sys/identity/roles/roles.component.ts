import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core'
import { Router } from '@angular/router'
import { AppService } from '@core/apis/sys/app.service'
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
      <p>
        {{ data | json }}
      </p>
    </div>
  `,
  imports: [SFModule, SchemaTableModule, CommonModule]
})
export class RolesComponent implements OnInit {
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
          label: '角色名称',
          required: true
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

  router = inject(Router)
  cdr = inject(ChangeDetectorRef)
  appService = inject(AppService)
  data: any = {}
  ngOnInit(): void {
    // this.appService.getAppInfo().subscribe(data => {
    //   this.data = data
    //   this.cdr.markForCheck()
    //   console.log(data)
    // })
  }

  route1() {
    this.router.navigateByUrl('/identity/roles/1')
  }

  route2() {
    this.router.navigateByUrl('/identity/roles/2')
  }
  search($event: any) {
    // $event.pageIndex = this.pageIndex
    // $event.pageSize = this.pageSize
    // console.log($event)
    // this.loadDataFromServer({} as QueryParams)
  }
}
