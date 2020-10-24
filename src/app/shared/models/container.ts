import { Truck } from './truck';
export interface Container {
    containerId?: number;
    containerMasterId?: number;
    orderId?: number;
    weightType?: number;
    numberOfTrucks?: number;
    isDeleted?: boolean;
    createdBy?: number;
    createdOn?: Date;
    modifiedBy?: number;
    modifiedOn?: Date;
    trucks?: Truck[];
}
