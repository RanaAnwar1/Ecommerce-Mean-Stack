export interface Subcategory{
    _id?: string;
    name: string;
}
export interface Category{
    _id?: string;
    name: string;
    image?:string;
    subcategories?: Subcategory[];
    isDeleted?: boolean;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}