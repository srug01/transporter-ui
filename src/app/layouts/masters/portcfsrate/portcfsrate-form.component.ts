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
import { Cfs } from 'src/app/shared/models/cfs';
import { AlertService } from 'src/app/shared/services/alert.service';

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
  public cfs: Cfs;
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
    private _userService: UserService,
    private _alertService: AlertService
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
        bidMarginRate: [this.portcfsrateData.bidMarginRate ? this.portcfsrateData.bidMarginRate : 0, Validators.required],
        orderMarginRate: [this.portcfsrateData.orderMarginRate ? this.portcfsrateData.orderMarginRate : 0, Validators.required],
        isActive: [this.portcfsrateData.isActive ? this.portcfsrateData.isActive : true, Validators.required]
      });
      this.getPortMasterForCfs(this.portcfsrateData.portMasterId);
      this.getAllWeightMastersbyContainerID(this.portcfsrateData.containerMasterId);
    } else {
      this.portcfsrateForm = this.fb.group({
        portCfsRateMasterId: [''],
        cfsMasterId: ['', Validators.required],
        portMasterId: ['', Validators.required],
        containerMasterId: ['', Validators.required],
        weightMasterId: ['', Validators.required],
        rate: [0, Validators.required],
        bidMarginRate: [0, Validators.required],
        orderMarginRate: [0, Validators.required],
        isActive: [true, Validators.required]
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

  cfsSelected(cfsId) {
    this.cfs = this.cfsMasters.find(a => a.cfsMasterId == cfsId);
    this.getPortMasterForCfs(this.cfs.portMasterId);
  }

  getPortMasterForCfs(portId: number) {
    this._portService.getAllPortMasters().subscribe(
      (portMasters) => {
        this.portMasters = portMasters;
        this.portMasters = this.portMasters.filter(p => p.portMasterId == portId);
        this.portcfsrateForm.get('portMasterId').setValue(portId);
      },
      (err) => {
      }
    );
  }

  getAllWeightMastersbyContainerID(id: number) {
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
      portCfsRateMasterId: portcfsRate.portCfsRateMasterId ? portcfsRate.portCfsRateMasterId : 0,
      cfsMasterId: portcfsRate.cfsMasterId,
      portMasterId: portcfsRate.portMasterId,
      weightMasterId: portcfsRate.weightMasterId,
      containerMasterId: portcfsRate.containerMasterId,
      rate: portcfsRate.rate,
      bidMarginRate: portcfsRate.bidMarginRate,
      orderMarginRate: portcfsRate.orderMarginRate,
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
        this._alertService.success('Port CFS Rate Master Created Successfully', 'Success !');
        this._router.navigate(['/default/masters/port-cfs-rate/port-cfs-rate-list']);
      },
      (err) => {
        this._alertService.error(err.error.error.message, 'Failure !');
      }
    );
  }

  updatePortCfsrateMaster(portcfsRate: PortCfsRateMaster) {
    this._portcfsrateService.updatePortCfsRateMaster(portcfsRate).subscribe(
      (res) => {
        this._alertService.success('Port CFS Rate Master Updated Successfully', 'Success !');
        this._router.navigate(['/default/masters/port-cfs-rate/port-cfs-rate-list']);
      },
      (err) => {
        this._alertService.error(err.error.error.message, 'Failure !');
      }
    );
  }

  containerTypeSelected(containerTypeId) {
    this.portcfsrateForm.get("weightMasterId").reset();
    this.getAllWeightMastersbyContainerID(containerTypeId);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
