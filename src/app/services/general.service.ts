import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  
  constructor(private _http:HttpClient,private _auth:AuthService) { }
  orderURL = 'http://localhost:3000/general'

  getGeneralData():Observable<any> {
    
    return this._http.get<any>(this.orderURL+'/getgeneral');
  }
  updateGeneralData(data: { about?: string; hours?: string; address?: string; phone?: string }):Observable<any>{
    let token = ''
    this._auth.getAccsesToken().subscribe(
      data =>{
        if(data)
          token = data;
    })
   if(token){
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
    return this._http.put<any>(this.orderURL+'/updategeneral',data,{headers})
   }else{
    throw new Error('No access token available');
   }
  }
  getContactFormData():Observable<any> {
    let token = ''
    this._auth.getAccsesToken().subscribe(
      data =>{
        if(data)
          token = data;
    })
   if(token){
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
    return this._http.get<any>(this.orderURL+'/getcontact',{headers})
   }else{
    throw new Error('No access token available');
   }
  }
  sendContactFormData(name:string,email:string,message:string):Observable<any> {
    let token = ''
    this._auth.getAccsesToken().subscribe(
      data =>{
        if(data)
          token = data;
    })
   if(token){
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
    const body = {name, email, message}
    return this._http.post<any>(this.orderURL+'/submitcontact', body, {headers})
   }
   else{
    throw new Error('No access token available');
   }
  }
}
