export interface Payment {

  _id?: string;

  subscription: any;

  user: any;

  monthNo: number;

  amount: number;

  dueDate: Date;

  paymentDate: Date;

  paymentMode: string;

  gateway: string;

  transactionId: string;

  gatewayOrderId: string;

  gatewayPaymentId: string;

  status: string;

  receiptNo: string;

  remarks: string;

  createdAt?: Date;

  updatedAt?: Date;

}