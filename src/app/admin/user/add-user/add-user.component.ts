import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRole } from '../../../interface/UserRole';
import { UserService } from '../../../services/user.service';
import { UserroleService } from '../../../services/userrole.service';

@Component({
  selector: 'app-add-user',
  standalone: false,
  
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  userForm!: FormGroup;
  roles: UserRole[] = [];
  showPassword = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService, 
     private roleService: UserroleService  
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  private async loadRoles(): Promise<void> {
    try {
       await this.roleService.getUserRoles().subscribe(
        roles => this.roles = roles,
        error => console.error('Error loading roles:', error)
       )
    } catch (error) {
      console.error('Error loading roles:', error);
    }
  }

  private createForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*_?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^\+?[0-9]\d{1,12}$/)
      ]],
      roleId: ['', Validators.required],
      address: this.fb.array([])
    });
    this.addAddress();
  }

  get addressFormArray(): FormArray {
    return this.userForm.get('address') as FormArray;
  }

  createAddressFormGroup(): FormGroup {
    return this.fb.group({
      street: ['', Validators.required],
      floorNumber: ['', [Validators.required, Validators.min(0)]],
      apartmentNumber: ['', Validators.min(0)],
      city: ['', Validators.required],
      zipCode: ['', [Validators.pattern(/^\d{5}$/)]]
    });
  }

  addAddress(): void {
    this.addressFormArray.push(this.createAddressFormGroup());
  }

  removeAddress(index: number): void {
    if (this.addressFormArray.length > 1) {
      this.addressFormArray.removeAt(index);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  getErrorMessage(control: any, fieldName: string): string {
    if (!control || !control.errors) return '';

    const errors = control.errors;

    if (errors['required']) return `${fieldName} is required`;
    if (errors['email']) return 'Invalid email format';
    if (errors['minlength']) return `${fieldName} must be at least ${errors['minlength'].requiredLength} characters`;
    if (errors['pattern']) {
      switch (fieldName) {
        case 'Password':
          return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
        case 'Phone Number':
          return 'Invalid phone number format';
        case 'ZIP Code':
          return 'ZIP code must be 5 digits';
        default:
          return 'Invalid format';
      }
    }
    return '';
  }

  async onSubmit(): Promise<void> {
    if (this.userForm.valid && !this.loading) {
      this.loading = true;
      try {
        const newUser = await this.userService.createUser(this.userForm.value);
        console.log('Form submitted:', this.userForm.value);
        this.userForm.reset();
        this.addressFormArray.clear();
        this.addAddress();
      } catch (error) {
        console.error('Error creating user:', error);
      } finally {
        this.loading = false;
      }
    }
  }
}
