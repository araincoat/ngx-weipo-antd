import { Injectable } from '@angular/core'

import { NzModalService } from 'ng-zorro-antd/modal'

import { SFModalOptions } from './interface'
import { SFComponent } from './sf.component'

@Injectable()
export class SFService {
  constructor(private modalService: NzModalService) {}
  createModal(options: SFModalOptions) {
    const { title, fields, model, onSubmit } = options
    const modalRef = this.modalService.create({
      nzTitle: title,
      nzContent: SFComponent,
      nzFooter: [
        {
          label: '取消',
          onClick: () => {
            modalRef.destroy()
          }
        },
        {
          label: '提交',
          type: 'primary',
          disabled: instance => !instance!.valid,
          onClick: instance => onSubmit?.call(instance, instance?.value)
        }
      ]
    })

    const cmpRef = modalRef.getContentComponentRef()!
    cmpRef.setInput('fields', fields)
    cmpRef.setInput('model', model)

    return modalRef
  }
}
