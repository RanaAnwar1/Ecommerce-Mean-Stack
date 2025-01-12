import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Category } from '../interface/Category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() isAdmin: boolean = false;
  isDropdownOpen: boolean = false;
  categories: Category[] = [];
  isMenuOpen: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private router: Router, private _authS: AuthService, private categoryService: CategoryService) {
    this.isLoggedIn = this._authS.isAuthorized();
  }

  ngOnInit() {

    this._authS.getAccsesToken().subscribe(data=>{
      if(data === null){
        this.isLoggedIn = false;
      }
      else{
        this.isLoggedIn = true;
      }
    })
    this.loadCategories();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  loadCategories(): void {
    this.categoryService.getCategory().subscribe(
      (categories: Category[]) => {
        this.categories = categories.filter(category => !category.isDeleted && category.isActive);
        console.log('in header', this.categories);
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  logout() {
    this._authS.logout()
    this.isDropdownOpen = false;
    this.router.navigate(['/login']);
  }
 
}
