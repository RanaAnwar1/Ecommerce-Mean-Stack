import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Product } from '../interface/Product';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private _auth: AuthService,private _productS:ProductsService, private _cartS:CartService){}
  newArrivals: Product[] = []
  ngOnInit(): void {
    this._productS.getProducts().subscribe(
      (products: Product[])=> this.newArrivals = products.filter(p => p.newArrival === true)
    )
    console.log(this._auth.getDecodedToken())
  }
  

  handleAddToCart(product: Product) {
    console.log('Product added to cart:', product);
    this._cartS.updateCart(product._id!,1)
  }
  scrollLeft() {
    const scroller = document.querySelector('.product-scroller') as HTMLElement;
    scroller.scrollBy({ left: -350, behavior: 'smooth' });
  }

  scrollRight() {
    const scroller = document.querySelector('.product-scroller') as HTMLElement;
    scroller.scrollBy({ left: 350, behavior: 'smooth' });
  }
}
