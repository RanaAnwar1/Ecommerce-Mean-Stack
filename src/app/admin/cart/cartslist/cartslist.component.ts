import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../../../interface/Cart';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cartslist',
  standalone: false,
  
  templateUrl: './cartslist.component.html',
  styleUrl: './cartslist.component.css'
})
export class CartslistComponent implements OnInit {
  carts: Cart[]=[];
  constructor(private router: Router,private _cartS: CartService){}
  ngOnInit(): void {
    this._cartS.viewAllCarts().subscribe(
      (data) => {
        this.carts = data;
      }
    )
  }
  onView(cartId: string) {
    this.router.navigate(['/admin/cart-details', cartId]);
  }

  onDelete(cartId: string): void {
    this._cartS.deleteCart(cartId)
    console.log('Delete cart:', cartId);
  }
}
