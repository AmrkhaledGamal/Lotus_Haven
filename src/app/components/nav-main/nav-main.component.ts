import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/service/cart.service';
import { WishlistService } from '../../core/service/wishlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav-main',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.scss',
})
export class NavMainComponent implements OnInit {
  constructor(
    private _Router: Router,
    private _CartService: CartService,
    private _WishlistService: WishlistService,
    private _ToastrService: ToastrService
  ) {}

  navNumberCart: number = 0;
  navNumberWish: number = 0;

  ngOnInit(): void {
    // Only fetch cart/wishlist if user is logged in
    if (this.isLoggedIn()) {
      this._CartService.getUserCart().subscribe({
        next: (res) => {
          this.navNumberCart = res.numOfCartItems;
          this._CartService.cartNumber.next(res.numOfCartItems);
        },
        error: () => {
          this.navNumberCart = 0;
          this._CartService.cartNumber.next(0);
        },
      });

      this._WishlistService.getWishlist().subscribe({
        next: (res) => {
          this.navNumberWish = res.count;
          this._WishlistService.numWishlist.next(res.count);
        },
        error: () => {
          this.navNumberWish = 0;
          this._WishlistService.numWishlist.next(0);
        },
      });
    }

    // Subscribe to BehaviorSubjects for real-time updates
    this._CartService.cartNumber.subscribe({
      next: (value) => {
        this.navNumberCart = value;
      },
    });

    this._WishlistService.numWishlist.subscribe({
      next: (value) => {
        this.navNumberWish = value;
      },
    });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  signOut(): void {
    localStorage.removeItem('token');
    // Reset BehaviorSubjects so all components get updated
    this._CartService.cartNumber.next(0);
    this._WishlistService.numWishlist.next(0);
    // Reset local variables
    this.navNumberCart = 0;
    this.navNumberWish = 0;
    this._Router.navigate(['/login']);
    this._ToastrService.success('Signed out successfully');
  }

  navigateToCart(event: Event): void {
    if (!this.isLoggedIn()) {
      event.preventDefault();
      this._ToastrService.warning('Please login to go to the cart ');
      this._Router.navigate(['/login']);
    }
  }

  navigateToWishlist(event: Event): void {
    if (!this.isLoggedIn()) {
      event.preventDefault();
      this._ToastrService.warning('Please login to go to the wishlist ');
      this._Router.navigate(['/login']);
    }
  }
}
