import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private http: HttpClient) {}

  numWishlist: BehaviorSubject<number> = new BehaviorSubject(0);
  headToken: any = { token: localStorage.getItem('token') };

  addToWishlist(id: string): Observable<any> {
    return this.http.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        productId: id,
      },
      {
        headers: this.headToken,
      }
    );
  }

  getWishlist(): Observable<any> {
    return this.http.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
      headers: this.headToken,
    });
  }

  removeWishlist(id: string): Observable<any> {
    return this.http.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      {
        headers: this.headToken,
      }
    );
  }
}
