import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (c) => c.HomeComponent
          ),
        title: 'Home',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./components/products/products.component').then(
            (c) => c.ProductsComponent
          ),
        title: 'Products',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./components/details/details.component').then(
            (c) => c.DetailsComponent
          ),
        title: 'Details',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./components/categories/categories.component').then(
            (c) => c.CategoriesComponent
          ),
        title: 'Categories',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./components/cart/cart.component').then(
            (c) => c.CartComponent
          ),
        title: 'Cart',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./components/brands/brands.component').then(
            (c) => c.BrandsComponent
          ),
        title: 'Brand',
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./components/wishlist/wishlist.component').then(
            (c) => c.WishlistComponent
          ),
        title: 'Wishlist',
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./components/checkout/checkout.component').then(
            (c) => c.CheckoutComponent
          ),
        title: 'Checkout',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./components/allorders/allorders.component').then(
            (c) => c.AllordersComponent
          ),
        title: 'Order',
      },
      {
        path: 'forgetPassword',
        loadComponent: () =>
          import('./components/forget-pass/forget-pass.component').then(
            (c) => c.ForgetPassComponent
          ),
        title: 'forget password',
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/register/register.component').then(
            (c) => c.RegisterComponent
          ),
        title: 'Register',
      },
      {
        path: 'forgetPasswordAuth',
        loadComponent: () =>
          import('./components/forget-pass/forget-pass.component').then(
            (c) => c.ForgetPassComponent
          ),
        title: 'forget password',
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/notfound/notfound.component').then(
        (c) => c.NotfoundComponent
      ),
    title: 'Not Found',
  },
];
