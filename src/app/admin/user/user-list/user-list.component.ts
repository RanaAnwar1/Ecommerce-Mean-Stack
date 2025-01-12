import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../interface/User';
import { UserService } from '../../../services/user.service';
import { UserroleService } from '../../../services/userrole.service';
import { UserRole } from '../../../interface/UserRole';

@Component({
  selector: 'app-user-list',
  standalone: false,
  
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users:User[] = [];
  roles:UserRole[] = [];

  constructor(private router:Router,private _userService: UserService
    ,private _roleS:UserroleService
  ) { }

  ngOnInit(): void {
    this._userService.getUsers().subscribe(users => {
      this.users = users; 
    });
    this._roleS.getUserRoles().subscribe(roles => {
      this.roles = roles;
    });
  }
  onAdd(){
    this.router.navigate(['/admin/adduser']);
  }
  onView(userId: string): void {
    this.router.navigate(['/admin/user-details', userId], { queryParams: { mode: 'view' } });
    console.log('View user:', userId);
  }

  onEdit(userId: string): void {
    this.router.navigate(['/admin/user-details/edit', userId], { queryParams: { mode: 'edit' } });
    console.log('Edit user:', userId);
    
  }

  onDelete(userId: string): void {
    this._userService.deleteUser(userId);
    console.log('Delete user:', userId);
  }
  getRoleName(roleId: string): string {
    const role = this.roles.find(r => r._id === roleId);
    return role ? role.name : 'Role not found';
  }
}
