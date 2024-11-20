import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Product } from '../models/product.interface';

interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);

  constructor() {
    console.log('CartService initialized');
  }

  addToCart(product: Product) {
    const currentItems = this.cartItems.value;
    const existingItemIndex = currentItems.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + 1
      };
      this.cartItems.next(updatedItems);
    } else {
      const newItem: CartItem = { ...product, quantity: 1 };
      this.cartItems.next([...currentItems, newItem]);
    }
  }

  getCartItems(): Observable<any[]> {
    return this.cartItems.asObservable().pipe(
      tap(items => items)
    );
  }

  removeFromCart(productId: number) {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter(item => item.id !== productId);
    this.cartItems.next(updatedItems);
  }

  getTotalPrice(): Observable<number> {
    return this.cartItems.pipe(
      map(items => 
        items.reduce((sum, item) => 
          sum + (Number(item.price) * item.quantity), 0)
      )
    );
  }

  clearCart() {
    this.cartItems.next([]);
  }

  updateQuantity(productId: number, quantity: number) {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.map(item => 
      item.id === productId ? { ...item, quantity } : item
    );
    this.cartItems.next(updatedItems);
  }

}
