
export interface User {

  _id?: string;

  name?: string;

  phone?: string;

  email?: string;

  password?: string;

  token?: string;

  newPhone?: string;

  newEmail?: string;

  OTP?: string;

  OTPExpires?: string;

  isVerified?: boolean;

  role?: 'BRANCH' | 'SUB_BRANCH';

  contactNumber?: string;

  address?: string;

  location?: string;

  branchId?: string;

  status?: 'ACTIVE' | 'INACTIVE';

  permissions?: string[];

  isActive?: boolean;

  resetToken?: string;

  resetTokenExpire?: string;

  createdAt?: string;

  updatedAt?: string;

}