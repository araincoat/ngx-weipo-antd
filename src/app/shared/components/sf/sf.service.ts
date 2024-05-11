import { Injectable } from '@angular/core'

import { isPromise } from 'ng-zorro-antd/core/util'
import { NzModalService } from 'ng-zorro-antd/modal'

import { SFModalOptions } from './interface'
import { SFComponent } from './sf.component'

@Injectable()
export class SFService {
  constructor(private modalService: NzModalService) {}

  createModal(options: SFModalOptions) {
    const { title, fields, onSubmit } = options

    const _onSubmit = isPromise(onSubmit)
      ? onSubmit
      : () => new Promise(() => onSubmit?.apply(this))

    const modal = this.modalService.create({
      nzTitle: title,
      nzContent: SFComponent,
      nzFooter: [
        {
          label: '取消',
          onClick: () => {
            modal.destroy()
          }
        },
        {
          label: '提交',
          type: 'primary',
          autoLoading: true,
          disabled: contentComponentInstance => {
            return !contentComponentInstance!.valid
          },
          onClick: _onSubmit
        }
      ]
    })

    const cmpRef = modal.getContentComponentRef()!
    cmpRef.setInput('fields', fields)

    return modal
  }
}
