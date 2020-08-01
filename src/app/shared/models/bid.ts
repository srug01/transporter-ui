
export interface Bid {
    bidName?: string;
    bidId?: number;
    originalRate?: number;
    exhibitionDate?: string;
    subOrderId?: number;
    isActive?: boolean;
    createdBy?: number;
    createdOn?: string;
    bidUpperLimit?: number;
    modifiedBy?: number;
    modifiedOn?: string;
    bidLowerLimit?: number;
    bidRate?: number;
    bidValue?: number;
    marginPercent?: number;
}
