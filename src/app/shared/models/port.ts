export interface Port {
    portMasterId?: number;
    portName?: string;
    stateMasterId?: number;
    locationMasterId?: string;
    isActive?: boolean;
    createdBy?: number;
    createdOn?: Date;
    modifiedBy?: number;
    modifiedOn?: Date;
    latitude?: string;
    longitude?: string;
}