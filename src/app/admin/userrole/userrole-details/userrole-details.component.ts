import { Component } from '@angular/core';
import { UserRole } from '../../../interface/UserRole';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UserroleService } from '../../../services/userrole.service';

@Component({
  selector: 'app-userrole-details',
  standalone: false,
  
  templateUrl: './userrole-details.component.html',
  styleUrl: './userrole-details.component.css'
})
export class UserroleDetailsComponent {
  role!: UserRole;
  isEditMode = false;
  errorMessage = '';
  successMessage = '';
  roleForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private _userRoleService: UserroleService
  ) {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.isEditMode = data['mode'] === 'edit';
    });
  
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadRoleDetails(id);
    });
    
    
  }

  loadRoleDetails(id: string): void {
    this._userRoleService.getUserRoles().subscribe({
      next: (roles: UserRole[]) => {
        const role = roles.find(r => r._id === id);
        if (role) {
          this.role = role;
          if (this.isEditMode) {
            this.roleForm.patchValue({
              name: role.name
            });
          }
        } else {
          this.errorMessage = 'Role not found';
        }
        
      },
      error: (error) => {
        this.errorMessage = 'Failed to load roles';
       
      }
    });
  }

  onSubmit(): void {
    if (this.roleForm.valid && this.role) {
    
      const updatedRole: UserRole = {
        _id:this.role._id,
        name: this.roleForm.get('name')?.value
      };
      this._userRoleService.updateUserRole(updatedRole);
      this.successMessage = 'Role updated successfully!';
      this.router.navigate(['/admin/user-roles']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/user-roles']);
  }
  onEdit(): void {
    if (this.role && this.role._id) {
      this.router.navigate(['/admin/userrole-details/edit', this.role._id]);
    } else {
      this.errorMessage = 'Role ID is missing';
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleString();
  }
}
