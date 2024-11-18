import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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
}
