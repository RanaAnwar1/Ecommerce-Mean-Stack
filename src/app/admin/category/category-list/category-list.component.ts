import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../interface/Category';

@Component({
  selector: 'app-category-list',
  standalone: false,
  
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  categories: Category []= [];
  constructor(private router: Router,private _categoryS:CategoryService){
    this._categoryS.getCategory().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    })
  }
  onAdd() {
    this.router.navigate(['/admin/addcategory']);
  }
  onView(categoryId: string): void {
    this.router.navigate(['/admin/categories-details',categoryId]);
    console.log('View category:', categoryId);
  }

  onEdit(categoryId: string): void {
    this.router.navigate(['/admin/categories-details/edit',categoryId]);
    console.log('Edit category:', categoryId);
  }

  onDelete(categoryId: string): void {
    this._categoryS.deleteCategory(categoryId);
    console.log('Delete category:', categoryId);
  }
}
