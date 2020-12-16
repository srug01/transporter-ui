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
    modifiedOn?: string;
    startDate?: string;
    endDate?: string;
    billedAmount?: number;
    isActive: boolean;
    DriverName?: string;
    sourceName?: string;
    destinationName?: string;
    vehicleNumber?: string;
    BidValue?: number;
    bidValue? :number;
    startedBy?: number;
    stoppeddBy?: number;
    isSelected? : boolean;
    isInvoiceGenerated?: boolean;
    invoiceId?: number;
    transporterInvoiceGenerated?: boolean;
    transporterInvoiceId?: number;

}
