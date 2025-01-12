import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from '../../../interface/Order';
import { User } from '../../../interface/User';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UserroleService } from '../../../services/userrole.service';

@Component({
  selector: 'app-user-detail',
  standalone: false,
  
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  userForm!: FormGroup;
  loading = false;
  isEditMode = false;
  userId!: string;
  user!: User;
  roles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private roleService: UserroleService
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.isEditMode = params['mode'] === 'edit';
    });
    this.loadRoles();
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.loadUserDetails();
    });
  }

  private initializeForm() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-]{10,}$/)]],
      roleId: ['', Validators.required],
      address: this.fb.array([])
    });
  }

  private loadUserDetails() {
    this.userService.getUserDetails(this.userId).subscribe({
      next: (user) => {
        console.log('User details retrieved', user);
        this.user = user;
        this.populateForm(user);
      },
      error: (error) => {
        console.error('Error loading user details:', error);
      },
    });
  }

  private loadRoles() {
    this.roleService.getUserRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
      }
    });
  }

  private populateForm(user: User) {
    this.userForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      roleId: user.roleId
    });

    while (this.addressFormArray.length) {
      this.addressFormArray.removeAt(0);
    }
    user.address.forEach(address => {
      this.addressFormArray.push(this.createAddressFormGroup(address));
    });

   
  }

  get addressFormArray() {
    return this.userForm.get('address') as FormArray;
  }

  createAddressFormGroup(address?: Address) {
    return this.fb.group({
      street: [address?.street || '', Validators.required],
      floorNumber: [address?.floorNumber || '', [Validators.required, Validators.min(0)]],
      apartmentNumber: [address?.apartmentNumber || '', [Validators.min(0)]],
      city: [address?.city || '', Validators.required],
      zipCode: [address?.zipCode || '', [Validators.pattern(/^\d{5}(-\d{4})?$/)]]
    });
  }

  addAddress() {
    this.addressFormArray.push(this.createAddressFormGroup());
  }

  removeAddress(index: number) {
    this.addressFormArray.removeAt(index);
  }

  getErrorMessage(control: any, fieldName: string): string {
    if (!control) return '';
    
    if (control.hasError('required')) {
      return `${fieldName} is required`;
    }
    if (control.hasError('email')) {
      return 'Invalid email address';
    }
    if (control.hasError('minlength')) {
      return `${fieldName} must be at least ${control.errors.minlength.requiredLength} characters`;
    }
    if (control.hasError('pattern')) {
      if (fieldName === 'Phone Number') {
        return 'Invalid phone number format';
      }
      if (fieldName === 'ZIP Code') {
        return 'Invalid ZIP code format';
      }
    }
    return '';
  }

  onSubmit() {
    
    if (this.userForm.valid) {
      const updatedUser = { ...this.userForm.value, _id: this.userId };
      console.log(updatedUser);
      
      this.userService.updateUserProfile(updatedUser)
    } else {
      this.markFormGroupTouched(this.userForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/admin/users']);
  }
}
