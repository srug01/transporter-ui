import { CfsPortRateMaster } from '../../../shared/models/cfsportrate';
import { Component, OnInit, Input } from '@angular/core';
import { FormErrorStateMatcher } from '../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CfsPortRateService } from '../services/cfsportrate.service';
import { PortService } from '../services/port.service';
import { WeightService } from '../services/weight.service';
import { CfsService } from '../services/cfs.service';
import { ContainerService } from '../services/container.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-cfsportrate-form',
  templateUrl: './cfsportrate-form.component.html',
  styleUrls: ['./cfsportrate-form.component.scss']
})
export class CfsportrateFormComponent implements OnInit {
  @Input('cfsportrateData') cfsportrateData: CfsPortRateMaster;
  matcher = new FormErrorStateMatcher();
  public cfsrateForm: FormGroup;
  public cfsMasters: Array<any> = [];
  public portMasters: Array<any> = [];
  public weightMasters: Array<any> = [];
  public containerMaster: Array<any> = [];
  public currentUser: User;
  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _cfsrateService: CfsPortRateService,
    private _containerService: ContainerService,
    private _portService: PortService,
    private _weightService: WeightService,
    private _cfsService: CfsService,
    private _router: Router,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.getAllPortMasters();
    this.getAllCfsMasters();
    this.getAllContainerMasters();
    this.getUserInfo();
    if (this.cfsportrateData) {
      this.cfsrateForm = this.fb.group({
        cfsPortRateMasterId: [this.cfsportrateData.cfsPortRateMasterId ? this.cfsportrateData.cfsPortRateMasterId : ''],
        cfsMasterId: [this.cfsportrateData.cfsMasterId ? this.cfsportrateData.cfsMasterId : '', Validators.required],
        portMasterId: [this.cfsportrateData.portMasterId ? this.cfsportrateData.portMasterId : '', Validators.required],
        containerMasterId: [this.cfsportrateData.containerMasterId ? this.cfsportrateData.containerMasterId : '', Validators.required],
        weightMasterId: [this.cfsportrateData.weightMasterId ? this.cfsportrateData.weightMasterId : '', Validators.required],
        rate: [this.cfsportrateData.rate ? this.cfsportrateData.rate : 0, Validators.required],
        bidMarginRate: [this.cfsportrateData.bidMarginRate ? this.cfsportrateData.bidMarginRate : 0, Validators.required],
        orderMarginRate: [this.cfsportrateData.orderMarginRate ? this.cfsportrateData.orderMarginRate : 0, Validators.required],
        isActive: [this.cfsportrateData.isActive ? this.cfsportrateData.isActive : '', Validators.required]
      });
      this.getAllWeightMastersbyContainerID(this.cfsportrateData.containerMasterId);
    } else {
      this.cfsrateForm = this.fb.group({
        cfsPortRateMasterId: [''],
        cfsMasterId: ['', Validators.required],
        portMasterId: ['', Validators.required],
        containerMasterId: ['', Validators.required],
        weightMasterId: ['', Validators.required],
        rate: [0, Validators.required],
        bidMarginRate: [0, Validators.required],
        orderMarginRate: [0, Validators.required],
        isActive: ['', Validators.required]
      });
    }
  }



  getAllContainerMasters() {
    this._containerService.getAllContainerMasters().subscribe(
      (containerMasters) => {
        this.containerMaster = containerMasters;
      },
      (err) => {
      }
    );
  }
  getAllPortMasters() {
    this._portService.getAllPortMasters().subscribe(
      (portMasters) => {
        this.portMasters = portMasters;
      },
      (err) => {
      }
    );
  }

 /*  getAllWeightMasters() {
    this._weightService.getAllWeightMasters().subscribe(
      (weightMasters) => {
        this.weightMasters = weightMasters;
      },
      (err) => {
      }
    );
  } */

  getAllWeightMastersbyContainerID(id: number){
    this.weightMasters = [];
    this.weightMasters.length = 0;
    console.log(id);

    this._weightService.getAllWeightMastersbyContainerID(id).subscribe(
      (weightMasters) => {
        this.weightMasters = weightMasters;
        console.log(weightMasters);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllCfsMasters() {
    this._cfsService.getAllCfsMasters().subscribe(
      (cfsMasters) => {
        this.cfsMasters = cfsMasters;
      },
      (err) => {
      }
    );
  }

  getUserInfo() {
    this._userService.getUsersInfo().subscribe(
      (loggedUser: User) => {
        this.currentUser = loggedUser;
      }
    );
  }

  transformCfsRateObj(cfsRate: CfsPortRateMaster): CfsPortRateMaster {
    return {
      cfsPortRateMasterId: cfsRate.cfsPortRateMasterId ? cfsRate.cfsPortRateMasterId : 0,
      cfsMasterId: cfsRate.cfsMasterId,
      portMasterId: cfsRate.portMasterId,
      weightMasterId: cfsRate.weightMasterId,
      containerMasterId: cfsRate.containerMasterId,
      rate: cfsRate.rate,
      orderMarginRate : cfsRate.orderMarginRate,
      bidMarginRate: cfsRate.bidMarginRate,
      createdBy: this.currentUser.userId,
      modifiedBy: this.currentUser.userId,
      createdOn: new Date(),
      modifiedOn: new Date(),
      isActive: cfsRate.isActive
    } as CfsPortRateMaster;
  }

  submitcfsrateForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.cfsrateForm.valid) {
      const cfsRate = this.transformCfsRateObj(this.cfsrateForm.value);
      if (!this.cfsportrateData) {
         this.saveCfsrateMaster(cfsRate);
      } else {
        this.updateCfsrateMaster(cfsRate);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  saveCfsrateMaster(cfsRate: CfsPortRateMaster) {
    this._cfsrateService.saveCfsRateMaster(cfsRate).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'CFS Rate Master Created Successfully');
        this._router.navigate(['/default/masters/cfs-port-rate/list']);
      },
      (err) => {
        console.log(err);
        this.openSnackBar('Failure !', err.error.error.message);
      }
    );
  }

  updateCfsrateMaster(cfsRate: CfsPortRateMaster) {

    this._cfsrateService.updateCfsRateMaster(cfsRate).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'CFS Rate Master Updated Successfully');
        this._router.navigate(['/default/masters/cfs-port-rate/list']);
      },
      (err) => {
        this.openSnackBar('Failure !', 'Could not update CFS Rate Master!');
      }
    );
  }

  containerTypeSelected(containerTypeId)
  {

    this.cfsrateForm.get("weightMasterId").reset();
    this.getAllWeightMastersbyContainerID(containerTypeId);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
