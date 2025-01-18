import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/auth/';

  apiRegister(registerForm: object): Observable<any> {
    return this.http.post(this.baseUrl + 'signup', registerForm);
  }

  apiLogin(loginForm: object): Observable<any> {
    return this.http.post(this.baseUrl + 'signin', loginForm);
  }
}
