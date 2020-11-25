export interface PaymentCreditLimit {
  paymentId?: number;
  userId: number;
  date?: string;
  creditLimit: number;
  createdBy: number;
  createdOn: string;
  modifiedBy?: number;
  modifiedOn?: string;

}
