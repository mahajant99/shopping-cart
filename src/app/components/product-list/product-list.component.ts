import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  }[] = [];

  constructor(private productService: ProductService) {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      }
    });
  }
}