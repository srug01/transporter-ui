export interface BidUserMapping {
    bidusermappingId?: number;
    bidId: number;
    userId: number;
    bidName: string;
    bidValue: number;
    biduserStatus?: string;
    biduserStatusId?: number;
    bidLowerLimit:string;
    SourceName:string;
    destinationName:string;
    containerMasterName:string;
    weightDesc:string;
    containerMasterId:number;
    weightMasterId:number;
    originalRate:number;

}
