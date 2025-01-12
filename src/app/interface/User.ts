
interface Address {
  street: string;
  floorNumber: number;
  apartmentNumber?: number;
  city: string;
  zipCode?: number;
}

export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: Address[];
  phoneNumber: string;
  roleId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
