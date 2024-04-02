import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable, catchError, of } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class AppService {
  private http = inject(HttpClient)

  getAppInfo(): Observable<any> {
    return this.http
      .get<AppInfoModel>(`/app_info`)
      .pipe(catchError(() => of([])))
  }
}

export interface AppModel {
  name: string
  description: string
  version: string
}

export interface AppInfoModel {
  app: AppModel
  menus: any[]
}
