import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
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

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      }
    });
  }
  
  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
