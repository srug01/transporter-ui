export interface PaymentCreditLimit {
  paymentId?: number;
  userId: number;
  creditDate?: string;
  creditLimit: number;
  createdBy: number;
  createdOn: string;
  modifiedBy?: number;
  modifiedOn?: string;

}
