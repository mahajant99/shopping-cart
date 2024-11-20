import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  quantities: { [key: number]: number } = {};

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.products.forEach(product => {
          this.quantities[product.id] = 1;
        });
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }
  
  incrementQuantity(product: Product): void {
    this.quantities[product.id] = (this.quantities[product.id] || 1) + 1;
  }

  decrementQuantity(product: Product): void {
    if (this.quantities[product.id] > 1) {
      this.quantities[product.id]--;
    }
  }

  getQuantity(product: Product): number {
    return this.quantities[product.id] || 1;
  }

  addToCart(product: Product): void {
    const quantity = this.quantities[product.id] || 1;
    for (let i = 0; i < quantity; i++) {
      this.cartService.addToCart(product);
    }
    this.quantities[product.id] = 1;
  }
}
