import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoryURL = 'http://localhost:3000/category'
  constructor(private _http:HttpClient, private _auth:AuthService) { }

  getCategory():Observable<any> {
    return this._http.get<any>(this.categoryURL+'/getcategory');
  }
  getSubcategory(categoryId:string):Observable<any> {
    return this._http.get<any>(this.categoryURL+`/getsubcategory?categoryID=${categoryId}`);
  }
   createCategory(formData:FormData){
    let token = ''
    this._auth.getAccsesToken().subscribe(
      data =>{
        if(data)
          token = data;
      }
    )
    if(token){
      const headers = ({'Authorization': `Bearer ${token}`})
      
      this._http.post<any>(this.categoryURL+'/createcategory',formData,{headers}).subscribe(
        response => {
          console.log('Category created successfully:', response.message);
        },
        error => {
          console.error('Error creating category:', error);
        }
      )
    }
   }
   createSubcategory(categoryID:string,name:string){
    let token = ''
    this._auth.getAccsesToken().subscribe(
      data =>{
        if(data)
          token = data;
      }
    )
    if(token){
      const body = {categoryID,name}
      const headers = ({'Authorization': `Bearer ${token}`})
      this._http.post<any>(this.categoryURL+'/createsubcategory',body,{headers}).subscribe(
        response => {
          console.log('Subcategory created successfully:', response.message);
        },
        error => {
          console.error('Error creating subcategory:', error);
        }
      )
    }
   }
   updateCategory(formData: FormData) {
    let token =''
    this._auth.getAccsesToken().subscribe(
      data =>{
        if(data)
          token = data;
      }
    )
    if(token){
      const headers = ({'Authorization': `Bearer ${token}`})
      this._http.put<any>(this.categoryURL+'/updatecategory',formData,{headers}).subscribe(
        response => {
          console.log('Category updated successfully:', response.message);
        },
        error => {
          console.error('Error updating category:', error);
        }
      )
    }
   }
   updateSubcategory(categoryID:string,oldSubcategory:string,newSubcategory:string){
    let token = ''
    this._auth.getAccsesToken().subscribe(
      data =>{
        if(data)
          token = data;
      }
    )
    if(token){
      const body = {categoryID,oldSubcategory,newSubcategory}
      const headers = ({'Authorization': `Bearer ${token}`})
      this._http.put<any>(this.categoryURL+'/updatesubcategory',body,{headers}).subscribe(
        response => {
          console.log('Subcategory updated successfully:', response.message);
        },
        error => {
          console.error('Error updating subcategory:', error);
        }
      )
    }

   }
   deleteCategory(categoryID:string){
    let token = ''
    this._auth.getAccsesToken().subscribe(
      data =>{
        if(data)
          token = data;
      }
    )
    if(token){
      const headers = ({'Authorization': `Bearer ${token}`})
      this._http.delete<any>(this.categoryURL+'/deletecategory',{headers, body:{categoryID}}).subscribe(
        response => {
          console.log('Category deleted successfully:', response.message);
        },
        error => {
          console.error('Error deleting category:', error);
        }
      )
    }

   }
   deleteSubcategory(categoryID:string,subCategoryname:string){
    let token = ''
    this._auth.getAccsesToken().subscribe(
      data =>{
        if(data)
          token = data;
      }
    )
    if(token){
      const body = {categoryID,subCategoryname}
      const headers = ({'Authorization': `Bearer ${token}`})
      this._http.delete<any>(this.categoryURL+'/deletesubcategory',{headers, body}).subscribe(
        response => {
          console.log('Subcategory deleted successfully:', response.message);
        },
        error => {
          console.error('Error deleting subcategory:', error);
        }
      )
    }
   }
}
