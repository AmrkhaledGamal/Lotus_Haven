import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from '../../core/service/cart.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _Renderer2: Renderer2,
    private toastr: ToastrService
  ) {}

  productCartData: any = {};

  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (res) => {
        this.productCartData = res.data;
      },
    });
  }

  removeItemCart(id: string, el: HTMLButtonElement) {
    this._Renderer2.setAttribute(el, 'disabled', 'true');
    this._CartService.removeFromCart(id).subscribe({
      next: (res) => {
        this._Renderer2.removeAttribute(el, 'disabled');
        this.productCartData = res.data;
        this.toastr.success('The product has been removed.');
        this._CartService.cartNumber.next(res.numOfCartItems);
      },
      error: (err) => {
        this._Renderer2.removeAttribute(el, 'disabled');
      },
    });
  }

  changeCount(id: string, count: number, e: HTMLButtonElement) {
    this._Renderer2.setAttribute(e, 'disabled', 'true');
    this._CartService.plusAndMinus(id, count).subscribe({
      next: (res) => {
        this._Renderer2.removeAttribute(e, 'disabled');
        this.productCartData = res.data;
        this.toastr.success('The quantity has been changed.');
        this._CartService.cartNumber.next(res.numOfCartItems);
      },
      error: (err) => {
        this._Renderer2.removeAttribute(e, 'disabled');
      },
    });
  }

  clearCart(el: HTMLButtonElement) {
    this._Renderer2.setAttribute(el, 'disabled', 'true');
    this._CartService.clearUserCart().subscribe({
      next: (res) => {
        this._Renderer2.removeAttribute(el, 'disabled');
        this.productCartData = {};
        this.toastr.success(res.message);
        this._CartService.cartNumber.next(0);
      },
      error: (err) => {
        this._Renderer2.removeAttribute(el, 'disabled');
      },
    });
  }
}
