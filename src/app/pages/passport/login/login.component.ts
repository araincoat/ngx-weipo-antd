import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject
} from '@angular/core'
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { Router } from '@angular/router'

import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzMessageService } from 'ng-zorro-antd/message'
import { NzTabsModule } from 'ng-zorro-antd/tabs'

import { LoginService } from '@services/account/login.service'
import { catchError, finalize, tap, throwError } from 'rxjs'

@Component({
  selector: 'app-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    NzTabsModule,
    NzFormModule,
    NzButtonModule,
    NzCheckboxModule,
    NzInputModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef)
  private router = inject(Router)
  private fb = inject(NonNullableFormBuilder)
  private destroyRef = inject(DestroyRef)
  private messageService = inject(NzMessageService)
  private loginService = inject(LoginService)

  tabSelectedIndex = 0
  loading = false
  validateForm!: FormGroup

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: ['admin', [Validators.required]],
      password: ['1q2w3E*', [Validators.required]],
      mobile: ['', [Validators.required]],
      captcha: ['', [Validators.required]],
      remember: [true]
    })
  }

  onTabSelectedIndexChange(index: number): void {
    this.tabSelectedIndex = index
  }

  login(): void {
    if (this.tabSelectedIndex === 0) {
      //账户密码登录
      const { username, password } = this.validateForm.controls
      username.markAsDirty()
      username.updateValueAndValidity()
      password.markAsDirty()
      password.updateValueAndValidity()
      if (username.invalid || password.invalid) {
        return
      }
    } else if (this.tabSelectedIndex === 1) {
      //手机号登录
      const { mobile, captcha } = this.validateForm.controls
      mobile.markAsDirty()
      mobile.updateValueAndValidity()
      captcha.markAsDirty()
      captcha.updateValueAndValidity()
      if (mobile.invalid || captcha.invalid) {
        return
      }
    }

    this.loading = true
    this.loginService
      .login(this.validateForm.getRawValue())
      .pipe(
        tap(() => {
          this.messageService.create('success', '登录成功')
        }),
        catchError((err: any) => {
          // 处理错误...
          const { error_description } = err.error
          this.messageService.create('error', error_description)
          return throwError(() => err) // 或者返回其他Observable替代错误流
        }),
        finalize(() => {
          this.loading = false
        })
      )
      .subscribe()
  }
}
