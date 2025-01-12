import { Product } from "./Product";

export interface CartProduct {
    productId: Product; 
    quantity: number;  
}
  

export interface Cart {
    _id?: string;           
    userId: string;        
    products: CartProduct[]; 
    createdAt?: Date;  
    updatedAt?: Date; 
}
  