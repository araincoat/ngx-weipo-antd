import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core'

import { FieldType, FieldTypeConfig, FormlyFieldProps } from '@ngx-formly/core'
import { OnClickCallback } from '../../interface'

export interface FormLayoutProps extends FormlyFieldProps {
  /**
   * 一行几列
   */
  columns?: number
  collapseRows?: number
  mode?: 'default' | 'search' | 'edit'
  loading: boolean
  formSubmit: OnClickCallback
}

/** @ignore */
@Component({
  selector: 'formly-form',
  template: `
    @if(props.mode === 'search'){
    <nz-card class="m-b-12" nzHoverable [nzBodyStyle]="{ 'padding-bottom': 0 }">
      <ng-container [ngTemplateOutlet]="objectTpl" />
    </nz-card>
    } @else{
    <ng-container [ngTemplateOutlet]="objectTpl" />
    }

    <ng-template #objectTpl>
      <div
        nz-row
        [nzGutter]="{ xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 32 }"
      >
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
        } @else if(props.mode === "edit"){
        <ng-container *ngTemplateOutlet="editBtnTpl" />
        }
      </div>
    </ng-template>
    <!-- 查询表单按钮 -->
    <ng-template #searchBtnTpl>
      <div nz-col nzFlex="auto" class="text-right m-b-24 p-l-16 p-r-16">
        <button
          nz-button
          class="m-r-8"
          nzType="primary"
          [disabled]="!form.valid"
          [nzLoading]="props.loading"
          (click)="onButtonClick(props.formSubmit)"
        >
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
    <!-- 编辑表单按钮 -->
    <ng-template #editBtnTpl>
      <div nz-col nzFlex="24" class="text-center p-16">
        <button
          nz-button
          class="m-r-8"
          type="submit"
          nzType="primary"
          [disabled]="!form.valid"
          [nzLoading]="props.loading"
          (click)="onButtonClick(props.formSubmit)"
        >
          提交
        </button>
        <button
          nz-button
          [class]="showCollapse ? 'm-r-8' : ''"
          (click)="reset()"
        >
          重置
        </button>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyObjectLayout
  extends FieldType<FieldTypeConfig<FormLayoutProps>>
  implements OnInit
{
  cdr = inject(ChangeDetectorRef)
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

  async onButtonClick(callback?: OnClickCallback): Promise<void> {
    this.props.loading = true
    try {
      await callback?.call(this, this.model)
    } catch (error) {
      console.error(error)
    } finally {
      this.props.loading = false
      this.cdr.markForCheck()
    }
  }
}
