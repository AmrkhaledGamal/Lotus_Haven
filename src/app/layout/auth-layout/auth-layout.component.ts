import { Component } from '@angular/core';
import { NavAuthComponent } from '../../components/nav-auth/nav-auth.component';
import { FooterAuthComponent } from '../../components/footer-auth/footer-auth.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, NavAuthComponent, FooterAuthComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {}
