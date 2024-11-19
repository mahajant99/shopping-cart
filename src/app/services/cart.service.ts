import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);

  constructor() {
    console.log('CartService initialized');
  }

  addToCart(product: any) {
    const currentItems = this.cartItems.value;
    const newItems = [...currentItems, product];
    this.cartItems.next(newItems);
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
      map((items: any[]) => items.reduce((total, item) => total + item.price, 0))
    );
  }

  clearCart() {
    this.cartItems.next([]);
  }

}
