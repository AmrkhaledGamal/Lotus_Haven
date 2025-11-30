import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControlOptions,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  masErr: string = '';
  regSpinner: boolean = false;

  private formBuilder = inject(FormBuilder);
  registerForm = this.formBuilder.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)],
      ],
      rePassword: [''],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    },
    { validators: this.confirmPassword } as FormControlOptions
  );
  confirmPassword(form: FormGroup): void {
    const password = form.get('password');
    const rePassword = form.get('rePassword');
    if (rePassword?.value == '') {
      rePassword.setErrors({ required: true });
    } else if (rePassword?.value != password?.value) {
      rePassword?.setErrors({ notEqual: true });
    }
  }
  submitRegister() {
    this.masErr = ''; // Clear previous error messages
    this.regSpinner = true;
    if (this.registerForm.valid) {
      this._AuthService.apiRegister(this.registerForm.value).subscribe({
        next: (res) => {
          this.regSpinner = false;
          this.masErr = ''; // Clear error on success
          this._Router.navigate(['/login']);
        },
        error: (error) => {
          this.regSpinner = false;
          this.masErr = error.error?.message || 'An error occurred during registration';
        },
      });
    } else {
      this.regSpinner = false;
    }
  }
}
