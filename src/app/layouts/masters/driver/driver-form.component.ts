import { Driver } from './../../../shared/models/driver';
import { Component, OnInit, Input } from '@angular/core';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StateMasterService } from '../services/state-master.service';
import { DriverService } from '../services/driver.service';

@Component({
  selector: 'app-driver-form',
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.scss']
})
export class DriverFormComponent implements OnInit {
  @Input('driverData') driverData: Driver;

  matcher = new FormErrorStateMatcher();
  public driverForm: FormGroup;
  public stateMasters: Array<any> = [];
  public cityMaster: Array<any> = [
    { citysyscode: 1, cityname: 'Nashik' },
    { citysyscode: 2, cityname: 'Pune' },
    { citysyscode: 3, cityname: 'Mumbai' },
    { citysyscode: 4, cityname: 'Goa' },
  ];

  public countryMaster: Array<any> = [
    { countrysyscode: 1, countryname: 'India' },
    { countrysyscode: 2, countryname: 'Japan' },
    { countrysyscode: 3, countryname: 'America' },
    { countrysyscode: 4, countryname: 'London' },
  ];


  public identitytypeMaster: Array<any> = [
    { identitytypesyscode: 1, identitytname: 'Aadhar' },
    { identitytypesyscode: 2, identitytname: 'PAN Card' },
    { identitytypesyscode: 3, identitytname: 'Voter ID' },
    { identitytypesyscode: 4, identitytname: 'Driving Licences' },
  ];


  public ports: Array<any> = [
    { port_syscode: 1, port: 'Nashik' },
    { port_syscode: 2, port: 'Pune' },
    { port_syscode: 3, port: 'Mumbai' },
    { port_syscode: 4, port: 'Goa' },
  ];


  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _stateService: StateMasterService,
    private _driverService: DriverService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (this.driverData) {
      this.driverForm = this.fb.group({
        driversyscode: [this.driverData.driversyscode ? this.driverData.driversyscode : ''],
        name: [this.driverData.name ? this.driverData.name : '', Validators.required],
        firstname: [this.driverData.firstname ? this.driverData.firstname : '', Validators.required],
        lastname: [this.driverData.lastname ? this.driverData.lastname : '', Validators.required],
      
        emailid: [this.driverData.emailid ? this.driverData.emailid : ''],
      
      
        citysyscode: [this.driverData.citysyscode ? this.driverData.citysyscode : 0],
        statesyscode: [this.driverData.statesyscode ? this.driverData.statesyscode : 0],
        countrysyscode: [this.driverData.countrysyscode ? this.driverData.countrysyscode : 0],
        pincode: [this.driverData.pincode ? this.driverData.pincode : ''],
        address: [this.driverData.address ? this.driverData.address : ''],
        identitytypesyscode: [this.driverData.identitytypesyscode ? this.driverData.identitytypesyscode : ''],
        identitynumber: [this.driverData.identitynumber ? this.driverData.identitynumber : ''],
     
      
        is_active: [this.driverData.is_active ? this.driverData.is_active : '', Validators.required]
      });
    } else {
      this.driverForm = this.fb.group({
        driver_syscode: [''],
        name: ['', Validators.required],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required]
      
      });
    }
    this.getAllStateMasters();
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
  submitDriverForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.driverForm.valid) {
      if (!this.driverData) {
        this.saveDriverMaster(this.driverForm);
      } else {
        this.updateDriverMaster(this.driverForm);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  saveDriverMaster(driverForm: any) {
    this._driverService.saveDriverMaster(driverForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Driver Master Created Successfully');
        this._router.navigate(['/default/masters/driver/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create Driver!');
      }
    );
  }

  updateDriverMaster(driverForm: any) {
    this._driverService.updateDriverMaster(driverForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Driver Master Updated Successfully');
        this._router.navigate(['/default/masters/driver/list']);
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
