import { Paymenthistory } from './paymenthistory';
import { Paymentreceived } from './paymentreceived';
import { Payments } from './payments';

export interface CfsUserRegistration {
    cfsUserRegistrationId?: number;
    cfsMasterId?: number;
    userTypeId?: number;
    cfsUserName?: string;
    cfsUserDesignation?: string;
    cfsUserDepartment?: string;
    cfsUserMobileNumber?: string;
    cfsUserEmail?: string;
    cfsUserPassword?: string;
    userId?: number;
    isActive?: boolean;
    isVerified?: boolean;
    createdBy?: number;
    createdOn?: Date;
    modifiedBy?: number;
    modifiedOn?: Date;
    roleName?: string;
    payments?: Payments[];
    paymentsReceived?: Paymentreceived[];
    paymenthistories?: Paymenthistory[];
}
