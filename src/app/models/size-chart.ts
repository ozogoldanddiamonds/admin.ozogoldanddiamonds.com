export interface SizeChart {

  _id?: string;

  title: string;

  subCategory: string | SubCategory;

  image: string;

  description?: string;

  isActive?: boolean;

  createdAt?: string;

  updatedAt?: string;

}

export interface SubCategory {

  _id: string;

  name: string;

}   