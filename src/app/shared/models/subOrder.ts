export interface SubOrder {
    subOrderId?: number;
    orderId?: number;
    subOrderTotal?: number;
    isDelete?: boolean;
    createdBy?: number;
    createdOn?: string;
    modifiedBy?: number;
    modifiedOn?: string;
    cotainerId?: number;
    containerType?: number;
    containerWeightType?: number;
    subOrderTotalMargin?: number;
    BidScheduleId?: number;
    OrderDate?: Date;
    CutOffTime?: Date;
    suborderStatus?: string;
    suborderStatusId?: number;

}
