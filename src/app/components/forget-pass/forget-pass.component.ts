import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgetpassService } from '../../core/service/forgetpass.service';

@Component({
  selector: 'app-forget-pass',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-pass.component.html',
  styleUrl: './forget-pass.component.scss',
})
export class ForgetPassComponent {
  constructor(
    private _Router: Router,
    private _ForgetpassService: ForgetpassService
  ) {}

  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  message: string = '';
  regSpinner: boolean = false;

  private formBuilder = inject(FormBuilder);
  forgetPasswordForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  resetCodeForm = this.formBuilder.group({
    resetCode: ['', [Validators.required]],
  });

  endResetPass = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    newPassword: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)],
    ],
  });

  submitForgetForm() {
    this.regSpinner = true;
    let userEmail = this.forgetPasswordForm.value;
    this._ForgetpassService.forgetPassword(userEmail).subscribe({
      next: (res) => {
        this.regSpinner = false;
        this.message = res.message;
        this.step1 = false;
        this.step2 = true;
      },
      error: (err) => {
        this.regSpinner = false;
        this.message = err.error.message;
      },
    });
  }

  submitCodeForm() {
    this.regSpinner = true;
    let userCode = this.resetCodeForm.value;
    this._ForgetpassService.resetCode(userCode).subscribe({
      next: (res) => {
        this.regSpinner = false;
        this.message = '';
        this.step2 = false;
        this.step3 = true;
      },
      error: (err) => {
        this.regSpinner = false;
        this.message = err.error.message;
      },
    });
  }

  submitEndForm() {
    this.regSpinner = true;
    const endForm = this.endResetPass.value;
    this._ForgetpassService.newPassword(endForm).subscribe({
      next: (res) => {
        this.regSpinner = false;
        if (res.token) {
          localStorage.setItem('token', res.token);
          this._Router.navigate(['/home']);
        }
      },
      error: (error) => {
        this.regSpinner = false;
        this.message = error.error.message;
      },
    });
  }
}
