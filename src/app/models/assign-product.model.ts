import { Product } from "./product";


export interface AssignedProduct {

  _id: string;

  branchId: string;

  subBranchId: string;
  productId: any;

  variantId: string;

  assignedQuantity: number;
  createdAt: string;

}