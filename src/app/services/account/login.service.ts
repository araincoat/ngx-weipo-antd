import { HttpClient, HttpContext, HttpParams } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Router } from '@angular/router'
import { SimpleReuseStrategy } from '@core/services/common/route-strategy'
import { TabService } from '@core/services/common/tab.service'
import {
  ALLOW_ANONYMOUS,
  AUTH_SERVICE_TOKEN,
  JWTTokenModel
} from '@ngx-weipo/auth'
import { Observable, tap } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class LoginService {
  private router = inject(Router)
  private http = inject(HttpClient)
  private authService = inject(AUTH_SERVICE_TOKEN)
  private tabService = inject(TabService)

  login(loginModel: LoginModel): Observable<any> {
    const { issuer, clientId, scope } = environment.oAuth
    const url = `${issuer}/connect/token`
    const body = new HttpParams()
      .set('username', loginModel.username)
      .set('password', loginModel.password)
      .set('remember', loginModel.remember)
      .set('grant_type', 'password')
      .set('client_id', clientId!)
      .set('scope', scope!)
    const options = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      context: new HttpContext().set(ALLOW_ANONYMOUS, true)
    }

    return this.http.post(url, body, options).pipe(
      tap((res: any) => {
        const token = {
          access_token: res.access_token,
          refresh_token: res.refresh_token,
          expires_at: new Date().valueOf() + res.expires_in * 1000
        }
        this.authService.set(token)
        // var token = this.authService.get<JWTTokenModel>(JWTTokenModel);
        // console.log(token.payload);
        //重新获取应用信息
        this.router.navigate(['/'])
      })
    )
  }

  get payload() {
    return this.authService.get<JWTTokenModel>(JWTTokenModel).payload
  }

  logout() {
    this.authService.clear()
    this.router.navigateByUrl(this.authService.login_url!)
    this.clearTabCache()
  }

  /**
   * 清除缓存&路由复用
   */
  clearTabCache() {
    SimpleReuseStrategy.deleteAllRouteSnapshot()
    this.tabService.clearTabs()
  }
}

export interface LoginModel {
  username: string
  password: string
  remember: boolean
}
