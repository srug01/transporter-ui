export interface TripInvoice {
    ['orderId']: number;
    Source: string;
    Destination: string;
    OrderDate: string;
    OrderTotal: number;
    Remarks: string;
    orderStatus: string;
    // For Table
    tripId: number;
    subOrderId: number;
    invoiceId?: number;
    invoiceNumber?: string;
    originalamount: number;
    otheramount?: number;
    invoiceamount: number;
    remarks?: string;
    createdBy?: number;
    createdFor?: number;
    createdOn?: string;
    modifiedBy?: number;
    modifiedOn?: string;

}
