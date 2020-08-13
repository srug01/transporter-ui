import { PortCfsRateMaster } from '../../../shared/models/portcfsrate';
import { Component, OnInit, Input } from '@angular/core';
import { FormErrorStateMatcher } from '../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PortService } from '../services/port.service';
import { WeightService } from '../services/weight.service';
import { CfsService } from '../services/cfs.service';
import { ContainerService } from '../services/container.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';
import { PortCfsRateService } from '../../masters/services/portcfsrate.service';

@Component({
  selector: 'app-portcfsrate-form',
  templateUrl: './portcfsrate-form.component.html',
  styleUrls: ['./portcfsrate-form.component.scss']
})
export class PortcfsrateFormComponent implements OnInit {
  @Input('portcfsrateData') portcfsrateData: PortCfsRateMaster;
  matcher = new FormErrorStateMatcher();
  public portcfsrateForm: FormGroup;
  public cfsMasters: Array<any> = [];
  public portMasters: Array<any> = [];
  public weightMasters: Array<any> = [];
  public containerMaster: Array<any> = [];
  public currentUser: User;
  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _portcfsrateService: PortCfsRateService,
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
    if (this.portcfsrateData) {
      this.portcfsrateForm = this.fb.group({
        portCfsRateMasterId: [this.portcfsrateData.portCfsRateMasterId ? this.portcfsrateData.portCfsRateMasterId : ''],
        cfsMasterId: [this.portcfsrateData.cfsMasterId ? this.portcfsrateData.cfsMasterId : '', Validators.required],
        portMasterId: [this.portcfsrateData.portMasterId ? this.portcfsrateData.portMasterId : '', Validators.required],
        containerMasterId: [this.portcfsrateData.containerMasterId ? this.portcfsrateData.containerMasterId : '', Validators.required],
        weightMasterId: [this.portcfsrateData.weightMasterId ? this.portcfsrateData.weightMasterId : '', Validators.required],
        rate: [this.portcfsrateData.rate ? this.portcfsrateData.rate : 0, Validators.required],
        isActive: [this.portcfsrateData.isActive ? this.portcfsrateData.isActive : '', Validators.required]
      });
    } else {
      this.portcfsrateForm = this.fb.group({
        portCfsRateMasterId: [''],
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

  transformCfsRateObj(portcfsRate: PortCfsRateMaster): PortCfsRateMaster {
    return {
      cfsRateId: portcfsRate.portCfsRateMasterId ? portcfsRate.portCfsRateMasterId : 0,
      cfsMasterId: portcfsRate.cfsMasterId,
      portMasterId: portcfsRate.portMasterId,
      weightMasterId: portcfsRate.weightMasterId,
      containerMasterId: portcfsRate.containerMasterId,
      rate: portcfsRate.rate,
      createdBy: this.currentUser.userId,
      modifiedBy: this.currentUser.userId,
      createdOn: new Date(),
      modifiedOn: new Date(),
      isActive: portcfsRate.isActive
    } as PortCfsRateMaster;
  }

  submitportcfsrateForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.portcfsrateForm.valid) {
      const portcfsRate = this.transformCfsRateObj(this.portcfsrateForm.value);
      if (!this.portcfsrateData) {
         this.savePortCfsrateMaster(portcfsRate);
      } else {
        this.updatePortCfsrateMaster(portcfsRate);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  savePortCfsrateMaster(portcfsRate: PortCfsRateMaster) {
    this._portcfsrateService.savePortCfsRateMaster(portcfsRate).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Port CFS Rate Master Created Successfully');
        this._router.navigate(['/default/masters/cfs-port-rate/list']);
      },
      (err) => {
        console.log(err);
        this.openSnackBar('Failure !', err.error.error.message);
      }
    );
  }

  updatePortCfsrateMaster(portcfsRate: PortCfsRateMaster) {
    this._portcfsrateService.updatePortCfsRateMaster(portcfsRate).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Port CFS Rate Master Updated Successfully');
        this._router.navigate(['/default/masters/cfs-port-rate/list']);
      },
      (err) => {
        this.openSnackBar('Failure !', 'Could not update Port CFS Rate Master!');
      }
    );
  }

  containerTypeSelected(containerTypeId)
  {

    this.portcfsrateForm.get("weightMasterId").reset();
    this.getAllWeightMastersbyContainerID(containerTypeId);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
