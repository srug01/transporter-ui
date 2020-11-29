export interface Paymenthistory{
  paymenthistoryId?: number;
  userId: number;
  creditLimit: number;
  AvailableLimit: number;
  createdBy: number;
  createdOn: string;
  modifiedBy?: number;
  modifiedOn?: string;
  Outstanding?: number;
  isCredit?: boolean;
  amount?: number;
  orderId?: number;
  orderDate?: string;
  orderAmount?: number;
  paymentReceivedDate?: string;
  paymentReceivedAmount?: number;
  paymentReceivedId?: number;
  creditAmount?: number;
  creditDate?: string;
  availableLimitAmount?: number;
  availableLimitDate?: string;
  balanceAmount?: number;
  paymentType?: number;

}
