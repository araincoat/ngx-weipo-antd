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
import { RouterLink } from '@angular/router'

import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzInputModule } from 'ng-zorro-antd/input'

@Component({
  selector: 'app-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.less'
})
export class RegisterComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder)
  private destroyRef = inject(DestroyRef)

  validateForm!: FormGroup

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      captcha: ['', [Validators.required]]
    })
  }

  register(): void {}
}
