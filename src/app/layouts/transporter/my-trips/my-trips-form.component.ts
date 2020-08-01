import { Vehicle } from './../../../shared/models/vehicle';
import { Driver } from './../../../shared/models/driver';
import { DriverService } from './../../masters/services/driver.service';
import { VehicleService } from './../services/vehicle.service';
import { Component, OnInit, Input } from '@angular/core';
import { TripService } from '../services/trip.service';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Trip } from 'src/app/shared/models/Mytrip';
import { FormErrorStateMatcher } from 'src/app/shared/matchers/error.matcher';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-my-trips-form',
  templateUrl: './my-trips-form.component.html',
  styleUrls: ['./my-trips-form.component.scss']
})
export class MyTripsFormComponent implements OnInit {
  @Input('tripData') tripData: Trip;
  matcher = new FormErrorStateMatcher();
  public tripForm: FormGroup;
  public currentUser: User;
  public drivers: Driver[] = [];
  public vehicles: Vehicle[] = [];


  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _tripService: TripService,
    private _router: Router,
    private _userService: UserService,
    private _vehicleService: VehicleService,
    private _driverService: DriverService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getAllDrivers();
    this.getAllVehicles();
    if (this.tripData) {
      this.tripForm = this.fb.group({
        tripId: [this.tripData.tripId ? this.tripData.tripId : ''],
        subOrderId: [this.tripData.subOrderId ? this.tripData.subOrderId : '', Validators.required],
        sourceId: [this.tripData.sourceId ? this.tripData.sourceId : '', Validators.required],
        destinationId: [this.tripData.destinationId ? this.tripData.destinationId : '', Validators.required],
        assignedVehicle: [this.tripData.assignedVehicle ? this.tripData.assignedVehicle : ''],
        assignedDriver: [this.tripData.assignedDriver ? this.tripData.assignedDriver : ''],
        status: [this.tripData.status ? this.tripData.status : ''],
        billedAmount: [this.tripData.billedAmount ? this.tripData.billedAmount : ''],
        isActive: [this.tripData.isActive ? this.tripData.isActive : '', Validators.required],
        createdBy: [this.tripData.createdBy ? this.tripData.createdBy : ''],
        createdOn: [this.tripData.createdOn ? this.tripData.createdOn : ''],
        modifiedBy: [this.tripData.modifiedBy ? this.tripData.modifiedBy : ''],
        modifiedOn: [this.tripData.modifiedOn ? this.tripData.modifiedOn : ''],
        startDate: [this.tripData.startDate ? this.tripData.startDate : ''],
        endDate: [this.tripData.endDate ? this.tripData.endDate : ''],
      });
    } else {
      this.tripForm = this.fb.group({
        tripId: [''],
        subOrderId: ['', Validators.required],
        sourceId: ['', Validators.required],
        destinationId: ['', Validators.required],
        assignedVehicle: [''],
        assignedDriver: [''],
        status: [''],
        billedAmount: [''],
        isActive: ['', Validators.required],
        createdBy: [''],
        createdOn: [''],
        modifiedBy: [''],
        modifiedOn: [''],
        startDate: [''],
        endDate: [''],
      });
    }
  }

  getAllVehicles() {
    this._vehicleService.getAllVehicleMasters().subscribe(
      (vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
        console.log(this.vehicles);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllDrivers() {
    this._driverService.getAllDriverMasters().subscribe(
      (drivers: Driver[]) => {
        this.drivers = drivers;
        console.log(this.drivers);
      },
      (err) => {
        console.log(err);
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

  transformTripObj(trip: Trip): Trip {
    return {
      tripId: trip.tripId,
      subOrderId: trip.subOrderId,
      sourceId: trip.sourceId,
      destinationId: trip.destinationId,
      assignedVehicle: trip.assignedVehicle,
      assignedDriver: trip.assignedDriver,
      status: trip.status,
      billedAmount: trip.billedAmount,
      isActive: trip.isActive,
      createdBy: trip.createdBy,
      createdOn: trip.createdOn,
      modifiedBy: trip.modifiedBy,
      modifiedOn: trip.modifiedOn,
      startDate: trip.startDate,
      endDate: trip.endDate,
    } as Trip;
  }

  submittripForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.tripForm.valid) {
      const trip: Trip = this.transformTripObj(this.tripForm.value);
      console.log(trip);
      // this.updateTripMaster(this.tripForm);
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }


  updateTripMaster(trip: any) {
    this._tripService.updateMytripMaster(trip).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Trip Master Updated Successfully');
        this._router.navigate(['/default/transporter/my-trips/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not update Trip Master!');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
