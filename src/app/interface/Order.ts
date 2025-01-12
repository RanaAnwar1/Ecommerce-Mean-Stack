import { Product } from "./Product";

export interface Address {
    street: string;
    floorNumber: number;
    apartmentNumber?: number; 
    city: string;
    zipCode?: number; 
}
export interface OrderProduct {
    productId: Product;
    quantity: number;
    priceAtPurchase: number;
}
export interface Order {
    _id?: string;
    userId: string;
    products: OrderProduct[];
    phoneNumber: string;
    address: Address;
    deliveryDate: Date;
    orderStatus: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
    totalBillAmount: number;
    createdAt?: Date;
    updatedAt?: Date; 
}
