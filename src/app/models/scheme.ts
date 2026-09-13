export interface Scheme {

  _id?: string;

  // Scheme Name
  name: string;

  // Total Amount
  amount: number;

  // Duration
  durationMonths: number;

  // User Pays
  userPayMonths: number;

  // Company Pays
  companyPayMonths: number;

  // Auto Calculated
  monthlyAmount?: number;

  // Description
  description: string;

  // Benefits
  benefits?: string[];

  // Terms & Conditions
  terms?: string;

  // Popular
  isPopular?: boolean;

  // Display Order
  displayOrder?: number;

  // Status
  isActive?: boolean;

  createdAt?: Date;

  updatedAt?: Date;

}