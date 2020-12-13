export interface OrderInvoice {
  ['orderId']: number;
  Source: string;
  Destination: string;
  OrderDate: string;
  OrderTotal: number;
  Remarks: string;
  orderStatus: string;
  // For Table
  orderInvoiceId?: number;
  orderId: number;
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
