import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  masErr: string = '';
  regSpinner: boolean = false;

  private formBuilder = inject(FormBuilder);
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)],
    ],
  });

  submitLogin() {
    this.regSpinner = true;
    if (this.loginForm.valid) {
      this._AuthService.apiLogin(this.loginForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this._AuthService.decodeToken();
          this.regSpinner = false;
          this._Router.navigate(['/home']);
        },
        error: (error) => {
          this.regSpinner = false;
          this.masErr = error.error.message;
        },
      });
    }
  }
}
