import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

import { FieldType, FieldTypeConfig, FormlyFieldProps } from '@ngx-formly/core'

export interface FormLayoutProps extends FormlyFieldProps {
  /**
   * 一行几列
   */
  columns?: number
  collapseRows?: number
  mode?: 'default' | 'search' | 'edit'
}

/** @ignore */
@Component({
  selector: 'formly-form',
  template: `
    <div nz-row [nzGutter]="{ xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 32 }">
      @for(f of field.fieldGroup; track $index){
      <!-- 自动收起 -->
      @if(!displayNum || ($index < displayNum || !isCollapse)){
      <div nz-col [nzSpan]="f.props!['span'] ?? span">
        <formly-field [field]="f"></formly-field>
      </div>
      } }

      <!-- 搜索模式 -->
      @if(props.mode === 'search'){
      <ng-container *ngTemplateOutlet="searchBtnTpl" />
      }
    </div>

    <!-- 表单按钮 -->
    <ng-template #searchBtnTpl>
      <div nz-col nzFlex="auto" class="text-right m-b-24 p-l-16 p-r-16">
        <button nz-button type="submit" nzType="primary" class="m-r-8">
          <i nz-icon nzType="search"></i> 搜索
        </button>
        <button
          nz-button
          [class]="showCollapse ? 'm-r-8' : ''"
          (click)="reset()"
        >
          <i nz-icon nzTheme="outline" nzType="close-circle"></i>
          重置
        </button>
        @if(showCollapse){
        <a (click)="isCollapse = !isCollapse">
          <span>{{ isCollapse ? '展开' : '收起' }}</span>
          <i nz-icon [nzType]="isCollapse ? 'down' : 'up'"></i> </a
        >}
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyObjectLayout
  extends FieldType<FieldTypeConfig<FormLayoutProps>>
  implements OnInit
{
  isCollapse = true
  span = 24

  get displayNum(): number | undefined {
    if (this.props.collapseRows)
      return (24 / this.span) * this.props.collapseRows! - 1
    else return undefined
  }

  get showCollapse() {
    return !!this.displayNum && this.displayNum < this.field.fieldGroup!.length
  }

  ngOnInit(): void {
    switch (this.props.mode) {
      case 'search':
        this.props.columns = this.props.columns ?? 3
        this.props.collapseRows = this.props.collapseRows ?? 2
        break
      case 'edit':
        this.props.columns = this.props.columns ?? 2
        break
      case 'default':
      default:
        this.props.columns = this.props.columns ?? 1
        break
    }
    if (this.props.columns) {
      this.span = Math.floor(24 / this.props.columns)
    }
  }

  reset() {
    this.formControl.reset()
    // this.options.resetModel!()
  }
}
