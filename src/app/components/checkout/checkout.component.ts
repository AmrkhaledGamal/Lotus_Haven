import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/service/orders.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  constructor(
    private _OrdersService: OrdersService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  idCart: string = '';
  masErr: string = '';
  regSpinner: boolean = false;
  urlOrigin: any;

  private formBuilder = inject(FormBuilder);
  checkOutForm = this.formBuilder.group({
    details: ['', [Validators.required]],
    phone: [
      '',
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
    ],
    city: ['', [Validators.required]],
  });

  ngOnInit() {
    const currentUrl = window.location.origin;
    this.urlOrigin = currentUrl;
    this._ActivatedRoute.params.subscribe((params) => {
      this.idCart = params['id'];
    });
  }

  submitForm() {
    const userForm = this.checkOutForm.value;
    this.regSpinner = true;
    if (this.checkOutForm.valid) {
      this._OrdersService
        .onlineOrders(this.idCart, userForm, this.urlOrigin)
        .subscribe({
          next: (res) => {
            this.regSpinner = false;
            window.open(res.session.url, '_self');
          },
          error: (err) => {
            this.regSpinner = false;
            this.masErr = err.error.message;
          },
        });
    }
  }
}
