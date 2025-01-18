import { Products } from './../../core/interface/products';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { WishlistService } from '../../core/service/wishlist.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/service/cart.service';

@Component({
  selector: 'app-wishlist',
  imports: [CarouselModule, CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  constructor(
    private _WishlistService: WishlistService,
    private _CartService: CartService,
    private toastr: ToastrService,
    private _Renderer2: Renderer2
  ) {}
  wishlistData: Products[] = [];
  wishListId: string[] = [];
  ngOnInit(): void {
    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlistData = res.data;
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
  removeFormWishlist(id: string, e: HTMLButtonElement) {
    this._Renderer2.setAttribute(e, 'disabled', 'true');
    this._WishlistService.removeWishlist(id).subscribe({
      next: (res) => {
        this._Renderer2.removeAttribute(e, 'disabled');
        this.toastr.success('The product has been removed.');
        this.wishListId = res.data;
        let wishlistDataFilter = this.wishlistData.filter((i: any) =>
          this.wishListId.includes(i._id)
        );
        this.wishlistData = wishlistDataFilter;
        this._WishlistService.numWishlist.next(res.data.length);
      },
      error: (err) => {
        this._Renderer2.removeAttribute(e, 'disabled');
        this.toastr.warning('The product has not been removed..');
      },
    });
  }
  wishlistSlide: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };
}
