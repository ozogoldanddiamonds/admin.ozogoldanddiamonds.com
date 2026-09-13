import { Scheme } from "./scheme";
import { User } from "./user";



export interface UserScheme {

  _id?: string;

  user: User;

  scheme: Scheme;

  schemeName: string;

  schemeAmount: number;

  monthlyAmount: number;

  durationMonths: number;

  userPayMonths: number;

  companyPayMonths: number;

  startDate: Date;

  nextDueDate: Date;

  maturityDate: Date;

  totalInstallments: number;

  paidInstallments: number;

  remainingInstallments: number;

  totalPaidAmount: number;

  companyContribution: number;

  status: string;

  remarks: string;

  createdAt?: Date;

  updatedAt?: Date;

}