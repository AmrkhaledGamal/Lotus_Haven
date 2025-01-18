import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { Category, Products } from '../../core/interface/products';
import { ProductService } from '../../core/service/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipe/search.pipe';
import { WishlistService } from '../../core/service/wishlist.service';

@Component({
  selector: 'app-home',
  imports: [
    SlicePipe,
    CurrencyPipe,
    CarouselModule,
    RouterLink,
    FormsModule,
    SearchPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private toastr: ToastrService,
    private _Renderer2: Renderer2,
    private _WishlistService: WishlistService
  ) {}

  products: Products[] = [];
  categories: Category[] = [];
  wishlistIdData: string[] = [];
  searchProduct: string = '';
  mainSlides = [
    { src: 'slider-1.jpg', alt: 'slider-1' },
    { src: 'slider-2.jpeg', alt: 'slider-2' },
    { src: 'slider-3.jpeg', alt: 'slider-3' },
  ];

  ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
    });

    this._ProductService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
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
    this._Renderer2.setAttribute(e, 'disabled', 'true');
    this._CartService.addItemToCart(id).subscribe({
      next: (res) => {
        this.toastr.success('Product added to cart');
        this._Renderer2.removeAttribute(e, 'disabled');
        this._CartService.cartNumber.next(res.numOfCartItems);
      },
      error: (error) => {
        this._Renderer2.removeAttribute(e, 'disabled');
      },
    });
  }

  pushWishlist(id: string, e: HTMLButtonElement) {
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

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000,
    navSpeed: 700,
    navText: ['Back', 'next'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 5,
      },
    },
    nav: false,
  };

  mainSlideOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['Back', 'next'],
    items: 1,
    nav: false,
  };
}
