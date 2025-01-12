import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRole } from '../../../interface/UserRole';
import { UserroleService } from '../../../services/userrole.service';

@Component({
  selector: 'app-add-role',
  standalone: false,
  
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent {
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private http: HttpClient,
    private _userroleService: UserroleService
  ) {

  }
  roleForm = new FormGroup({
    name: new FormControl ('', [Validators.required, Validators.minLength(3)])
  });

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.roleForm.valid) {
      this.isSubmitting = true;
      const userRole: UserRole = this.roleForm.value as UserRole;
      this._userroleService.createUserRole(userRole)
      this.roleForm.reset(); 
    }
  }
}
