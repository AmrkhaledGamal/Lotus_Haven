import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/service/product.service';
import { Category } from '../../core/interface/products';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  constructor(private _ProductService: ProductService) {}
  categories: Category[] = [];

  ngOnInit(): void {
    this._ProductService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
    });
  }
}
