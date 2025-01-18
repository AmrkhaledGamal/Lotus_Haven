import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgetpassService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/auth/';

  forgetPassword(forgetForm: object): Observable<any> {
    return this.http.post(this.baseUrl + 'forgotPasswords', forgetForm);
  }

  resetCode(codeForm: object): Observable<any> {
    return this.http.post(this.baseUrl + 'verifyResetCode', codeForm);
  }

  newPassword(newPass: object): Observable<any> {
    return this.http.put(this.baseUrl + 'resetPassword', newPass);
  }
}
