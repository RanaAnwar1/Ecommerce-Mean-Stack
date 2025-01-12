import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../interface/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: false,
  
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();
  
  isHovered = false;
  constructor(private router: Router){}

  onAddToCart(event: MouseEvent): void {
    event.stopPropagation();
    this.addToCart.emit(this.product);
  }

  
  onImageError(event: any): void {
    event.target.src = 'assets/placeholder-image.jpg';
  }

  navigateToProductDetails(productId: string): void {
    this.router.navigate(['/product-details', productId]); // Navigate with ID
  }
}
