export interface PortCfsRateMaster {
  portCfsRateMasterId?: number;
  cfsMasterId?: number;
  portMasterId?: number;
  weightMasterId?: number;
  containerMasterId?: number;
  rate?: number;
  bidMarginRate?: number;
  orderMarginRate?: number;
  isActive?: boolean;
  createdBy?: number;
  createdOn?: string;
  modifiedBy?: number;
  modifiedOn?: string;

}
