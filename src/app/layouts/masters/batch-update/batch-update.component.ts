import { ActivatedRoute } from '@angular/router';


import { MasterType } from './../../../shared/models/masterType';
import { CfsYardRateMaster } from './../../../shared/models/cfsyardrate';
import { YardCFSRate } from './../../../shared/models/yardcfsrate';
import { CfsPortRateMaster } from './../../../shared/models/cfsportrate';
import { PortCfsRateMaster } from './../../../shared/models/portcfsrate';
import { BatchFilter } from './../../../shared/models/batchFilter';

import { Component, OnInit } from '@angular/core';
import { MasterTypeService } from '../../cfs/services/master-type.service';
import { ContainerService } from '../../masters/services/container.service';
import { CfsYardRateService } from '../../masters/services/cfsyardrate.service';
import { YardCFSRateService } from '../../masters/services/yardcfsrate.service';
import { CfsPortRateService } from '../../masters/services/cfsportrate.service';
import { PortCfsRateService } from '../../masters/services/portcfsrate.service';
import { BatchUpdateService } from '../../masters/services/batchupdate.service';
import { ExcelExportService } from '../../masters/services/excelExport.service';

import { NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from './../../../shared/services/notification.service';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmBidDialogComponent } from '../../transporter/confirm-bid-dialog/confirm-bid-dialog.component';
import { take } from 'rxjs/operators';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormGroup } from '@angular/forms';
import { Batch } from 'aws-sdk/clients/all';



