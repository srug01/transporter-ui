export interface YardCFSRate {
  yardCfsRateMasterId?: number;
  cfsMasterId?: number;
  yardMasterId?: number;
  containerMasterId?: number;
  weightMasterId?: number;
  rate?: number;
  bidMarginRate?: number;
  orderMarginRate?: number;
  isActive?: boolean;
  createdBy?: number;
  modifiedBy?: number;
  createdOn?: string;
  modifiedOn?: string;
  portMasterId?: number;
}
