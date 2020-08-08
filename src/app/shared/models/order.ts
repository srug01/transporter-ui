export interface Order {
    orderId?: number;
    orderTypeId?: number;
    orderDate?: Date;
    masterTypeId?: number;
    sourceId?: number;
    destinationId?: number;
    sourceType?: string;
    destinationType?: string;
    orderRemarks?: string;
    orderAddress?: string;
    isDeleted?: boolean;
    isVerified?: boolean;
    orderStatus?: string;
    orderStatusId?: number;
    createdBy?: number;
    createdOn?: Date;
    modifiedBy?: number;
    modifiedOn?: Date;
    totalRate?: number;
    profitRate?: number;
    profitMarginPercentage?: number;
    rateExcludingProfit?: number;
    containers?: any;
    portTerminalId?: number;
    timeslotMasterId?: number;
}
