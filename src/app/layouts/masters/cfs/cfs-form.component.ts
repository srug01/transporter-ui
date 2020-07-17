import { UserService } from 'src/app/services/user.service';
import { Cfs } from './../../../shared/models/cfs';
import { Component, OnInit, Input } from '@angular/core';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CfsService } from '../services/cfs.service';
import { PortService } from '../services/port.service';
import { LocationService } from '../services/location.service';
import { User } from 'src/app/shared/models/user';


@Component({
  selector: 'app-cfs-form',
  templateUrl: './cfs-form.component.html',
  styleUrls: ['./cfs-form.component.scss']
})
export class CfsFormComponent implements OnInit {
  @Input('cfsData') cfsData: Cfs;
  matcher = new FormErrorStateMatcher();
  public cfsForm: FormGroup;
  public portMasters: Array<any> = [];
  public locations: Array<any> = [];
  public currentUser: User;
  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _cfsService: CfsService,
    private _portService: PortService,
    private _router: Router,
    private _locationService: LocationService,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getAllPortMasters();
    this.getLocations();
    if (this.cfsData) {
      this.cfsForm = this.fb.group({
        cfsMasterId: [this.cfsData.cfsMasterId ? this.cfsData.cfsMasterId : ''],
        cfsName: [this.cfsData.cfsName ? this.cfsData.cfsName : '', Validators.required],
        contactNumber: [this.cfsData.contactNumber ? this.cfsData.contactNumber : '', Validators.required],
        email: [this.cfsData.email ? this.cfsData.email : '', Validators.required],
        address: [this.cfsData.address ? this.cfsData.address : '', Validators.required],
        pincode: [this.cfsData.pincode ? this.cfsData.pincode : '', Validators.required],
        cfsCodeNumber: [this.cfsData.cfsCodeNumber ? this.cfsData.cfsCodeNumber : '', Validators.required],
        gstin: [this.cfsData.gstin ? this.cfsData.gstin : '', Validators.required],
        pan: [this.cfsData.pan ? this.cfsData.pan : '', Validators.required],
        tan: [this.cfsData.tan ? this.cfsData.tan : '', Validators.required],
        primaryContactName: [this.cfsData.primaryContactName ? this.cfsData.primaryContactName : '', Validators.required],
        primaryContactNumber: [this.cfsData.primaryContactNumber ? this.cfsData.primaryContactNumber : '', Validators.required],
        additionalContactName: [this.cfsData.additionalContactName ? this.cfsData.additionalContactName : '', Validators.required],
        additionalContactNumber: [this.cfsData.additionalContactNumber ? this.cfsData.additionalContactNumber : '', Validators.required],
        portMasterId: [this.cfsData.portMasterId ? this.cfsData.portMasterId : '', Validators.required],
        isActive: [this.cfsData.isActive ? this.cfsData.isActive : '', Validators.required]
      });
    } else {
      this.cfsForm = this.fb.group({
        cfsMasterId: [''],
        cfsName: ['', Validators.required],
        contactNumber: ['', Validators.required],
        email: ['', Validators.required],
        address: ['', Validators.required],
        pincode: ['', Validators.required],
        cfsCodeNumber: ['', Validators.required],
        gstin: ['', Validators.required],
        pan: ['', Validators.required],
        tan: ['', Validators.required],
        primaryContactName: ['', Validators.required],
        primaryContactNumber: ['', Validators.required],
        additionalContactName: ['', Validators.required],
        additionalContactNumber: ['', Validators.required],
        portMasterId: ['', Validators.required],
        isActive: ['', Validators.required]
      });
    }
  }

  getUserInfo() {
    this._userService.getUsersInfo().subscribe(
      (loggedUser: User) => {
        this.currentUser = loggedUser;
      }
    );
  }

  getLocations() {
    this._locationService.getAllLocationMasters().subscribe(
      (locations) => {
        this.locations = locations;
      },
      (err) => {
        console.log(err);
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

  transformCfsObj(cfs: Cfs): Cfs {
    return {
      cfsMasterId: cfs.cfsMasterId ? cfs.cfsMasterId : 0,
      cfsCodeNumber: cfs.cfsCodeNumber,
      address: cfs.address,
      cfsName: cfs.cfsName,
      contactNumber: cfs.contactNumber,
      createdBy: this.currentUser.userId,
      createdOn: new Date(),
      additionalContactName: cfs.additionalContactName,
      additionalContactNumber: cfs.additionalContactNumber,
      email: cfs.email,
      gstin: cfs.gstin,
      isActive: cfs.isActive,
      modifiedBy: this.currentUser.userId,
      modifiedOn: new Date(),
      pan: cfs.pan,
      pincode: cfs.pincode,
      portMasterId: cfs.portMasterId,
      primaryContactName: cfs.primaryContactName,
      primaryContactNumber: cfs.primaryContactNumber,
      tan: cfs.tan
    } as Cfs;
  }

  submitCfsForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.cfsForm.valid) {
      const cfsMaster: Cfs = this.transformCfsObj(this.cfsForm.value);
      if (!this.cfsData) {
        this.saveCfsMaster(cfsMaster);
      } else {
        this.updateCfsMaster(cfsMaster);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  saveCfsMaster(cfsMaster: Cfs) {
    this._cfsService.saveCfsMaster(cfsMaster).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Cfs Master Created Successfully');
        this._router.navigate(['/default/masters/cfs/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create Cfs!');
      }
    );
  }

  updateCfsMaster(cfsMaster: Cfs) {
    this._cfsService.updateCfsMaster(cfsMaster).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Cfs Master Updated Successfully');
        this._router.navigate(['/default/masters/cfs/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not update Cfs!');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
