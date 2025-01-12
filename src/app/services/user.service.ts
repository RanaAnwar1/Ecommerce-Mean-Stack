import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../interface/User';
import { Observable, switchMap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient, private _authS:AuthService) { }
  userURL = 'http://localhost:3000/user'
  registerUser(user:User){
    return this._http.post<any>(this.userURL+'/registeruser',user).subscribe(
      response => {
        console.log('User added successfully:', response);
      },
      error => {
        console.error('Error adding user:', error);
      } 
    )
  }
  createUser(user:User){
    let token = ''
    this._authS.getAccsesToken().subscribe(data =>{
      if(data)
        token = data;
    })
    if(token)
    {
      const headers =({'Authorization': `Bearer ${token}`,'Content-type': 'application/json'})
      this._http.post<any>(this.userURL+'/createuser',user,{headers}).subscribe(
        response => {
          console.log('User added successfully:', response);
        },
        error => {
          console.error('Error adding user:', error);
        } 
      )
    }
   
  }
  getUsers():Observable<any>{
    let token = ''
    this._authS.getAccsesToken().subscribe(
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
      return this._http.get<any>(this.userURL+'/getusers',{headers})
    }
    else return throwError('No access token available');
    
  }

  getUserDetails(userId: string): Observable<any> {
    return this._authS.getAccsesToken().pipe(
      switchMap((token) => {
        if (token) {
          const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          };
          return this._http.get<any>(`${this.userURL}/getuserdetails`, { headers, params: { userId } });
        } else {
          throw new Error('No access token available');
        }
      })
    );
  }
  

  updateUserProfile(user: User): void {
    let token = '';
    
    this._authS.getAccsesToken().subscribe(data => {
      if (data) {
        token = data;
      }
    });
  
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      });
  
      this._http.put<any>(`${this.userURL}/updateuserprofile`, user, { headers }).subscribe(
        response => {
          console.log('User profile updated successfully:', response);
        },
        error => {
          console.error('Error updating user profile:', error);
        }
      );
    } else {
      console.error('No access token available');
    }
  }
  deleteUser(userID: string): void {
    let token = '';
  
    this._authS.getAccsesToken().subscribe(data => {
      if (data) {
        token = data;
      }
    });
  
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      });
    
      this._http.delete<any>(`${this.userURL}/deleteuser`, { 
        headers,
        body: { _id: userID }
      }).subscribe(
        response => {
          console.log('User deleted successfully:', response.message);
        },
        error => {
          console.error('Error deleting user:', error);
        }
      );
    } else {
      console.error('No access token available');
    }
  }
  
  
}
