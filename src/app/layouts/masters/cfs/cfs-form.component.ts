import { Constants } from './../../../shared/constants/constants';
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
import { StateMasterService } from '../services/state-master.service';
import { User } from 'src/app/shared/models/user';
import { LocationMaster } from 'src/app/shared/models/location';
import * as moment from 'moment';


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
  public locations:  Array<LocationMaster> = [];
  public stateMasters: Array<any> = [];
  public currentUser: User;
  public mobileNumberPattern: string = Constants.mobNumberPattern;
  public userId = parseInt(localStorage.getItem('userID'), 10);

  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _cfsService: CfsService,
    private _portService: PortService,
    private _router: Router,
    private _locationService: LocationService,
    private _stateService: StateMasterService,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getAllPortMasters();
    this.getLocations();
    this.getAllStateMasters();
    if (this.cfsData) {
      this.cfsForm = this.fb.group({
        cfsMasterId: [this.cfsData.cfsMasterId ? this.cfsData.cfsMasterId : ''],
        cfsName: [this.cfsData.cfsName ? this.cfsData.cfsName : '', Validators.required],
        contactNumber: [this.cfsData.contactNumber ? this.cfsData.contactNumber : '',
          Validators.compose([Validators.pattern('[6-9]\\d{9}'), Validators.required])],
        email: [this.cfsData.email ? this.cfsData.email : '',
          Validators.compose([Validators.pattern('^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$'), Validators.required])],

        address1: [this.cfsData.address1 ? this.cfsData.address1 : '', Validators.required],
        address2: [this.cfsData.address2 ? this.cfsData.address2 : ''],
        landmark: [this.cfsData.landmark ? this.cfsData.landmark : '', Validators.required],
        latitude: [this.cfsData.latitude ? this.cfsData.latitude : ''],
        longitude: [this.cfsData.longitude ? this.cfsData.longitude : ''],
        pincode: [this.cfsData.pincode ? this.cfsData.pincode : '',
          Validators.compose([Validators.pattern('[0-9]\\d{5}'), Validators.required])],
        cfsCodeNumber: [this.cfsData.cfsCodeNumber ? this.cfsData.cfsCodeNumber : '', Validators.required],
        gstin: [this.cfsData.gstin ? this.cfsData.gstin : ''],
        pan: [this.cfsData.pan ? this.cfsData.pan : ''],
        tan: [this.cfsData.tan ? this.cfsData.tan : ''],
        primaryContactName: [this.cfsData.primaryContactName ? this.cfsData.primaryContactName : '', Validators.required],
        primaryContactNumber: [this.cfsData.primaryContactNumber ? this.cfsData.primaryContactNumber : '',
          Validators.compose([Validators.pattern('[6-9]\\d{9}'), Validators.required])],
        additionalContactName: [this.cfsData.additionalContactName ? this.cfsData.additionalContactName : ''],
        additionalContactNumber: [this.cfsData.additionalContactNumber ? this.cfsData.additionalContactNumber : '',
          Validators.compose([Validators.pattern('[6-9]\\d{9}')])],
        portMasterId: [this.cfsData.portMasterId ? this.cfsData.portMasterId : '', Validators.required],
        stateMasterId: [this.cfsData.stateMasterId ? this.cfsData.stateMasterId : '', Validators.required],
        locationMasterId: [this.cfsData.locationMasterId ? this.cfsData.locationMasterId : '', Validators.required],
        isActive: [this.cfsData.isActive === false ? false  : true, Validators.required]
      });

      // State is set, now fetch ports in the selected state and set  ===  this.portMasters = portMasters; =======
      
    } else {
      this.cfsForm = this.fb.group({
        cfsMasterId: [''],
        cfsName: ['', Validators.required],
        contactNumber: ['', Validators.compose([Validators.pattern('[6-9]\\d{9}'), Validators.required])],
        email: ['',Validators.compose([Validators.pattern('^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$'), Validators.required])],
        address1: ['', Validators.required],
        address2: [''],
        landmark: ['', Validators.required],
        latitude: [''],
        longitude: [''],
        pincode: ['', Validators.compose([Validators.pattern('[0-9]\\d{5}'), Validators.required])],
        cfsCodeNumber: ['', Validators.required],
        gstin: [''],
        pan: [''],
        tan: [''],
        primaryContactName: ['', Validators.required],
        primaryContactNumber: ['',Validators.compose([Validators.pattern('[6-9]\\d{9}'), Validators.required])],
        additionalContactName: [''],
        additionalContactNumber: ['',Validators.compose([Validators.pattern('[6-9]\\d{9}')])],
        portMasterId: ['', Validators.required],
        stateMasterId: ['', Validators.required],
        locationMasterId: ['', Validators.required],
        isActive: [true, Validators.required]
      });
    }
  }
  //// Validators.compose([Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'), Validators.required])],

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
  getAllLocationsByStateId(stateMasterId: number) {
    this._stateService.getAllLocationMastersByStateId(stateMasterId).subscribe(
      (locations: Array<LocationMaster>) => {
        this.locations = locations;
      },
      (err) => {
      }
    );
  }
  stateSelected(stateMasterId) {
    this.getAllLocationsByStateId(stateMasterId);
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

  getAllStateMasters() {
    this._stateService.getAllStateMasters().subscribe(
      (stateMasters) => {
        this.stateMasters = stateMasters;
      },
      (err) => {
      }
    );
  }

  transformCfsObj(cfs: Cfs): Cfs {
    return {
      cfsMasterId: cfs.cfsMasterId ? cfs.cfsMasterId : 0,
      cfsCodeNumber: cfs.cfsCodeNumber,
      address1: cfs.address1,
      address2: cfs.address2,
      landmark: cfs.landmark,
      latitude: cfs.latitude,
      longitude: cfs.longitude,
      stateMasterId: cfs.stateMasterId,
      locationMasterId: cfs.locationMasterId,
      cfsName: cfs.cfsName,
      contactNumber: cfs.contactNumber,
      additionalContactName: cfs.additionalContactName,
      additionalContactNumber: cfs.additionalContactNumber,
      email: cfs.email,
      gstin: cfs.gstin,
      isActive: cfs.isActive,
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
        cfsMaster.createdBy = this.userId;
        cfsMaster.createdOn = moment().format('YYYY-MM-DD h:mm:ss a').toString();
        this.saveCfsMaster(cfsMaster);
      } else {
        cfsMaster.modifiedBy = this.userId;
        cfsMaster.modifiedOn = moment().format('YYYY-MM-DD h:mm:ss a').toString();
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
        this._router.navigate(['/default/masters/cfs/cfs-list']);
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
        this._router.navigate(['/default/masters/cfs/cfs-list']);
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
