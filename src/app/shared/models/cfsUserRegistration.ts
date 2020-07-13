export interface CfsUserRegistration {
    cfsUserRegistrationId?: number;
    cfsId?: number;
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
    createdOn?: string;
    modifiedBy?: number;
    modifiedOn?: string;
}
