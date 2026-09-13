export interface Diamond {

  diamondType?: string;

  shape?: string;

  carat?: number;

  color?: string;

  clarity?: string;

  cut?: string;

  polish?: string;

  symmetry?: string;

  fluorescence?: string;

  certificateLab?: string;

  certificateNumber?: string;

  certificateUrl?: string;

  diamondPrice?: number;

  totalDiamonds?: number;

}

export interface Variant {

  size?: string;

  stock?: number;

  goldPurity?: string;

  goldColor?: string;

  grossWeight?: number;

  netWeight?: number;

  makingCharges?: number;

  wastagePercentage?: number;

  goldRate?: number;

  goldPrice?: number;

  hasDiamond?: boolean;

  diamonds?: Diamond[];

  totalDiamondPrice?: number;

  basePrice?: number;

  discountPercentage?: number;

  finalPrice?: number;

}

export interface Product {

  _id?: string;

  name: string;

  slug?: string;

  shortDescription?: string;

  description?: string;

  category?: string;

  subCategory?: string;

  subSubCategory?: string;

  productType: string;

  gender?: string;

  occasion?: string;

  brand?: string;

  sku?: string;

  hallmarkCertified?: boolean;

  certificationIncluded?: boolean;

  featured?: boolean;

  bestSeller?: boolean;

  trending?: boolean;

  variants?: Variant[];

  images?: string[];

  video?: string;

  tags?: string[];

  seoTitle?: string;

  seoDescription?: string;

  isActive?: boolean;

  createdAt?: Date;

  updatedAt?: Date;

}