import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from '../../core/service/product.service';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/service/wishlist.service';

@Component({
  selector: 'app-details',
  imports: [CarouselModule, CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductService: ProductService,
    private _CartService: CartService,
    private toastr: ToastrService,
    private _Renderer2: Renderer2,
    private _WishlistService: WishlistService
  ) {}

  idProduct: string = '';
  productDetails: any;
  wishlistIdData: string[] = [];

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((params) => {
      this.idProduct = params['id'];
    });
    this._ProductService.getProductsById(this.idProduct).subscribe({
      next: (res) => {
        this.productDetails = res.data;
      },
    });
    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        let dataIdWish = res.data.map((i: any) => i.id);
        this.wishlistIdData = dataIdWish;
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
      next: (res) => {
        this.toastr.success('Product added to cart');
        this._Renderer2.removeAttribute(e, 'disabled');
        this._CartService.cartNumber.next(res.numOfCartItems);
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

  SpecificProduct: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: false,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000,
    navSpeed: 700,
    navText: ['Back', 'next'],
    items: 1,
    nav: false,
  };
}
