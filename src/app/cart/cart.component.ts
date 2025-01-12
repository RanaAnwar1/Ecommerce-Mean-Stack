import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Cart } from '../interface/Cart';

@Component({
  selector: 'app-cart',
  standalone: false,
  
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart!: Cart;
  totalItems: number = 0;
  cartTotal: number = 0;

  constructor(private router: Router, private _cartS:CartService) {}

  ngOnInit(): void {
    this.loadCart()
  }
  
  loadCart(): void {
    this._cartS.viewCart().subscribe((cart) => {
      this.cart = cart;
      this.cartTotal = this.calculateTotal();
      this.totalItems = this.cart.products.reduce((sum, p) => sum + p.quantity, 0);
    });
  }

  incrementItem(id: string): void {
    const item = this.cart.products.find((p) => p.productId._id === id);
    if (item) {
      item.quantity++;
      this.cartTotal = this.calculateTotal();
      this.totalItems = this.cart.products.reduce((sum, p) => sum + p.quantity, 0);
      this._cartS.updateCart(id, 1);
    }
  }
  
  decrementItem(id: string): void {
    const item = this.cart.products.find((p) => p.productId._id === id);
    if (item && item.quantity > 1) {
      item.quantity--;
      this.cartTotal = this.calculateTotal();
      this.totalItems = this.cart.products.reduce((sum, p) => sum + p.quantity, 0);
      this._cartS.updateCart(id, -1);
    }else{
      this.removeItem(id);
    }
  }
  
  removeItem(id: string): void {
    this.cart.products = this.cart.products.filter((p) => p.productId._id !== id);
    this.cartTotal = this.calculateTotal();
    this.totalItems = this.cart.products.reduce((sum, p) => sum + p.quantity, 0);
    this._cartS.removeProductFromCart(id); 
  }
  
  
  calculateTotal(): number {
    return this.cart.products.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
  }

  proceedToCheckout(): void {
    if(this.cart.products.length>0)
      this.router.navigate(['/checkout']);
    else
    alert('Cart is empty. Please add items to proceed.');
  }
}
