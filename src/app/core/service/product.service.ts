import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(pageNum: number = 1): Observable<any> {
    return this.http.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${pageNum}`
    );
  }

  getProductsById(id: string): Observable<any> {
    return this.http.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }

  getCategories(): Observable<any> {
    return this.http.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  getBrand(): Observable<any> {
    return this.http.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
}
