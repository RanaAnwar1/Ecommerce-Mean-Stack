import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CategoryService } from '../../../services/category.service';
import { ProductsService } from '../../../services/products.service';
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
  selector: 'app-add-product',
  standalone: false,
  
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  productForm!: FormGroup;
  imageFiles: File[] = [];
  imagePreviewUrls: string[] = [];
  categories:Category[]=[]
  subcategories:SubCategory[]=[]
  constructor(private fb: FormBuilder,private _authS: AuthService, private _categoryS:CategoryService, private _productS:ProductsService) {
    this.productForm = this.fb.group({
      categoryId: [''],
      subcategoryId: [''],
    });
    this.createForm();

  }

  ngOnInit(): void {
    this._categoryS.getCategory().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.updateSubcategories(categories[0]?._id); 
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      },
    });
  }

  private createForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      gender: ['', Validators.required],
      inventory: this.fb.group({
        total: [0, Validators.required],
        sizes: this.fb.array([])
      }),
      categoryId: ['', Validators.required],
      subcategoryId: [''],
      isActive: [true],
      newArrival: [false]
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
    const total = this.sizesFormArray.controls.reduce((sum, control) => 
      sum + (control.get('quantity')?.value || 0), 0);
    this.productForm.patchValue({
      inventory: { total }
    });
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
    this.imageFiles.splice(index, 1);
    this.imagePreviewUrls.splice(index, 1);
    this.productForm.patchValue({
      productImages: this.imageFiles,
    });
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
  async onSubmit(): Promise<void> {
    if (this.productForm.valid && this.imageFiles.length > 0) {
      const formData = new FormData();
      Object.keys(this.productForm.value).forEach((key) => {
        if(key === 'inventory'){
          formData.append(key, JSON.stringify(this.productForm.value[key]))
        }
        else if (key !== 'productImages') {
          formData.append(key, this.productForm.value[key]);
        }

      });
    
      this.imageFiles.forEach((file, index) => {
        formData.append('productImages', file);
      });
      
      try {
        await this._productS.createProduct(formData);
      } catch (error) {
        console.error('Error saving product:', error);
      }
    } else {
      console.error('Form is invalid or no images selected');
    }
  }
}  