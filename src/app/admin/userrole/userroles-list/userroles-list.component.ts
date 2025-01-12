import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserroleService } from '../../../services/userrole.service';
import { UserRole } from '../../../interface/UserRole';

@Component({
  selector: 'app-userroles-list',
  standalone: false,
  
  templateUrl: './userroles-list.component.html',
  styleUrl: './userroles-list.component.css'
})
export class UserrolesListComponent implements OnInit {
  roles: UserRole []= [];
  constructor(private router: Router, private _userRoleService:UserroleService){}
  ngOnInit(): void {
    this._userRoleService.getUserRoles().subscribe(roles => {
      this.roles = roles;
    });
  }
  onAdd(){
    this.router.navigate(['/admin/adduserrole']);
  }
  onView(roleId: string): void {
    this.router.navigate(['/admin/userrole-details', roleId], { queryParams: { mode: 'view' } });
    console.log('View role:', roleId);
  }

  onEdit(roleId: string): void {
    this.router.navigate(['/admin/userrole-details/edit', roleId], { queryParams: { mode: 'edit' } });
    console.log('Edit role:', roleId);
  }
  

  onDelete(roleId: string): void {
    console.log('Delete role:', roleId);
    this._userRoleService.deleteUserRole(roleId)
  }
}
