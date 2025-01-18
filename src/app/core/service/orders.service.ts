import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  headToken: any = { token: localStorage.getItem('token') };

  onlineOrders(id: string, userForm: object): Observable<any> {
    return this.http.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        shippingAddress: userForm,
      },
      {
        headers: this.headToken,
      }
    );
  }
}
