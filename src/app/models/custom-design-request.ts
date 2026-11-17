
export interface CustomDesignCustomer {
    _id?: string;
    name?: string;
    phone?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    mobile?: string;
    alternateMobile?: string;
}

export interface CustomDesignReferenceImage {
    _id?: string;
    url: string;
    publicId?: string | null;
}

export interface CustomDesignRequest {
    _id: string;
    requestNumber?: string;

    customer?: CustomDesignCustomer | null;

    jewelleryType?: string;
    designType?: string;

    referenceImages?: CustomDesignReferenceImage[];

    description?: string;

    metalType?: string | null;
    goldPurity?: string | null;
    goldColor?: string | null;
    goldWeight?: number | null;

    stoneType?: string;
    diamondType?: string | null;
    gemstoneType?: string | null;

    requiredDate?: string | Date | null;
    quantity?: number;

    preferredContactMethod?: string;
    additionalNotes?: string;

    status?: string;
    adminNotes?: string;

    quotedPrice?: number | null;
    estimatedDeliveryDate?: string | Date | null;

    createdAt?: string | Date;
    updatedAt?: string | Date;

    __v?: number;
}

export interface CustomDesignActionResponse {
    success: boolean;
    message?: string;
    data?: CustomDesignRequest;
}

export interface CustomDesignListResponse {
    success: boolean;
    message?: string;
    count?: number;
    data: CustomDesignRequest[];
    pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
