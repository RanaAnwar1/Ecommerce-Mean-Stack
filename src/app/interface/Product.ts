export interface Size {
  size: string;
  quantity: number;
}

export interface Inventory {
  total: number;
  sizes: Size[];
}

export interface Product {
    _id?: string;
    name: string;
    description: string;
    images: string[];
    price: number;
    gender?: 'Male' | 'Female';
    inventory: {
      total: number;
      sizes: {
        size: string;
        quantity: number;
      }[];
    };
    categoryId: string;
    subcategoryId?: string;
    isDeleted?: boolean;
    isActive?: boolean;
    newArrival?: boolean;
    createdAt?: Date; 
    updatedAt?: Date;
  }
  