import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, switchMap } from 'rxjs';
import { Address, Order } from '../interface/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http:HttpClient,private _auth:AuthService) { }
  orderURL = 'http://localhost:3000/orders'

  viewAllOrders():Observable<any>{
    return this._auth.getAccsesToken().pipe(
      switchMap((token)=>{
        const headers = ({'Authorization': `Bearer ${token}`})
        return this._http.get<any>(`${this.orderURL}/viewallorders`, {headers})
      }
    ))
  }
  viewUserorders(userId:string):Observable<any>{
    return this._auth.getAccsesToken().pipe(
      switchMap((token)=>{
        const body = {userId}
        const headers = ({'Authorization': `Bearer ${token}`})
        return this._http.get<any>(`${this.orderURL}/viewuserorders`, {headers, params:body})
      }
    ))
  }
  viewOrderDetails(orderId: string){
    return this._auth.getAccsesToken().pipe(
      switchMap((token)=>{
        const body = {orderId}
        const headers = ({'Authorization': `Bearer ${token}`})
        return this._http.get<any>(`${this.orderURL}/vieworderdetails`, {headers, params:body})
      }
    ))
  }
  placeOrder(address:Address, phoneNumber:string){
    return this._auth.getAccsesToken().pipe(
      switchMap((token)=>{
        const body = {address, phoneNumber}
      const headers = ({'Authorization': `Bearer ${token}`})
      return this._http.post<any>(`${this.orderURL}/placeorder`, body, {headers})
      }
    ))
  }
  updateOrderStatus(orderId: string, status: string){
    console.log("order status called", orderId, status);
    let token = ''
    this._auth.getAccsesToken().subscribe(
      data =>{
        if(data)
          token = data;
      }
    )
    if(token)
    {
      console.log("token is", token);
      const headers = ({'Authorization': `Bearer ${token}`})
      const body = {orderId, status}
      return this._http.put<any>(`${this.orderURL}/updateorderstatus`, body, {headers}).subscribe(
        response => {
          console.log('Order status updated successfully:', response.message);
        },
        error => {
          console.error('Error updating order status:', error);
        }
      )
    }
    else {
      throw new Error('Access token not found');
    }
  }
  deleteOrder(orderId: string){
    console.log('Delete order', orderId);
    let token =''
    this._auth.getAccsesToken().subscribe(
      data =>{
        if(data)
          token = data;
      }
    )
    if(token){
      const headers = ({'Authorization': `Bearer ${token}`})
      return this._http.delete<any>(`${this.orderURL}/deleteorder`, {headers, body:{orderId}}).subscribe(
        response => {
          console.log('Order deleted successfully:', response.message);
        },
        error => {
          console.error('Error deleting order:', error);
        }
      )
    }
    else{
      throw new Error('Access token not found');
    }
  }
}
