export interface LocationMaster {
    locationMasterId?: number;
    locationName?: string;
    isActive?: boolean;
    stateMasterId: number;
    createdBy?: number;
    createdOn?: Date;
    modifiedBy?: number;
    modifiedOn?: Date;
}
