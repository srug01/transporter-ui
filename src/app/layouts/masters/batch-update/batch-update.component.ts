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
    'containerMasterName', 'weightDesc', 'rate', 'bidMarginRate',
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

    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
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

  getRateTableForCFS(masterType) {
    console.log(this.cfsId);
    console.log(this.selectedMasterType);
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

  updateRate(rateMaster: any) {
    console.log(rateMaster);
    // CFS to Yard
    if (this.selectedMasterType.masterTypeId === 1) {
      rateMaster.cfsMasterId = this.cfsId;

      if (rateMaster.cfsYardRateMasterId === 0) {
        rateMaster.createdBy = this.userId;
        rateMaster.createdOn = new Date();
        this._cfsyardrateService.saveCfsYardRateMaster(rateMaster);
      } else {
        rateMaster.modifiedBy = this.userId;
        rateMaster.modifiedOn = new Date();
        this._cfsyardrateService.updateCfsYardRateMaster(rateMaster);
      }
      this.getRateTableForCFS(this.selectedMasterType);
    } else if (this.selectedMasterType.masterTypeId === 3) { //Yard to CFS
      rateMaster.cfsMasterId = this.cfsId;


      if (rateMaster.yardCfsRateMasterId === 0) {
        rateMaster.createdBy = this.userId;
        rateMaster.createdOn = new Date();
        this._yardcfsrateService.saveYardcfsrateMaster(rateMaster);
      } else {
        rateMaster.modifiedBy = this.userId;
        rateMaster.modifiedOn = new Date().toString();
        this._yardcfsrateService.updateYardcfsrateMaster(rateMaster);
      }
      this.getRateTableForCFS(this.selectedMasterType);
    } else if (this.selectedMasterType.masterTypeId === 4) { //Port to CFS
      rateMaster.cfsMasterId = this.cfsId;


      if (rateMaster.portCfsRateMasterId === 0) {
        rateMaster.createdBy = this.userId;
        rateMaster.createdOn = new Date();
        this._portcfsrateService.savePortCfsRateMaster(rateMaster);
      } else {
        rateMaster.modifiedBy = this.userId;
        rateMaster.modifiedOn = new Date();
        this._portcfsrateService.updatePortCfsRateMaster(rateMaster);
      }
      this.getRateTableForCFS(this.selectedMasterType);
    } else if (this.selectedMasterType.masterTypeId === 2) { // CFS to Port
      rateMaster.cfsMasterId = this.cfsId;

      if (rateMaster.cfsPortRateMasterId === 0) {
        rateMaster.createdBy = this.userId;
        rateMaster.createdOn = new Date();
        this._cfsportrateService.saveCfsRateMaster(rateMaster);
      } else {
        rateMaster.modifiedBy = this.userId;
        rateMaster.modifiedOn = new Date();
        this._cfsportrateService.updateCfsRateMaster(rateMaster);
      }
      this.getRateTableForCFS(this.selectedMasterType);
    }


  }



  batchUpdate() {
    console.log(this.rateMasters);
    const filter: BatchFilter = {
      masterTypeId: this.selectedMasterType.masterTypeId ? this.selectedMasterType.masterTypeId : 0,
      isUpdate: false,
      bulkData: this.rateMasters
    };



    // call bid api for order along with this filter
    console.log("Batch Filter : " + JSON.stringify(filter));
    this._batchUpdateService.saveBatchRate(filter).subscribe(
      (bids) => {
        //this.bids = new MatTableDataSource(bids);

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
