export interface ReferenceImage {
    _id?: string;
    url: string;
    publicId?: string | null;
}

export interface Customer {
    _id: string;

    firstName?: string;
    lastName?: string;
    fullName?: string;
    name?: string;

    mobile?: string;
    phone?: string;
    mobileNumber?: string;
    alternateMobile?: string;

    email?: string;
    profileImage?: string;

    address?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
}

export interface Category {
    _id: string;
    name: string;
    image?: string;
}

export interface SubCategory {
    _id: string;
    name: string;
    image?: string;
}

export interface SubSubCategory {
    _id: string;
    name: string;
    image?: string;
}

export interface CustomDesignRequest {
    _id: string;

    requestNumber: string;

    customer: Customer;

    category: Category;

    subCategory: SubCategory;

    subSubCategory: SubSubCategory;

    referenceImages: ReferenceImage[];

    description: string;

    metalType?: 'gold' | 'silver' | 'platinum' | null;

    metalPurity?: string | null;

    metalColor?: 'yellow' | 'white' | 'rose' | null;

    stonePreference?: string | null;

    budget?: number | null;

    requiredDate?: string | null;

    status:
    | 'NEW'
    | 'CONTACTED'
    | 'DISCUSSION'
    | 'QUOTATION_SENT'
    | 'ACCEPTED'
    | 'ORDER_CREATED'
    | 'IN_PRODUCTION'
    | 'COMPLETED'
    | 'REJECTED'
    | 'CANCELLED';

    adminNotes?: string | null;

    createdAt: string;

    updatedAt: string;
}

export interface CustomDesignListResponse {
    success: boolean;

    data: CustomDesignRequest[];

    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface CustomDesignSingleResponse {
    success: boolean;

    message?: string;

    data: CustomDesignRequest;
}

export interface CustomDesignActionResponse {
    success: boolean;

    message: string;

    data?: CustomDesignRequest;
}