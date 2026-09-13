export interface Coupon {

  _id?: string;

  code: string;

  discountType: 'PERCENTAGE' | 'FLAT';

  value: number;

  minOrderAmount: number;

  expiryDate: Date;

  isActive: boolean;

  createdAt?: Date;

  updatedAt?: Date;

}