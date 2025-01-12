import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../interface/Product';
import { CategoryService } from '../services/category.service';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import { Category, Subcategory } from '../interface/Category';

@Component({
  selector: 'app-category',
  standalone: false,
  
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categoryType: string = '';
  Math = Math;
  selectedSubcategories: string[] = [];
  subcategories: Subcategory[] = [];
  categories: Category[] = [];
  products: Product[] = [];
  currentPage = 1;
  productsPerPage = 9;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  searchQuery: string = '';
  sortOption: string = '';

  constructor(private route: ActivatedRoute,
    private _categoryS: CategoryService,
    private _productS: ProductsService, 
    private _cartService: CartService
  ) {
   
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryType = params['type'];
      this.loadCategories(() => {
        this.loadContent();
      });
    });
    
  }

  loadCategories(callback: () => void): void {
    this._categoryS.getCategory().subscribe((category: Category[]) => {
      this.categories = category;
      console.log("Categories loaded:", this.categories);
      callback();
    });
  }

  loadContent(): void {
    const selectedCategory = this.categories.find(
      (c) =>
        c.name.toLowerCase() === this.categoryType.toLowerCase() &&
        !c.isDeleted &&
        c.isActive
    );
  
  
    if (selectedCategory) {
      this.updateSubcategories(selectedCategory._id!);
      this.loadProducts(selectedCategory._id!);
    } else {
      console.log("No matching category found.");
    }
  }
  
  loadProducts(categoryID:string){
    this._productS.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products.filter(p => 
          (p.categoryId === categoryID ) && !p.isDeleted && p.isActive
        );
        console.log("in load products", this.products)
      }
    )
   
  }
  updateSubcategories(categoryID:string): void {
    this._categoryS.getSubcategory(categoryID).subscribe(
      (subcategories: Subcategory[]) => {
        this.subcategories = subcategories;
      }
    )
    console.log("in update subcategories", this.subcategories)
  }
   onSubcategoryChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const subcategoryId = checkbox.value;

    if (checkbox.checked) {
     
      this.selectedSubcategories.push(subcategoryId);
    } else {
      this.selectedSubcategories = this.selectedSubcategories.filter(
        (id) => id !== subcategoryId
      );
    }
    this.applyFilters();
  }
  applyFilters(): void {
    const selectedCategory = this.categories.find(
      (c) =>
        c.name.toLowerCase() === this.categoryType.toLowerCase() &&
        !c.isDeleted &&
        c.isActive
    );

    if (selectedCategory) {
      this._productS.getProducts().subscribe((products: Product[]) => {
        const filteredProducts = products.filter((p) => {
          const matchesCategory = p.categoryId === selectedCategory._id;
          const matchesSubcategory =
            this.selectedSubcategories.length === 0 ||
            this.selectedSubcategories.includes(p.subcategoryId!);
          const matchesMinPrice =
            this.minPrice === null || p.price >= this.minPrice;
          const matchesMaxPrice =
            this.maxPrice === null || p.price <= this.maxPrice;
          const matchesSearch =
            this.searchQuery === '' ||
            p.name.toLowerCase().includes(this.searchQuery.toLowerCase());
          const isValid = !p.isDeleted && p.isActive;

          return (
            matchesCategory &&
            matchesSubcategory &&
            matchesMinPrice &&
            matchesMaxPrice &&
            matchesSearch &&
            isValid
          );
        });

        
        this.products = this.sortProducts(filteredProducts);
        this.currentPage = 1;
      });
    }
  }
  sortProducts(products: Product[]): Product[] {
    switch (this.sortOption) {
      case 'price-asc':
        return products.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return products.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return products.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return products;
    }
  }
  get paginatedProducts() {
    const start = (this.currentPage - 1) * this.productsPerPage;
    return this.products.slice(start, start + this.productsPerPage);
  }
  updatePagination() {
    const pageInfo = document.getElementById('page-info');
    if (pageInfo) {
      pageInfo.textContent = `Page ${this.currentPage} of ${Math.ceil(this.products.length / this.productsPerPage)}`;
    }

    const prevButton = document.getElementById('prev-page') as HTMLButtonElement; 
    const nextButton = document.getElementById('next-page') as HTMLButtonElement; 
  
    if (prevButton) { 
      prevButton.disabled = this.currentPage === 1; 
    }
    if (nextButton) {
      nextButton.disabled = this.currentPage === Math.ceil(this.products.length / this.productsPerPage);
    }
  }

  addToCart(product: Product) {
    console.log(product)
    this._cartService.updateCart(product._id!,1)
  }


  onPrevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  onNextPage(): void {
    const totalPages = Math.ceil(this.products.length / this.productsPerPage);
    if (this.currentPage < totalPages) this.currentPage++;
  }
}
