import { Category } from "./category";
import { SubCategory } from "./subCategory";

export interface SubSubCategory {

  _id?: string;

  name: string;

  image?: string;

  category: string | Category;

  subCategory: string | SubCategory;

  isActive?: boolean;

  createdAt?: string;

  updatedAt?: string;

}