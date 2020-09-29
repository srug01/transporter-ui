import { ActivatedRoute } from '@angular/router';

import { MasterType } from './../../../shared/models/masterType';
import { CfsYardRateMaster } from './../../../shared/models/cfsyardrate';
import { YardCFSRate } from './../../../shared/models/yardcfsrate';
import { CfsPortRateMaster } from './../../../shared/models/cfsportrate';
import { PortCfsRateMaster } from './../../../shared/models/portcfsrate';

import { Component, OnInit } from '@angular/core';
import { MasterTypeService } from '../../cfs/services/master-type.service';
import { ContainerService } from '../../masters/services/container.service';
import { CfsYardRateService } from '../../masters/services/cfsyardrate.service';
import { YardCFSRateService } from '../../masters/services/yardcfsrate.service';
import { CfsPortRateService } from '../../masters/services/cfsportrate.service';
import { PortCfsRateService } from '../../masters/services/portcfsrate.service';
import { NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from './../../../shared/services/notification.service';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmBidDialogComponent } from '../../transporter/confirm-bid-dialog/confirm-bid-dialog.component';
import { take } from 'rxjs/operators';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-batch-update',
  templateUrl: './batch-update.component.html',
  styleUrls: ['./batch-update.component.scss']
})
export class BatchUpdateComponent implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  displayedColumns: string[] = [
    'containerMasterName', 'weightDesc', 'Rate', 'BidRate',
    'OrderRate',  'Action'
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
    this._containerService.getAllContainersAndWeights(masterType.masterTypeId,this.cfsId).subscribe(
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

  updateRate(rateMaster: any)
  {
    console.log(rateMaster);
    if(this.selectedMasterType.masterTypeId === 1) //CFS to Yard
    {
      this._cfsYardRate.cfsMasterId =  this.cfsId;
      this._cfsYardRate.yardMasterId = rateMaster.yardMasterId;
      this._cfsYardRate.cfsYardRateMasterId = rateMaster.rateMasterId;
      this._cfsYardRate.containerMasterId = rateMaster.containerMasterId;
      this._cfsYardRate.weightMasterId = rateMaster.weightMasterId;
      this._cfsYardRate.portMasterId = rateMaster.portMasterId;
      this._cfsYardRate.rate = rateMaster.Rate;
      this._cfsYardRate.bidMarginRate = rateMaster.BidRate;
      this._cfsYardRate.orderMarginRate = rateMaster.OrderRate;

      if (this._cfsYardRate.cfsYardRateMasterId === 0) {
        this._cfsYardRate.createdBy = this.userId;
        this._cfsYardRate.createdOn = new Date();
        this._cfsyardrateService.saveCfsYardRateMaster( this._cfsYardRate);
      } else {
        this._cfsYardRate.modifiedBy = this.userId;
        this._cfsYardRate.modifiedOn = new Date();
        this._cfsyardrateService.updateCfsYardRateMaster( this._cfsYardRate);
      }
    }
    else if(this.selectedMasterType.masterTypeId === 3) //Yard to CFS
    {
      this._yardcfsrate.cfsMasterId =  this.cfsId;
      this._yardcfsrate.yardMasterId = rateMaster.yardMasterId;
      this._yardcfsrate.yardCfsRateMasterId = rateMaster.rateMasterId;
      this._yardcfsrate.containerMasterId = rateMaster.containerMasterId;
      this._yardcfsrate.weightMasterId = rateMaster.weightMasterId;
      this._yardcfsrate.portMasterId = rateMaster.portMasterId;
      this._yardcfsrate.rate = rateMaster.Rate;
      this._yardcfsrate.bidMarginRate = rateMaster.BidRate;
      this._yardcfsrate.orderMarginRate = rateMaster.OrderRate;

      if (this._yardcfsrate.yardCfsRateMasterId === 0) {
        this._yardcfsrate.createdBy = this.userId;
        this._yardcfsrate.createdOn = new Date();
        this._yardcfsrateService.saveYardcfsrateMaster( this._yardcfsrate);
      } else {
        this._yardcfsrate.modifiedBy = this.userId;
        this._yardcfsrate.modifiedOn = new Date().toString();
        this._yardcfsrateService.updateYardcfsrateMaster( this._yardcfsrate);
      }
    }
    else if(this.selectedMasterType.masterTypeId === 4) //Port to CFS
    {
      this._portcfsrate.cfsMasterId =  this.cfsId;
      this._portcfsrate.portCfsRateMasterId = rateMaster.rateMasterId;
      this._portcfsrate.containerMasterId = rateMaster.containerMasterId;
      this._portcfsrate.weightMasterId = rateMaster.weightMasterId;
      this._portcfsrate.portMasterId = rateMaster.portMasterId;
      this._portcfsrate.rate = rateMaster.Rate;
      this._portcfsrate.bidMarginRate = rateMaster.BidRate;
      this._portcfsrate.orderMarginRate = rateMaster.OrderRate;

      if (this._portcfsrate.portCfsRateMasterId === 0) {
        this._portcfsrate.createdBy = this.userId;
        this._portcfsrate.createdOn = new Date();
        this._portcfsrateService.savePortCfsRateMaster( this._portcfsrate);
      } else {
        this._portcfsrate.modifiedBy = this.userId;
        this._portcfsrate.modifiedOn = new Date();
        this._portcfsrateService.updatePortCfsRateMaster( this._portcfsrate);
      }
    }
    else if(this.selectedMasterType.masterTypeId === 2) //CFS to Port
    {
      this._cfsportrate.cfsMasterId =  this.cfsId;
      this._cfsportrate.cfsPortRateMasterId = rateMaster.rateMasterId;
      this._cfsportrate.containerMasterId = rateMaster.containerMasterId;
      this._cfsportrate.weightMasterId = rateMaster.weightMasterId;
      this._cfsportrate.portMasterId = rateMaster.portMasterId;
      this._cfsportrate.rate = rateMaster.Rate;
      this._cfsportrate.bidMarginRate = rateMaster.BidRate;
      this._cfsportrate.orderMarginRate = rateMaster.OrderRate;

      if (this._cfsportrate.cfsPortRateMasterId === 0) {
        this._cfsportrate.createdBy = this.userId;
        this._cfsportrate.createdOn = new Date();
        this._cfsportrateService.saveCfsRateMaster( this._cfsportrate);
      } else {
        this._cfsportrate.modifiedBy = this.userId;
        this._cfsportrate.modifiedOn = new Date();
        this._cfsportrateService.updateCfsRateMaster( this._cfsportrate);
      }
    }


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
