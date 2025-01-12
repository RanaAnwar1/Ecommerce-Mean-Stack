import { Component } from '@angular/core';
import { Product } from '../interface/Product';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: false,
  
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  productId!: string;
  product!: Product;
  mainImage!: string;
  selectedSize: string | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.loadProduct();
  }

  loadProduct(): void {
    this.loading = true;
    this.productsService.getProductDetails(this.productId).subscribe({
      next: (product: Product) => {
        this.product = product;
        this.mainImage = `http://localhost:3000/images/${product.images[0]}`;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch product details:', err);
        this.error = 'Failed to load product details';
        this.loading = false;
      }
    });
  }

  changeImage(image: string): void {
    this.mainImage = `http://localhost:3000/images/${image}`;
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  addToCart(): void {
    if (this.product && this.product._id) {
      this.cartService.updateCart(this.product._id, 1);
      alert('Product added to cart!');
    }
  }

  getStockStatus(quantity: number): string {
    if (quantity > 10) return 'In Stock';
    if (quantity > 0) return `Only ${quantity} left`;
    return 'Out of Stock';
  }
}
