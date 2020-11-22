export interface Paymenthistory{
  paymenthistoryId?: number;
  userId: number;
  creditLimit: number;
  AvailableLimit: number;
  createdBy: number;
  createdOn: string;
  modifiedBy?: number;
  modifiedOn?: string;
}
