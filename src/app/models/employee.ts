export interface Employee {

  _id?: string;

  firstName?: string;

  lastName?: string;

  contactNumber?: string;

  role?: 'MANAGER'
        | 'SALES_EXECUTIVE'
        | 'CASHIER'
        | 'STAFF';

  subBranchId?: {

    _id?: string;

    name?: string;

  };

  photo?: string;

  aadhaarImage?: string;

  address?: string;

  location?: string;

  status?: 'ACTIVE'
          | 'INACTIVE';

  isActive?: boolean;

  createdAt?: string;

  updatedAt?: string;

}