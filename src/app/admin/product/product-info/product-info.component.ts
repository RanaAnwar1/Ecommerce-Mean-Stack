import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { Product } from '../../../interface/Product';
import { ProductsService } from '../../../services/products.service';
import { CategoryService } from '../../../services/category.service';



interface Category {
  _id: string;
  name: string;
  subcategories: SubCategory[];
}

interface SubCategory {
  _id: string;
  name: string;
}
@Component({
  selector: 'app-product-info',
  standalone: false,
  
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css'
})
export class ProductInfoComponent {
  product!: Product;
  mode: 'view' | 'edit' = 'view';
  productForm!: FormGroup;
  imageFiles: File[] = [];
  imagePreviewUrls: string[] = [];
  loading = true;
  saving = false;
  categories:Category[]=[]
  subcategories:SubCategory[]=[]
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _productS: ProductsService,
    private _categoryS: CategoryService
  ) {
    
    this.initializeForm();
  }


  ngOnInit(): void {
    this._categoryS.getCategory().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.updateSubcategories(categories[0]?._id); // Initialize subcategories for the first category
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      },
    });
    this.route.params.pipe(
      switchMap(params => {
        const id = params['id'];
        this.mode = this.route.snapshot.queryParams['mode'] || 'view';
        return this.loadProduct(id);
      })
    ).subscribe({
      next: (product) => {
        this.product = product;
        this.imagePreviewUrls = [...product.images];
        if (this.mode === 'edit') {
          this.populateForm(product);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.loading = false;
      }
    });
    
  }

  private loadProduct(id: string): Observable<Product> {
    return this._productS.getProductDetails(id).pipe(
      tap((product) => {
        this.product = product;
        this.imagePreviewUrls = [...product.images];
        if (this.mode === 'edit') {
          this.populateForm(product);
        }
      })
    );
  }
  

  private initializeForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      gender: ['', Validators.required],
      inventory: this.fb.group({
        total: [0, [Validators.required, Validators.min(0)]], // Make sure total has validators
        sizes: this.fb.array([])
      }),
      categoryId: ['', Validators.required],
      subcategoryId: [''],
      isActive: [true],
      newArrival: [false]
    });
    this.sizesFormArray.valueChanges.subscribe(() => {
      this.updateTotalInventory();
    });
  }

  private populateForm(product: Product): void {
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      gender: product.gender,
      inventory: {
        total: product.inventory.total
      },
      categoryId: product.categoryId,
      subcategoryId: product.subcategoryId,
      isActive: product.isActive,
      newArrival: product.newArrival
    });

    while (this.sizesFormArray.length) {
      this.sizesFormArray.removeAt(0);
    }

    product.inventory.sizes.forEach(size => {
      this.sizesFormArray.push(
        this.fb.group({
          size: [size.size, Validators.required],
          quantity: [size.quantity, [Validators.required, Validators.min(0)]]
        })
      );
    });
  }

  get sizesFormArray(): FormArray {
    return this.productForm.get('inventory.sizes') as FormArray;
  }

  addSize(): void {
    const sizeForm = this.fb.group({
      size: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]]
    });
    this.sizesFormArray.push(sizeForm);
    this.updateTotalInventory();
  }

  removeSize(index: number): void {
    this.sizesFormArray.removeAt(index);
    this.updateTotalInventory();
  }

  updateTotalInventory(): void {
    const total = this.sizesFormArray.controls.reduce(
      (sum, control) => sum + (Number(control.get('quantity')?.value) || 0),
      0
    );
    
    this.productForm.get('inventory')?.patchValue({ total }, { emitEvent: false });
  }

  onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const selectedFiles = Array.from(input.files);
      if (this.imageFiles.length + selectedFiles.length > 5) {
        alert('Maximum 5 images allowed');
        return;
      }
  
      selectedFiles.forEach((file) => {
        if (file.type.startsWith('image/')) {
          this.imageFiles.push(file);
  
          const reader = new FileReader();
          reader.onload = () => {
            this.imagePreviewUrls.push(reader.result as string);
          };
          reader.readAsDataURL(file);
        } else {
          alert('Only image files are allowed');
        }
      });
      this.productForm.patchValue({
        productImages: this.imageFiles,
      });
    }
    
  }
  removeImage(index: number): void {
    if (index < this.product!.images.length) {
      this.product!.images.splice(index, 1);
    } else {
      const newImageIndex = index - this.product!.images.length;
      this.imageFiles.splice(newImageIndex, 1);
    }
    this.imagePreviewUrls.splice(index, 1);
  }

  
  onSubmit(): void {
    if (this.productForm.valid && this.product) {
     
    this.updateTotalInventory();
    
    const formData = new FormData();
   
    const productData = {
      name: this.productForm.get('name')?.value,
      description: this.productForm.get('description')?.value,
      price: this.productForm.get('price')?.value,
      gender: this.productForm.get('gender')?.value,
      inventory: {
        total: this.productForm.get('inventory.total')?.value,
        sizes: this.sizesFormArray.value
      },
      categoryId: this.productForm.get('categoryId')?.value,
      subcategoryId: this.productForm.get('subcategoryId')?.value,
      isActive: this.productForm.get('isActive')?.value,
      newArrival: this.productForm.get('newArrival')?.value
    };
    formData.append('productData', JSON.stringify(productData));
  
    this.imageFiles.forEach((file, index) => {
        formData.append('productImages', file);
      });
      

      this._productS.updateProduct(this.product._id!, formData);
      this.router.navigate(['/admin/products']);
    }
  }
  getCategoryName(categoryId:string): string{
    const category = this.categories.find(c => c._id ===categoryId)
    return category? category.name : 'Category not found';
  }
  getSubcategoryName(subcategoryId: string): string{
    const subcategory = this.subcategories.find(s => s._id === subcategoryId)
    return subcategory? subcategory.name : 'Subcategory not found';
  }
  toggleMode(): void {
    this.mode = this.mode === 'view' ? 'edit' : 'view';
    if (this.mode === 'edit') {
      this.populateForm(this.product!);
    }
  }
 
  onCategoryChange(event: Event): void {
    const selectedCategoryId = (event.target as HTMLSelectElement).value;
    this.updateSubcategories(selectedCategoryId);
  }

  updateSubcategories(categoryId: string): void {
    const selectedCategory = this.categories.find(
      (category) => category._id === categoryId
    );
    this.subcategories = selectedCategory ? selectedCategory.subcategories : [];
    this.productForm.get('subcategoryId')?.setValue('');
  }
}