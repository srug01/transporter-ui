export interface Paymentreceived{
  paymentreceivedId?: number;
  userId: number;
  receivedDate: string;
  Amount: number;
  paymentMode: string;
  TransactionId?: string;
  Remarks?: string;
  createdBy: number;
  createdOn: string;
  modifiedBy?: number;
  modifiedOn?: string;
}
