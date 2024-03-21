import { DOCUMENT, isPlatformServer } from '@angular/common'
import { Injectable, PLATFORM_ID, inject } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class PreloaderService {
  private readonly doc = inject(DOCUMENT)
  private readonly ssr = isPlatformServer(inject(PLATFORM_ID))

  donePreloader(): void {
    if (this.ssr) return

    const preloader = this.doc.querySelector<HTMLElement>('.preloader')
    if (preloader == null) return

    preloader.addEventListener('transitionend', () => {
      preloader.className += ' hidden'
    })
    preloader.className += ` fade-in`
  }
}
