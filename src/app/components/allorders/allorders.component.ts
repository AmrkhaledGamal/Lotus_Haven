import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { OrdersService } from '../../core/service/orders.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit {
  constructor(private _OrdersService: OrdersService) {}

  dataUserOrders: any = {};
  jwtToken: any;
  thankYou: boolean = false;

  ngOnInit(): void {
    const encode = localStorage.getItem('token');
    if (encode) {
      const decode = jwtDecode(encode);
      this.jwtToken = decode;
    }

    this._OrdersService.getUserOrders(this.jwtToken.id).subscribe({
      next: (res) => {
        this.dataUserOrders = res.at(length - 1);
      },
      error: (err) => {
        this.thankYou = true;
      },
    });
  }
}
