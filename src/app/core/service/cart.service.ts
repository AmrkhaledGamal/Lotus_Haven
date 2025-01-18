import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);
  headToken: any = { token: localStorage.getItem('token') };

  addItemToCart(id: string): Observable<any> {
    return this.http.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: id,
      },
      {
        headers: this.headToken,
      }
    );
  }

  getUserCart(): Observable<any> {
    return this.http.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: this.headToken,
    });
  }

  removeFromCart(id: string): Observable<any> {
    return this.http.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        headers: this.headToken,
      }
    );
  }

  plusAndMinus(id: string, count: number): Observable<any> {
    return this.http.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        count: count,
      },
      {
        headers: this.headToken,
      }
    );
  }

  clearUserCart(): Observable<any> {
    return this.http.delete('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: this.headToken,
    });
  }
}
