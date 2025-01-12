import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Product } from '../interface/Product';

@Component({
  selector: 'app-product-scroller',
  standalone: false,
  
  templateUrl: './product-scroller.component.html',
  styleUrl: './product-scroller.component.css'
})
export class ProductScrollerComponent {
  @ViewChild('scroller') scroller!: ElementRef;
  @Input() products: Product[] = [];
  @Output() addToCart = new EventEmitter<Product>();
 
  onAddToCart(product: Product) {
    this.addToCart.emit(product);
    console.log('Product added to cart:', product);
  }

  scrollLeft() {
    const scrollContainer = this.scroller.nativeElement;
    const scrollAmount = scrollContainer.clientWidth * 0.8;
    scrollContainer.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    const scrollContainer = this.scroller.nativeElement;
    const scrollAmount = scrollContainer.clientWidth * 0.8;
    scrollContainer.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }
}
