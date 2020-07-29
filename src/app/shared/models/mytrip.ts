export interface Mytrip {
    tripId?: number;
    subOrderId?: number;
    sourceId: number;
    destinationId: number;
    assignedVehicle:number;
    assignedDriver:number;
    status:string;  
    createdBy?: number;
    createdOn?: Date;
    modifiedBy?: number;
    modifiedOn?: Date;
    startDate?:Date;
    endDate?:Date;
    billedAmount?:number;
    isActive:boolean;
   
}