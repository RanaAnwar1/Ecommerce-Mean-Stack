import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordVaildators } from '../../customValidation/password.validator';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  constructor(private _userService:UserService,private router: Router) { }
  signupForm!: FormGroup;

  
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      birthdate: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      floorNumber: new FormControl('', [Validators.required]),
      apartmentNumber: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.pattern('^[0-9]{5}$')]),
      password: new FormControl('', [Validators.required,passwordVaildators.passwordValidation()]),
      confirmPassword: new FormControl('', [Validators.required,passwordVaildators.matchPassword()]),
    });
  }

  onSubmit() {
    const formValues = this.signupForm.value;

    const address = [{
      street: formValues.address,
      floorNumber: formValues.floorNumber,
      apartmentNumber: formValues.apartmentNumber || null,
      city: formValues.city,
      zipCode: formValues.zipCode || null
    }];
    const requestBody = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      phoneNumber: formValues.phone,
      address: address
    };
    if (this.signupForm.valid) {
      console.log('Form Submitted', this.signupForm.value);
      this._userService.registerUser(requestBody)
      this.signupForm.reset();
      this.router.navigate(['/login']);
      
    } else {
      console.log('Form Invalid');
    }
  }
}
