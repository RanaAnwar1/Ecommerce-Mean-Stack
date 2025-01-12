import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private _auth:AuthService, private _router:Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(loginForm: FormGroup) {
    if (this.loginForm.valid) {
      this._auth.login(this.loginForm.value).subscribe(
        {
          next:()=>{
            const decodedToken = this._auth.getDecodedToken()
            if(decodedToken){
              if(decodedToken.userRole.name == 'admin'){
                this._router.navigate(['/admin/users'])
              }
              else if(decodedToken.userRole.name == 'user'){
                this._router.navigate(['/home'])
              }
            }
            
          },
          error:() => {
            console.error('Invalid email or password');
            alert('Please enter a valid email or password')
            this.loginForm.reset()
          }
        }
      )
      console.log('Login Data:', this.loginForm.value);
    }
  }
}
