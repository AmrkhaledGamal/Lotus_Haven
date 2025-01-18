import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/service/cart.service';
import { WishlistService } from '../../core/service/wishlist.service';

@Component({
  selector: 'app-nav-main',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.scss',
})
export class NavMainComponent {
  constructor(
    private _Router: Router,
    private _CartService: CartService,
    private _WishlistService: WishlistService
  ) {}

  navNumberCart: number = 0;
  navNumberWish: number = 0;

  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (res) => {
        this.navNumberCart = res.numOfCartItems;
      },
    });

    this._CartService.cartNumber.subscribe({
      next: (value) => {
        this.navNumberCart = value;
      },
    });

    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        this.navNumberWish = res.count;
      },
    });

    this._WishlistService.numWishlist.subscribe({
      next: (value) => {
        this.navNumberWish = value;
      },
    });
  }

  signOut(): void {
    localStorage.removeItem('token');
    this._Router.navigate(['/login']);
  }
}
