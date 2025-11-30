import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/service/product.service';
import { CartService } from '../../core/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Products } from '../../core/interface/products';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipe/search.pipe';
import { WishlistService } from '../../core/service/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [
    NgxPaginationModule,
    FormsModule,
    SearchPipe,
    RouterLink,
    CurrencyPipe,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private toastr: ToastrService,
    private _Renderer2: Renderer2,
    private _WishlistService: WishlistService
  ) {}
  products: Products[] = [];
  searchProduct: string = '';
  wishlistIdData: string[] = [];
  pageSize: number = 0;
  p: number = 1;
  total: number = 0;

  ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;
      },
    });
    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        let dataIdWish = res.data.map((i: any) => i.id);
        this.wishlistIdData = dataIdWish;
      },
    });
  }
  pageChanged(event: number) {
    this._ProductService.getProducts(event).subscribe({
      next: (response) => {
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.p = response.metadata.currentPage;
        this.total = response.results;
      },
    });
  }
  addToCart(id: string, e: HTMLButtonElement) {
    const token = localStorage.getItem('token');
    if (!token) {
      this.toastr.warning('Please login to add to cart');
      return;
    }
    this._Renderer2.setAttribute(e, 'disabled', 'true');

    this._CartService.addItemToCart(id).subscribe({
      next: (response) => {
        this.toastr.success('Product added to cart');
        this._Renderer2.removeAttribute(e, 'disabled');
        this._CartService.cartNumber.next(response.numOfCartItems);
      },
      error: (error) => {
        this._Renderer2.removeAttribute(e, 'disabled');
        this.toastr.error('Product addition failed');
      },
    });
  }
  pushWishlist(id: string, e: HTMLButtonElement) {
    const token = localStorage.getItem('token');
    if (!token) {
      this.toastr.warning('Please login to add to wishlist');
      return;
    }

    this._Renderer2.setAttribute(e, 'disabled', 'true');
    this._WishlistService.addToWishlist(id).subscribe({
      next: (res) => {
        this._Renderer2.removeAttribute(e, 'disabled');
        this.toastr.success(res.message);
        this.wishlistIdData = res.data;
        this._WishlistService.numWishlist.next(res.data.length);
      },
      error: (err) => {
        this._Renderer2.removeAttribute(e, 'disabled');
        this.toastr.error('Product addition failed');
      },
    });
  }
  removeFormWishlist(id: string, e: HTMLButtonElement) {
    this._Renderer2.setAttribute(e, 'disabled', 'true');
    this._WishlistService.removeWishlist(id).subscribe({
      next: (res) => {
        this._Renderer2.removeAttribute(e, 'disabled');
        this.toastr.success('The product has been removed.');
        this.wishlistIdData = res.data;
        this._WishlistService.numWishlist.next(res.data.length);
      },
      error: (err) => {
        this._Renderer2.removeAttribute(e, 'disabled');
        this.toastr.warning('The product has not been removed..');
      },
    });
  }
}
