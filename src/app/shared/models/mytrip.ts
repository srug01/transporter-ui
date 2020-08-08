export interface Trip {
    tripId?: number;
    subOrderId?: number;
    sourceId: number;
    destinationId: number;
    assignedVehicle: number;
    assignedDriver: number;
    tripstatus?: string;
    tripStatusId?: number;
    createdBy?: number;
    createdOn?: Date;
    modifiedBy?: number;
    modifiedOn?: Date;
    startDate?: Date;
    endDate?: Date;
    billedAmount?: number;
    isActive: boolean;
    DriverName?: string;
    sourceName?: string;
    destinationName?: string;
    vehicleNumber?: string;
    BidValue?: number;
    bidValue? :number;
}
