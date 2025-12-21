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
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://lotus-haven.netlify.app`,
      {
        shippingAddress: userForm,
      },
      {
        headers: this.headToken,
      }
    );
  }

  getUserOrders(id: string): Observable<any> {
    return this.http.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
    );
  }
}
