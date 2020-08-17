export interface TripDetails {
    AssignedDriver: string;
    AssignedVehicle: string;
    OrderContainer: string;
    OrderDate: Date;
    Orderweight: string;
    StartedAt: Date;
    StartedBy: string;
    StoppedAt: Date;
    StoppedBy: string;
    TransporterContainer: string;
    TransporterName: string;
    TransporterWeight: string;
    billedAmount: number;
    destinationId: number;
    destinationName: string;
    sourceId: number;
    sourceName: string;
    subOrderId: number;
    tripId: number;
    tripstatus: string;
}
