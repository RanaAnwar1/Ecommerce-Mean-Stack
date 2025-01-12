import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Product } from '../interface/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

 
  constructor(private _http:HttpClient,private _auth:AuthService) { }

  productURL = 'http://localhost:3000/product'
  staticurl = 'http://localhost:3000/images/'
  



  getProducts():Observable<any>{
    return this._http.get<any>(this.productURL+"/getproducts")
  }
  getProductDetails(productId: string):Observable<any>{
      return this._http.get<any>(this.productURL+`/getproductdetails?productId=${productId}`)
  }

  createProduct(formData:FormData){
    let token = ''
    this._auth.getAccsesToken().subscribe(data=>{
      if(data)
        token = data;
    })
    if(token){
      const headers = ({'Authorization': `Bearer ${token}`})
      this._http.post<Product>(this.productURL+'/createproduct',formData,{headers}).subscribe(
        response => {
          console.log('Product created successfully:', response);
        },
        error => {
          console.error('Error creating product:', error);
        }
      )
    }
  }
  updateProduct(productID:string,formData:FormData){
    let token = ''
    this._auth.getAccsesToken().subscribe(data=>{
      if(data)
        token = data;
    })
    if(token){
      formData.append('productID', productID);
      console.log("formdata in update",formData);
      const headers = ({'Authorization': `Bearer ${token}`})
      this._http.put<any>(this.productURL+'/updateproduct',formData,{headers}).subscribe(
        response => {
          console.log('Product updated successfully:', response.message);
        },
        error => {
          console.error('Error updating product:', error);
        }
      );
    }
  }
  deleteProduct(productId: string){
    let token =''
    this._auth.getAccsesToken().subscribe(data=>{
      if(data)
        token = data;
    })
    if(token){
      const headers = ({'Authorization': `Bearer ${token}`,'Content-type': 'application/json'})
       this._http.delete<any>(this.productURL+'/deleteproduct',{headers,
       body:{productId} }).subscribe(
        response => {
          console.log('Product deleted successfully:', response.message);
        },
        error => {
          console.error('Error deleting product:', error);
        }
      );
    } else {
      console.error('No access token available');
    }
  }
}