@Component({
  selector: 'app-batch-update',
  templateUrl: './batch-update.component.html',
  styleUrls: ['./batch-update.component.scss']
})
export class BatchUpdateComponent implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  displayedColumns: string[] = [
    'id', 'yardName','containerMasterName', 'weightDesc', 'rate', 'bidMarginRate',
    'orderMarginRate', 'Action'
  ];
  public rateForm: FormGroup;
  public masterTypes: MasterType[] = [];
  public selectedMasterType: any;
  public cfsId: number;
  public rateMasters: Array<any> = [];
  public _cfsYardRate: CfsYardRateMaster;
  public _yardcfsrate: YardCFSRate;
  public _cfsportrate: CfsPortRateMaster;
  public _portcfsrate: PortCfsRateMaster;
  public userId = parseInt(localStorage.getItem('userID'), 10);
  public batchFilter: BatchFilter = new BatchFilter();
  public IsUpdate: boolean = false;

  constructor(
    private _ngZone: NgZone,
    private _route: ActivatedRoute,
    private _masterTypeService: MasterTypeService,
    private _containerService: ContainerService,
    private _notificationService: NotificationService,

    private _cfsyardrateService: CfsYardRateService,
    private _yardcfsrateService: YardCFSRateService,
    private _cfsportrateService: CfsPortRateService,
    private _portcfsrateService: PortCfsRateService,
    private _batchUpdateService: BatchUpdateService,
    private _excelExpoertService: ExcelExportService,

    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,



  ) { }

  ngOnInit(): void {
    this.getCfsIdFromRouteParams();
    this.getMasterTypes();
  }

  getCfsIdFromRouteParams() {
    this._route.params.subscribe(
      (params) => {
        this.cfsId = params.id;
      }
    );
  }

  exportAsXLSX() {
    if (this.selectedMasterType == undefined) {
      this.openSnackBar('Info !', 'Please Select a Master Type.');
      return;
    }
    if (this.selectedMasterType.masterTypeId == 0) {
      this.openSnackBar('Info !', 'Please Select a Master Type.');
      return;
    }
    this._excelExpoertService.exportAsExcelFile(this.rateMasters, this.selectedMasterType.masterType);
  }

  getRateTableForCFS(masterType) {

    this._containerService.getAllContainersAndWeights(masterType.masterTypeId, this.cfsId).subscribe(
      (rateMasters) => {
        this.rateMasters = rateMasters;
      },
      (err) => {
        console.log(err);
      }
    );

  }

  getMasterTypes() {
    this._masterTypeService.getAllMasterTypes().subscribe(
      (masterTypes) => {
        this.masterTypes = masterTypes;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  masterTypeSelected(ev) {
    this.selectedMasterType = ev;
    this.getRateTableForCFS(this.selectedMasterType);
  }

  onCheckboxChange(ev) {
    this.IsUpdate = ev.checked;

    //this.getRateTableForCFS(this.selectedMasterType);
  }

  updateRate(rateMaster: any) {
    // CFS to Yard
    if (this.selectedMasterType.masterTypeId === 1) {
      const cfsyardrate = {
        cfsYardRateMasterId: rateMaster.cfsYardRateMasterId,
        cfsMasterId: rateMaster.cfsMasterId,
        portMasterId: rateMaster.portMasterId,
        yardMasterId: rateMaster.yardMasterId,
        weightMasterId: rateMaster.weightMasterId,
        rate: rateMaster.rate,
        bidMarginRate: rateMaster.bidMarginRate,
        orderMarginRate: rateMaster.orderMarginRate,
        containerMasterId: rateMaster.containerMasterId,
        isActive: true
      } as CfsYardRateMaster;

      if (cfsyardrate.cfsYardRateMasterId === 0) {
        cfsyardrate.createdBy = this.userId;
        cfsyardrate.createdOn = new Date();
        this._cfsyardrateService.saveCfsYardRateMaster(cfsyardrate).subscribe(
          (res) => {
            this.openSnackBar('Success !', 'CFS Yard Rate Master Created Successfully');
            this.getRateTableForCFS(this.selectedMasterType);
          },
          (err) => {
            console.log(err);
            this.openSnackBar('Failure !', err.error.error.message);
          }
        );

      } else {
        cfsyardrate.modifiedBy = this.userId;
        cfsyardrate.modifiedOn = new Date();
        this._cfsyardrateService.updateCfsYardRateMaster(cfsyardrate).subscribe(
          (res) => {
            this.openSnackBar('Success !', 'CFS Yard Rate Master Updated Successfully');
            this.getRateTableForCFS(this.selectedMasterType);

          },
          (err) => {
            console.log(err);
            this.openSnackBar('Failure !', err.error.error.message);
          }
        );

      }

    } else if (this.selectedMasterType.masterTypeId === 3) { //Yard to CFS
      const yardcfsrate = {
        yardCfsRateMasterId: rateMaster.yardCfsRateMasterId,
        cfsMasterId: rateMaster.cfsMasterId,
        portMasterId: rateMaster.portMasterId,
        yardMasterId: rateMaster.yardMasterId,
        weightMasterId: rateMaster.weightMasterId,
        rate: rateMaster.rate,
        bidMarginRate: rateMaster.bidMarginRate,
        orderMarginRate: rateMaster.orderMarginRate,
        containerMasterId: rateMaster.containerMasterId,
        isActive: true
      } as YardCFSRate;


      if (yardcfsrate.yardCfsRateMasterId === 0) {
        yardcfsrate.createdBy = this.userId;
        yardcfsrate.createdOn = new Date();
        //this._yardcfsrateService.saveYardcfsrateMaster(rateMaster);
        this._yardcfsrateService.saveYardcfsrateMaster(yardcfsrate).subscribe(
          (res) => {
            this.openSnackBar('Success !', 'Yard CFS Rate Master Created Successfully');
            this.getRateTableForCFS(this.selectedMasterType);
          },
          (err) => {
            console.log(err);
            this.openSnackBar('Failure !', err.error.error.message);
          }
        );

      } else {
        yardcfsrate.modifiedBy = this.userId;
        yardcfsrate.modifiedOn = new Date();
        //this._yardcfsrateService.updateYardcfsrateMaster(rateMaster);

        this._yardcfsrateService.updateYardcfsrateMaster(yardcfsrate).subscribe(
          (res) => {
            this.openSnackBar('Success !', 'Yard CFS Rate Master Updated Successfully');
            this.getRateTableForCFS(this.selectedMasterType);
          },
          (err) => {
            console.log(err);
            this.openSnackBar('Failure !', err.error.error.message);
          }
        );

      }

    } else if (this.selectedMasterType.masterTypeId === 4) { //Port to CFS
      const portcfsrate = {
        portCfsRateMasterId: rateMaster.portCfsRateMasterId,
        cfsMasterId: rateMaster.cfsMasterId,
        portMasterId: rateMaster.portMasterId,
        weightMasterId: rateMaster.weightMasterId,
        rate: rateMaster.rate,
        bidMarginRate: rateMaster.bidMarginRate,
        orderMarginRate: rateMaster.orderMarginRate,
        containerMasterId: rateMaster.containerMasterId,
        isActive: true
      } as PortCfsRateMaster;


      if (portcfsrate.portCfsRateMasterId === 0) {
        portcfsrate.createdBy = this.userId;
        portcfsrate.createdOn = new Date();
        // this._portcfsrateService.savePortCfsRateMaster(rateMaster);
        this._portcfsrateService.savePortCfsRateMaster(portcfsrate).subscribe(
          (res) => {
            this.openSnackBar('Success !', 'Port CFS Rate Master Created Successfully');
            this.getRateTableForCFS(this.selectedMasterType);
          },
          (err) => {
            console.log(err);
            this.openSnackBar('Failure !', err.error.error.message);
          }
        );

      } else {
        portcfsrate.modifiedBy = this.userId;
        portcfsrate.modifiedOn = new Date();
        // this._portcfsrateService.updatePortCfsRateMaster(rateMaster);
        this._portcfsrateService.updatePortCfsRateMaster(portcfsrate).subscribe(
          (res) => {
            this.openSnackBar('Success !', 'Port CFS Rate Master Updated Successfully');
            this.getRateTableForCFS(this.selectedMasterType);
          },
          (err) => {
            console.log(err);
            this.openSnackBar('Failure !', err.error.error.message);
          }
        );

      }

    } else if (this.selectedMasterType.masterTypeId === 2) { // CFS to Port

      const cfsportrate = {
        cfsPortRateMasterId: rateMaster.cfsPortRateMasterId,
        cfsMasterId: rateMaster.cfsMasterId,
        portMasterId: rateMaster.portMasterId,
        weightMasterId: rateMaster.weightMasterId,
        rate: rateMaster.rate,
        bidMarginRate: rateMaster.bidMarginRate,
        orderMarginRate: rateMaster.orderMarginRate,
        containerMasterId: rateMaster.containerMasterId,
        isActive: true
      } as CfsPortRateMaster;
      if (cfsportrate.cfsPortRateMasterId === 0) {
        cfsportrate.createdBy = this.userId;
        cfsportrate.createdOn = new Date();

        this._cfsportrateService.saveCfsRateMaster(cfsportrate).subscribe(
          (res) => {
            this.openSnackBar('Success !', 'CFS Port Rate Master Created Successfully');
            this.getRateTableForCFS(this.selectedMasterType);
          },
          (err) => {
            console.log(err);
            this.openSnackBar('Failure !', err.error.error.message);
          }
        );
      } else {
        cfsportrate.modifiedBy = this.userId;
        cfsportrate.modifiedOn = new Date();

        this._cfsportrateService.updateCfsRateMaster(cfsportrate).subscribe(
          (res) => {
            this.openSnackBar('Success !', 'CFS Port Rate Master Updated Successfully');
            this.getRateTableForCFS(this.selectedMasterType);
          },
          (err) => {
            this.openSnackBar('Failure !', 'Could not update Port CFS Rate Master!');
          }
        );
      }

    }


  }



  batchUpdate() {
    // console.log(this.IsUpdate);
    const filter: BatchFilter = {
      masterTypeId: this.selectedMasterType.masterTypeId ? this.selectedMasterType.masterTypeId : 0,
      isUpdate: this.IsUpdate,
      bulkData: this.rateMasters
    };



    // call bid api for order along with this filter
    // console.log("Batch Filter : " + JSON.stringify(filter));
    this._batchUpdateService.saveBatchRate(filter).subscribe(
      (bids) => {
        //this.bids = new MatTableDataSource(bids);
        this.openSnackBar('Success !', 'Successfully Updated');
        this.getRateTableForCFS(this.selectedMasterType);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  submitRateForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    /*  if (this.portcfsrateForm.valid) {
       const portcfsRate = this.transformCfsRateObj(this.portcfsrateForm.value);
       if (!this.portcfsrateData) {
          this.savePortCfsrateMaster(portcfsRate);
       } else {
         this.updatePortCfsrateMaster(portcfsRate);
       }
     } else {
       this.openSnackBar('Invalid Form !', 'Please review all fields');
     } */
  }

  openUpdateDialog(ev, rateMaster: any) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this._dialog.open(ConfirmBidDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Rate Master : " + JSON.stringify(rateMaster));
        this.updateRate(rateMaster);
      }
    });
  }

  openSubmitDialog(ev) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this._dialog.open(ConfirmBidDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.batchUpdate();
      }
    });
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
