import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/service/product.service';
import { Brand } from '../../core/interface/products';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  constructor(private _ProductService: ProductService) {}
  brand: Brand[] = [];

  ngOnInit(): void {
    this._ProductService.getBrand().subscribe({
      next: (res) => {
        this.brand = res.data;
      },
    });
  }
}
