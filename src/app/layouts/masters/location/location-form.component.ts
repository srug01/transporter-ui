import { State } from 'src/app/shared/models/state';
import { StateMasterService } from './../services/state-master.service';
import { UserService } from './../../../services/user.service';
import { LocationMaster } from './../../../shared/models/location';
import { Component, OnInit, NgZone, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LocationService } from '../services/location.service';
import { FormErrorStateMatcher } from 'src/app/shared/matchers/error.matcher';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {

  @Input('locationData') locationData: LocationMaster;
  matcher = new FormErrorStateMatcher();
  public locationForm: FormGroup;
  public currentUser: User;
  public states: State[];

  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _locationService: LocationService,
    private _userService: UserService,
    private _stateService: StateMasterService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getAllStates();
    if (this.locationData) {
      this.locationForm = this.fb.group({
        locationId: [this.locationData.locationId ? this.locationData.locationId : ''],
        locationName: [this.locationData.locationName ? this.locationData.locationName : '', Validators.required],
        stateMasterId: [this.locationData.stateMasterId ? this.locationData.stateMasterId : '', Validators.required],
        isActive: [this.locationData.isActive ? this.locationData.isActive : '', Validators.required]
      });
    } else {
      this.locationForm = this.fb.group({
        locationId: [''],
        locationName: ['', Validators.required],
        stateMasterId: ['', Validators.required],
        isActive: ['', Validators.required]
      });
    }
  }

  getAllStates() {
    this._stateService.getAllStateMasters().subscribe(
      (states) => {
        this.states = states;
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

  transformLocationObj(location: any): LocationMaster {
    return {
      locationId: location.locationId,
      locationName: location.locationName,
      isActive: location.isActive,
      stateMasterId: location.stateMasterId,
      createdBy: this.currentUser.userId,
      createdOn: new Date()
    } as LocationMaster;
  }

  submitLocationForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.locationForm.valid) {
      const location: LocationMaster = this.transformLocationObj(this.locationForm.value);
      if (!this.locationData) {
        this.saveLocationMaster(location);
      } else {
        this.updateLocationMaster(location);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  saveLocationMaster(location: LocationMaster) {
    this._locationService.saveLocationMaster(location).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Location Master Created Successfully');
        this._router.navigate(['/default/masters/location/list']);
      },
      (err) => {
        this.openSnackBar('Failure !', 'Could not create Location!');
      }
    );
  }

  updateLocationMaster(location: LocationMaster) {
    this._locationService.updateLocationMaster(location).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Location Master Updated Successfully');
        this._router.navigate(['/default/masters/location/list']);
      },
      (err) => {
        this.openSnackBar('Failure !', 'Could not update Location!');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
