import {
  ChangeDetectionStrategy,
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
  private router = inject(Router)
  private fb = inject(NonNullableFormBuilder)
  private destroyRef = inject(DestroyRef)
  private messageService = inject(NzMessageService)

  validateForm!: FormGroup

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      captcha: ['', [Validators.required]],
      remember: [true]
    })
  }

  login(): void {
    this.messageService.create('success', '登录成功')
    this.router.navigate(['/'])
  }
}
