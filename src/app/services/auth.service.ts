import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient) { 
    const token = localStorage.getItem('token');
    if(token){
      this.tokenSubject.next(token)
    }
  }
  apiURL ='http://localhost:3000/user/login'
  private tokenSubject: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null)
  login(loginObj:any):Observable<any> {
    return this._http.post<any>(this.apiURL, loginObj).pipe(
      tap(res=>{
        const accessToken = res.accesstoken;
        if(accessToken){
          localStorage.setItem('token',accessToken)
          this.tokenSubject.next(accessToken)
          
          console.log(accessToken);
        }
    }))
  }
  

  logout(){
    localStorage.removeItem('token')
    this.tokenSubject.next(null)
  
  }
  getAccsesToken():Observable<string|null> {
    return this.tokenSubject.asObservable()

  }
  isAuthorized(): boolean {
    return this.tokenSubject.value !== null
  }
  isAdmin():boolean{
    const token = this.tokenSubject.value
    if(token){
      const decodedToken = jwtDecode<any>(token)
      return decodedToken.userRole.name === 'admin'
    }
    else return false
  }
  getDecodedToken(){
    const token = this.tokenSubject.value
    if(token){
      return jwtDecode<any>(token)
    }
    return null
  }
}
