import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ProductsService } from '../../../services/products.service';
import { CategoryService } from '../../../services/category.service';
import { Product } from '../../../interface/Product';
import { Category } from '../../../interface/Category';

@Component({
  selector: 'app-products-list',
  standalone: false,
  
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  products: Product[] = [];
  category:Category[]=[]
  constructor(private router: Router, private _authS:AuthService,private _productS:ProductsService,private _categoryS:CategoryService){}
  ngOnInit(): void {
    this._categoryS.getCategory().subscribe({
      next: (data) => {this.category = data},
      error: (error) => console.error(error)
    })
    this._productS.getProducts().subscribe({
      next: (data) => {this.products = data},
      error: (error) => console.error(error)
    })
  }

 
   onAdd() {
     this.router.navigate(['/admin/addproduct']);
   }
   onView(productId: string): void {
      this.router.navigate(['/admin/products-info', productId], { queryParams: { mode: 'view' } });
     console.log('View product:', productId);
   }
 
   onEdit(productId: string): void {
    this.router.navigate(['/admin/products-info/edit', productId], { queryParams: { mode: 'edit' } });
     console.log('Edit product:', productId);
   }

  onDelete(productId: string): void {
    console.log('Delete product:in product list', productId);
    this._productS.deleteProduct(productId)
    console.log('Delete product:', productId);
  }
  
  getCategoryName(categoryId:string): string{
    const category = this.category.find(c => c._id ===categoryId)
    return category? category.name : 'Category not found';
  }

}
