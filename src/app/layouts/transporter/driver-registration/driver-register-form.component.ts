import { Driver } from '../../../shared/models/driver';
import { Component, OnInit, Input } from '@angular/core';
import { FormErrorStateMatcher } from '../../../shared/matchers/error.matcher';
import { NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StateMasterService } from '../../masters/services/state-master.service';
import { DriverService } from '../services/driver.service';
import { State } from 'src/app/shared/models/state';
import { LocationMaster } from 'src/app/shared/models/location';
import { LocationService } from '../../masters/services/location.service';

@Component({
  selector: 'app-driverregister-form',
  templateUrl: './driver-register-form.component.html',
  styleUrls: ['./driver-register-form.component.scss']
})
export class DriverFormRegisterComponent implements OnInit {
  @Input('driverData') driverData: Driver;

  matcher = new FormErrorStateMatcher();
  public driverForm: FormGroup;
  public stateMasters: Array<State> = [];
  public locationMasters: Array<LocationMaster> = [];
  public userId = localStorage.getItem('userID');





  public identitytypeMaster: Array<any> = [
    { identitytype: 1, identitytname: 'Aadhar' },
    { identitytype: 2, identitytname: 'PAN Card' },
    { identitytype: 3, identitytname: 'Voter ID' },
    { identitytype: 4, identitytname: 'Driving Licences' },
  ];


  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _stateService: StateMasterService,
    private _locationService: LocationService,
    private _driverService: DriverService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (this.driverData) {
      this.driverForm = this.fb.group({
        driverId: [this.driverData.driverId ? this.driverData.driverId : ''],
        firstname: [this.driverData.firstname ? this.driverData.firstname : '', Validators.required],
        lastname: [this.driverData.lastname ? this.driverData.lastname : '', Validators.required],
        emailId: [this.driverData.emailId ? this.driverData.emailId : ''],
        mobileNumber: [this.driverData.mobileNumber ? this.driverData.mobileNumber : ''],
        locationMasterId: [this.driverData.locationMasterId ? this.driverData.locationMasterId : 0],
        stateMasterId: [this.driverData.stateMasterId ? this.driverData.stateMasterId : 0],
        pincode: [this.driverData.pincode ? this.driverData.pincode : ''],
        address1: [this.driverData.address1 ? this.driverData.address1 : ''],
        address2: [this.driverData.address2 ? this.driverData.address2 : ''],
        landmark: [this.driverData.landmark ? this.driverData.landmark : ''],
        identitytype: [this.driverData.identitytype ? this.driverData.identitytype : ''],
        identitynumber: [this.driverData.identitynumber ? this.driverData.identitynumber : ''],
        isActive: [this.driverData.isActive ? this.driverData.isActive : '', Validators.required]
      });
    }
    else {
      this.driverForm = this.fb.group({
        driverId: [''],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        emailId: [''],
        mobileNumber: ['', Validators.required],
        locationMasterId: [''],
        stateMasterId: [''],
        pincode: [''],
        address1: [''],
        address2: [''],
        landmark: [''],
        identitytype: [''],
        identitynumber: [''],
        isActive: ['', Validators.required]
      });
    }
    this.getAllStateMasters();
    this.getLocations();

  }

  transformDriverObj(driver: any): Driver {
    return {
      driverId: driver.driverId ? driver.driverId : 0,
      createdBy: +this.userId,
      createdOn: new Date(),
      firstname: driver.firstname,
      lastname: driver.lastname,
      isActive: driver.isActive,
      emailId: driver.emailId,
      mobileNumber: driver.mobileNumber,
      locationMasterId: driver.locationMasterId,
      identitytype: driver.identitytype,
      identitynumber: driver.identitynumber,
      modifiedBy: +this.userId,
      modifiedOn: new Date(),
      address1:driver.address1 ,
      address2: driver.address2 ,
      landmark: driver.landmark ,
      pincode: driver.pincode,
      stateMasterId: driver.stateMasterId,
    } as Driver;
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
  getLocations() {
    this._locationService.getAllLocationMasters().subscribe(
      (locationMasters: Array<LocationMaster>) => {
        this.locationMasters = locationMasters;
      }
    );
  }
  stateSelected(stateMasterId) {
    this.getAllLocationsByStateId(stateMasterId);
  }

  getAllLocationsByStateId(stateMasterId: number) {
    this._stateService.getAllLocationMastersByStateId(stateMasterId).subscribe(
      (locationMasters: Array<LocationMaster>) => {
        this.locationMasters = locationMasters;
      },
      (err) => {
      }
    );
  }
  submitDriverForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.driverForm.valid) {
      const driver: Driver = this.transformDriverObj(this.driverForm.value);
      if (!this.driverData) {
        console.log(driver);
        this.saveDriverMaster(driver);
      } else {
        this.updateDriverMaster(driver);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  saveDriverMaster(driver: Driver) {
    this._driverService.saveDriverMaster(driver).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Driver  Created Successfully');
        this._router.navigate(['/default/transporter/register-driver/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create Driver!');
      }
    );
  }

  updateDriverMaster(driver: Driver) {
    this._driverService.updateDriverMaster(driver).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Driver Master Updated Successfully');
        this._router.navigate(['/default/transporter/register-driver/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not update Driver!');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
