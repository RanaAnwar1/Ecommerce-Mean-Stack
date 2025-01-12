import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartURL = 'http://localhost:3000/cart'
  constructor(private _http:HttpClient, private _auth:AuthService) { }

  viewAllCarts():Observable<any>{
    return this._auth.getAccsesToken().pipe(
      switchMap((token) => {
        if (token) {
          const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          };
          return this._http.get<any>(`${this.cartURL}/viewallcarts`, { headers });
        } else {
          throw new Error('Access token not found');
        }
      })
    );
  }
  viewCart(){
    return this._auth.getAccsesToken().pipe(
      switchMap((token) => {
        if (token) {
          const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          };
          return this._http.get<any>(`${this.cartURL}/viewcart`, { headers });
        } else {
          throw new Error('Access token not found');
        }
      })
    );
  }
  viewCartDetails(cartId:string):Observable<any>{
    return this._auth.getAccsesToken().pipe(
      switchMap((token) => {
        if (token) {
          const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          };
          return this._http.get<any>(`${this.cartURL}/viewcartdetails/?cartId=${cartId}`, { headers });
        } else {
          throw new Error('Access token not found');
        }
      })
    );
  }
  updateCart(productId: string, quantity: number){
    let token = ''
    this._auth.getAccsesToken().subscribe((data)=>{
      if(data)
        token = data
    })
    if(token){
      const headers = ({
        'Authorization': `Bearer ${token}`
      });
      console.log("headers",headers)
      const body = { productId, quantity };
      console.log("body of update",body)
      
     this._http.put(`${this.cartURL}/updatecart`, body, { headers }).subscribe(
      response => {
        console.log('Cart updated successfully:', response);
      },
      error => {
        console.error('Error updating cart:', error);
      }
    )
    }
 
  }
  removeProductFromCart(productId: string) {
    let token = ''
    this._auth.getAccsesToken().subscribe((data)=>{
      if(data)
        token = data
    })
    if(token){
      console.log("remove product from cart admin token",token)
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      console.log("headers",headers)
       return this._http.delete(`${this.cartURL}/removeproduct`, { headers, body : {productId} }).subscribe(
        response => {
          console.log('Product removed from cart successfully:', response);
        },
        error => {
          console.error('Error removing product from cart:', error);
        }
      )
    }
    else {
      throw new Error('Access token not found');
    }
    
  }
  deleteCart(cartId: string){
    let token = ''
    this._auth.getAccsesToken().subscribe((data)=>{
      if(data)
        token = data
    })
    if(token){
      console.log("delet cart admin token",token)
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      console.log("headers",headers)
      return this._http.delete(`${this.cartURL}/deletecart`, { headers, body : {cartId} }).subscribe(
        response => {
          console.log('Cart deleted successfully:', response);
        },
        error => {
          console.error('Error deleting cart:', error);
        }
      )

    } else {
          throw new Error('Access token not found');
    }
    
  }

}
