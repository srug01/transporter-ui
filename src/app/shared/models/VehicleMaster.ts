export interface VehicleMaster {
    vehicleMasterId?: number;
    vehicleNumber?: string;
    vehicleType?: string;
    vehicleCapacity?: string;
    weight?: number;
    manufactureYear?: string;
    stateId?: number;
    owned?: boolean;
    isActive?: boolean;
    createdBy?: number;
    createdOn?: string;
    modifiedBy?: number;
    modifiedOn?: string;
}