export interface CfsPortRateMaster {
  cfsPortRateMasterId?: number;
  cfsMasterId?: number;
  portMasterId?: number;
  weightMasterId?: number;
  rate?: number;
  bidMarginRate?: number;
  orderMarginRate?: number;
  isActive?: boolean;
  createdBy?: number;
  createdOn?: Date;
  modifiedBy?: number;
  modifiedOn?: Date;
  containerMasterId?: number;
}
