export interface Driver {
    driverId: number;
    firstname: string;
    lastname: string;
    emailId: string;
    mobileNumber: string;
    locationMasterId: number;
    stateMasterId: number;
    pincode: number;
    address1: string;
    address2: string;
    landmark: string;
    isActive: boolean;
    identitytype: number;
    identitynumber: string;
    userPassword?: string;
    userConfirmPassword?: string;
    userId?: number;

}
