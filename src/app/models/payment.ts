// export interface Payment {

//   _id?: string;

//   subscription: any;

//   user: any;
  

//   monthNo: number;

//   amount: number;

//   dueDate: Date;

//   paymentDate: Date;

//   paymentMode: string;

//   gateway: string;

//   transactionId: string;

//   gatewayOrderId: string;

//   gatewayPaymentId: string;

//   status: string;

//   receiptNo: string;

//   remarks: string;

//   createdAt?: Date;

//   updatedAt?: Date;

// }
export interface PaymentUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Payment {
  _id: string;
  subscription: string;
  user: PaymentUser | null;

  monthNo: number;
  amount: number;

  dueDate: string;
  paymentDate: string;

  paymentMode: string;
  gateway: string;

  transactionId: string | null;
  gatewayOrderId: string | null;
  gatewayPaymentId: string | null;

  status: string;

  receiptNo: string | null;
  remarks: string;

  createdAt: string;
  updatedAt: string;
}

export interface PaymentResponse {
  success: boolean;
  data: Payment[];
  message?: string;
}