import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-add-category',
  standalone: false,
  
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  categoryForm!: FormGroup;
  imagePreview: string | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _categoryS:CategoryService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      image: [null, Validators.required],
      subCategories: this.fb.array([])
    });
  }

  get subCategories(): FormArray {
    return this.categoryForm.get('subCategories') as FormArray;
  }

  get nameControl() {
    return this.categoryForm.get('name');
  }

  addSubCategory(): void {
    const subCategoryForm = this.fb.group({
      name: ['', Validators.required]
    });
    this.subCategories.push(subCategoryForm);
  }

  removeSubCategory(index: number): void {
    this.subCategories.removeAt(index);
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (file.type.match(/image\/*/) === null) {
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.categoryForm.patchValue({
          image: file
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.isSubmitting = true;

      const formData = new FormData();
      formData.append('name', this.categoryForm.get('name')!.value);
      formData.append('categoryImage', this.categoryForm.get('image')!.value);
      formData.append('subcategories', JSON.stringify(this.subCategories.value));

      this._categoryS.createCategory(formData)
      console.log('Form Data:', formData);
      
     
      setTimeout(() => {
        this.isSubmitting = false;
        this.router.navigate(['/admin/categories']);
      }, 1000);
    } else {
      this.markFormGroupTouched(this.categoryForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup | FormArray): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
