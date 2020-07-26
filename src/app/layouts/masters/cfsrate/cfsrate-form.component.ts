import { Cfsrate } from './../../../shared/models/cfsrate';
import { Component, OnInit, Input } from '@angular/core';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CfsrateService } from '../services/cfsrate.service';
import { PortService } from '../services/port.service';
import { WeightService } from '../services/weight.service';
import { CfsService } from '../services/cfs.service';
import { ContainerService } from '../services/container.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-cfsrate-form',
  templateUrl: './cfsrate-form.component.html',
  styleUrls: ['./cfsrate-form.component.scss']
})
export class CfsrateFormComponent implements OnInit {
  @Input('cfsrateData') cfsrateData: Cfsrate;
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
    private _cfsrateService: CfsrateService,
    private _containerService: ContainerService,
    private _portService: PortService,
    private _weightService: WeightService,
    private _cfsService: CfsService,
    private _router: Router,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.getAllPortMasters();
    //this.getAllWeightMasters();
    this.getAllCfsMasters();
    this.getAllContainerMasters();
    this.getUserInfo();
    if (this.cfsrateData) {
      this.cfsrateForm = this.fb.group({
        cfsRateId: [this.cfsrateData.cfsRateId ? this.cfsrateData.cfsRateId : ''],
        cfsMasterId: [this.cfsrateData.cfsMasterId ? this.cfsrateData.cfsMasterId : '', Validators.required],
        portMasterId: [this.cfsrateData.portMasterId ? this.cfsrateData.portMasterId : '', Validators.required],
        containerMasterId: [this.cfsrateData.containerMasterId ? this.cfsrateData.containerMasterId : '', Validators.required],
        weightMasterId: [this.cfsrateData.weightMasterId ? this.cfsrateData.weightMasterId : '', Validators.required],
        rate: [this.cfsrateData.rate ? this.cfsrateData.rate : 0, Validators.required],
        isActive: [this.cfsrateData.isActive ? this.cfsrateData.isActive : '', Validators.required]
      });
    } else {
      this.cfsrateForm = this.fb.group({
        cfsRateId: [''],
        cfsMasterId: ['', Validators.required],
        portMasterId: ['', Validators.required],
        containerMasterId: ['', Validators.required],
        weightMasterId: ['', Validators.required],
        rate: [0, Validators.required],
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

    this._weightService.getAllWeightMastersbyContainerID(id).subscribe(
      (weightMasters) => {
        this.weightMasters = weightMasters;
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

  transformCfsRateObj(cfsRate: Cfsrate): Cfsrate {
    return {
      cfsRateId: cfsRate.cfsRateId ? cfsRate.cfsRateId : 0,
      cfsMasterId: cfsRate.cfsMasterId,
      portMasterId: cfsRate.portMasterId,
      weightMasterId: cfsRate.weightMasterId,
      containerMasterId: cfsRate.containerMasterId,
      rate: cfsRate.rate,
      createdBy: this.currentUser.userId,
      modifiedBy: this.currentUser.userId,
      createdOn: new Date(),
      modifiedOn: new Date(),
      isActive: cfsRate.isActive
    } as Cfsrate;
  }

  submitcfsrateForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.cfsrateForm.valid) {
      const cfsRate = this.transformCfsRateObj(this.cfsrateForm.value);
      if (!this.cfsrateData) {
        this.saveCfsrateMaster(cfsRate);
      } else {
        this.updateCfsrateMaster(cfsRate);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  saveCfsrateMaster(cfsRate: Cfsrate) {
    this._cfsrateService.saveCfsRateMaster(cfsRate).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'CFS Rate Master Created Successfully');
        this._router.navigate(['/default/masters/cfs-rate/list']);
      },
      (err) => {
        this.openSnackBar('Failure !', 'Could not create CFS Rate Master!');
      }
    );
  }

  updateCfsrateMaster(cfsRate: Cfsrate) {
    this._cfsrateService.updateCfsRateMaster(cfsRate).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'CFS Rate Master Updated Successfully');
        this._router.navigate(['/default/masters/cfs-rate/list']);
      },
      (err) => {
        this.openSnackBar('Failure !', 'Could not update CFS Rate Master!');
      }
    );
  }

  containerTypeSelected(containerTypeId)
  {
    console.log(containerTypeId);
    this.getAllWeightMastersbyContainerID(containerTypeId);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
