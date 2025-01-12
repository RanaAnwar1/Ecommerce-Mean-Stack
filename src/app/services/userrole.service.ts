import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserRole } from '../interface/UserRole';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserroleService {

  constructor(private _http:HttpClient, private _auth:AuthService) { }
  userRoleURL = 'http://localhost:3000/userRoles'
  
  getUserRoles():Observable<any> {
    let token = ''
    this._auth.getAccsesToken().subscribe(
      data =>{
        if(data)
          token = data;
    })
    if(token)
    {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
      return this._http.get<any>(`${this.userRoleURL}/getuserroles`, { headers })
    }
    else return throwError('No access token available');
  
  }
  createUserRole(userRole:UserRole){
    let token = ''
    this._auth.getAccsesToken().subscribe(
      data =>{
        if(data)
          token = data;
      }
    )
    if(token){
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
      return this._http.post<any>(`${this.userRoleURL}/createuserrole`, userRole, { headers }).subscribe(
        response => {
          console.log('User role created successfully:', response);
        },
        error => {
          console.error('Error creating user role:', error);
        }
      )
    }
    else return throwError('No access token available');

  }
  deleteUserRole(userRoleID: string): void {
    this._auth.getAccsesToken().subscribe(
      token => {
        if (token) {
          const headers =({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          });
          this._http
            .delete<any>(`${this.userRoleURL}/deleteuserrole`, { headers, body: { userRoleID } })
            .subscribe(
              response => {
                console.log('User role deleted successfully:', response);
              },
              error => {
                console.error('Error deleting user role:', error);
              }
            );
        } else {
          console.error('No access token available');
        }
      },
      error => {
        console.error('Error retrieving token:', error);
      }
    );
  }
  updateUserRole(userRole: UserRole): void {
    this._auth.getAccsesToken().subscribe(
      token => {
        if (token) {
          const headers =({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          });
          this._http
            .put<any>(`${this.userRoleURL}/updateuserrole`, userRole, { headers })
            .subscribe(
              response => {
                console.log('User role updated successfully:', response);
              },
              error => {
                console.error('Error updating user role:', error);
              }
            );
        } else {
          console.error('No access token available');
        }
      },
      error => {
        console.error('Error retrieving token:', error);
      }
    );
  }

  
}
