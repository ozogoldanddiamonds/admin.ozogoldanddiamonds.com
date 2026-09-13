export interface OrderItem {

  product: string;

  variant: string;

  quantity: number;

  unitPrice: number;

  totalPrice: number;

  productSnapshot: {

    name: string;

    slug?: string;

    image?: string;

    category?: string;

    subCategory?: string;

  };

  variantSnapshot: {

    sku?: string;

    purity?: string;

    size?: string;

    grossWeight?: number;

    netWeight?: number;

    makingCharge?: number;

    stoneType?: string;

    gender?: string;

  };

}

export interface Order {

  _id?: string;

  orderNumber?: string;

  user: string;

  address: string;

  paymentMethod: string;

  paymentStatus?: string;

  subTotal: number;

  discountAmount?: number;

  shippingCharge?: number;

  gstAmount?: number;

  totalAmount: number;

  orderStatus?: string;

  transactionId?: string;

  couponCode?: string;

  notes?: string;

  items: OrderItem[];

  createdAt?: Date;

  updatedAt?: Date;

}