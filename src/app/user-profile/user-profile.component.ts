import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { passwordVaildators } from '../../customValidation/password.validator';
import { AuthService } from '../services/auth.service';
import { Address } from '../interface/Order';
import { User } from '../interface/User';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  profileForm!: FormGroup;
  user!: User;
  isLoading = false;
  submitError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const decodedToken = this.authService.getDecodedToken();
    console.log("decoded token ",decodedToken.userID)
    if (!decodedToken?.userID) {
      console.error('No user ID found in token');
      return;
    }
    
    this.initForm();
    this.loadUserData(decodedToken.userID);
  }

  private initForm(): void {
    console.log("in init form")
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [
        Validators.required, 
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      phoneNumber: ['', [
        Validators.required, 
        Validators.pattern(/^\+?[\d\s-]{10,}$/)
      ]],
      address: this.fb.array([]),
      passwordUpdate: this.fb.group({
        newPassword: ['', passwordVaildators.passwordValidation()] // Custom complexity validator
      })
    });
  }

 
  

  private loadUserData(userId: string): void {
    console.log("in user details")
    this.isLoading = true;
    this.userService.getUserDetails(userId).subscribe({
      next: (user: User) => {
        console.log('User details retrieved:', user);
        this.user = user;
        this.populateForm(user);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading user data:', error);
        this.isLoading = false;
      }
    });
  }

  private populateForm(user: User): void {
    this.profileForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber
    });

    this.profileForm.get('passwordUpdate')?.patchValue({
      password: ''
    });

    const addressFormArray = this.profileForm.get('address') as FormArray;
    addressFormArray.clear();
    
    if (user.address?.length) {
      user.address.forEach((address) => {
        addressFormArray.push(this.createAddressGroup(address));
      });
    } else {
      addressFormArray.push(this.createAddressGroup());
    }
  }

  get addresses(): FormArray {
    return this.profileForm.get('address') as FormArray;
  }

  createAddressGroup(address?: Address): FormGroup {
    return this.fb.group({
      street: [address?.street || '', Validators.required],
      city: [address?.city || '', Validators.required],
      floorNumber: [address?.floorNumber || '', [
        Validators.required,
        Validators.min(0),
        Validators.pattern(/^\d+$/)
      ]],
      apartmentNumber: [address?.apartmentNumber || '', [
        Validators.min(0),
        Validators.pattern(/^\d+$/)
      ]],
      zipCode: [address?.zipCode || '', [
        Validators.pattern(/^\d{5}(-\d{4})?$/)
      ]]
    });
  }

  addAddress(): void {
    if (this.addresses.length < 5) {
      this.addresses.push(this.createAddressGroup());
    }
  }

  removeAddress(index: number): void {
    if (this.addresses.length > 1) {
      this.addresses.removeAt(index);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.profileForm.get(fieldName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  isAddressFieldInvalid(index: number, fieldName: string): boolean {
    const control = this.addresses.at(index).get(fieldName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  getFieldError(fieldName: string): string {
    const control = this.profileForm.get(fieldName);
    if (control?.errors) {
      if (control.errors['required']) return 'This field is required';
      if (control.errors['email']) return 'Please enter a valid email';
      if (control.errors['minlength']) return `Minimum length is ${control.errors['minlength'].requiredLength}`;
      if (control.errors['pattern']) return 'Invalid format';
    }
    return '';
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isLoading = true;
      this.submitError = null;
      
      const formValue = this.profileForm.value;
      const updatedData = {
        ...formValue,
        _id: this.authService.getDecodedToken()?.userID,
        password: formValue.passwordUpdate.newPassword
      };

      this.userService.updateUserProfile(updatedData)
    } else {
      this.markFormGroupTouched(this.profileForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup | FormArray): void {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
        control.markAsDirty();
      }
    });
  }

  onCancel(): void {
    if (this.user) {
      this.populateForm(this.user);
    } else {
      this.profileForm.reset();
    }
  }
}
