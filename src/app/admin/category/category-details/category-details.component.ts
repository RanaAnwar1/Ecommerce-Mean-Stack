import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category, Subcategory } from '../../../interface/Category';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-details',
  standalone: false,
  
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css'
})

export class CategoryDetailsComponent {
  category!: Category;
  categories!:Category[];
  subCategory!: Subcategory;
  subcategories!: Subcategory[];
  isEditMode = false;
  categoryForm!: FormGroup;
  imagePreview!: string;
  categoryId!: string;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _categoryS: CategoryService
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.categoryId = params['id'];
      const currentPath = this.route.snapshot.url.map(segment => segment.path).join('/');
      this.isEditMode = currentPath.includes('edit');
      this.loadCategory();
    });
    
    if (this.isEditMode) {
      this.initializeForm();
    }
  }

  private loadCategory(): void {
    this._categoryS.getCategory().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
        const foundCategory = this.categories.find(cat => cat._id === this.categoryId);
        if (foundCategory) {
          this.category = foundCategory;
          this.loadSubCategory(this.categoryId)
          this.initializeForm();
        } else {
          console.error('Category not found with ID:', this.categoryId);
        }
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }
  loadSubCategory(categoryId: string){
    this._categoryS.getSubcategory(categoryId).subscribe({
      next: (subcategories: Subcategory[]) => {
        this.subcategories = subcategories;
      },
      error: (err) => {
        console.error('Error loading subcategories:', err);
      }
    })
  }

  private initializeForm(): void {
    this.categoryForm = this.fb.group({
      name: [this.category.name || '', Validators.required],
      categoryImage: [this.category.image || null],
      subcategories: this.fb.array([]),
      isDeleted: [this.category.isDeleted || false],
      isActive: [this.category.isActive || true],
    });

   
    if (this.category.subcategories) {
      this.category.subcategories.forEach(sub => this.addSubCategory(sub)); 
    }
  
    const baseUrl = 'http://localhost:3000/images/';
    this.imagePreview = this.category.image ? `${baseUrl}${this.category.image}` : '';
  }

  get subCategories(): FormArray {
    return this.categoryForm.get('subcategories') as FormArray;
  }

  addSubCategory(subCategory?: Subcategory): void {
    const subCategoryForm = this.fb.group({
      id: [subCategory?._id || ''],
      name: [subCategory?.name || '', Validators.required]
    });

    this.subCategories.push(subCategoryForm);
  }
  
  removeSubCategory(index: number): void {
    this.subCategories.removeAt(index);
  }

  onImageChange(event: any): void {
  
    if(event.target.files.length > 0)
      {
        const file = event.target.files[0];
        this.categoryForm.patchValue({
          categoryImage: file
        });
      }
  }

  toggleState(field: 'isDeleted' | 'isActive'): void {
    if (this.isEditMode) {
      const currentValue = this.categoryForm.get(field)?.value;
      this.categoryForm.patchValue({
        [field]: !currentValue
      });
    }
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
    
    const formData = new FormData();
   
    const updatedSubcategory = this.categoryForm.value.subcategories.map((sub: any) => ({
          _id: sub._id || undefined, 
          name: sub.name
    }))
    formData.append('_id', this.categoryId)
    formData.append('categoryImage', this.categoryForm.get('categoryImage')?.value)
    formData.append('name', this.categoryForm.get('name')?.value)
    formData.append('subcategories', JSON.stringify(this.categoryForm.get('subcategories')?.value))
    formData.append('isActive', this.categoryForm.get('isActive')?.value)
    formData.append('isDeleted', this.categoryForm.get('isDeleted')?.value)
    
      this._categoryS.updateCategory(formData);
    }
  }
}
