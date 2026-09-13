export interface Review {

  _id?: string;

  productId?: any;

  userId?: any;

  rating?: number;

  title?: string;

  text?: string;

  tags?: string[];

  images?: string[];

  videos?: string[];

  createdAt?: Date;

  updatedAt?: Date;

}