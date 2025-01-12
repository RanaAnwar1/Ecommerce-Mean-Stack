import { Component } from '@angular/core';
import { Cart, CartProduct } from '../../../interface/Cart';
import { CartService } from '../../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart-details',
  standalone: false,
  
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent {
  cart!: Cart;

  constructor(private route:ActivatedRoute,private _cartS:CartService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadCartDetails(id);
    });
    
  }

  loadCartDetails(id: string): void {
    this._cartS.viewCartDetails(id).subscribe(
      (cart)=>{
        this.cart = cart;
      }
    )
  }
  calculateTotal(): number {
    return this.cart.products.reduce((total, item) => {
      return total + (item.productId.price * item.quantity);
    }, 0);
  }

 
}
