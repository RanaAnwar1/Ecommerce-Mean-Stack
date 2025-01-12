import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export interface MenuItem {
  label: string;
  route: string;
  icon?: string;
  submenu?: MenuItem[];
}
@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  constructor(private router: Router,private _auth:AuthService) {}

  ngOnInit(): void {
    console.log(this._auth.getDecodedToken())
  }

}
