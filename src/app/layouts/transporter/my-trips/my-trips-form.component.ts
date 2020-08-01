import { VehicleMaster } from 'src/app/shared/models/VehicleMaster';
import { Driver } from './../../../shared/models/driver';
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
import { DriverService } from '../services/driver.service';

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
  public vehicles: VehicleMaster[] = [];
  public userId = localStorage.getItem('userID');

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
    if (this.tripData[0]) {
      this.tripForm = this.fb.group({
        tripId: [this.tripData[0].tripId ? this.tripData[0].tripId : ''],
        subOrderId: [this.tripData[0].subOrderId ? this.tripData[0].subOrderId : '', Validators.required],
        sourceId: [this.tripData[0].sourceId ? this.tripData[0].sourceId : ''],
        destinationId: [this.tripData[0].destinationId ? this.tripData[0].destinationId : ''],
        assignedVehicle: [this.tripData[0].assignedVehicle ? this.tripData[0].assignedVehicle : ''],
        assignedDriver: [this.tripData[0].assignedDriver ? this.tripData[0].assignedDriver : ''],
        status: [this.tripData[0].status ? this.tripData[0].status : ''],
        billedAmount: [this.tripData[0].billedAmount ? this.tripData[0].billedAmount : ''],
        isActive: [this.tripData[0].isActive ? this.tripData[0].isActive : ''],
        createdBy: [this.tripData[0].createdBy ? this.tripData[0].createdBy : ''],
        createdOn: [this.tripData[0].createdOn ? this.tripData[0].createdOn : ''],
        modifiedBy: [this.tripData[0].modifiedBy ? this.tripData[0].modifiedBy : ''],
        modifiedOn: [this.tripData[0].modifiedOn ? this.tripData[0].modifiedOn : ''],
        startDate: [this.tripData[0].startDate ? this.tripData[0].startDate : ''],
        endDate: [this.tripData[0].endDate ? this.tripData[0].endDate : ''],
        sourceName: [this.tripData[0].sourceName ? this.tripData[0].sourceName : '', Validators.required],
        destinationName: [this.tripData[0].destinationName ? this.tripData[0].destinationName : '', Validators.required],
        vehicleNumber: [this.tripData[0].vehicleNumber ? this.tripData[0].vehicleNumber : '']
      });
    } else {
      this.tripForm = this.fb.group({
        tripId: [''],
        subOrderId: ['', Validators.required],
        sourceId: [''],
        destinationId: [''],
        assignedVehicle: [''],
        assignedDriver: [''],
        status: [''],
        billedAmount: [''],
        isActive: [''],
        createdBy: [''],
        createdOn: [''],
        modifiedBy: [''],
        modifiedOn: [''],
        startDate: [''],
        endDate: [''],
        sourceName: ['', Validators.required],
        destinationName: ['', Validators.required],
        vehicleNumber: ['']
      });
    }
    console.log(this.tripForm);
  }

  getAllVehicles() {
    this._vehicleService.getAllVehiclesbyUserId(this.userId).subscribe(
      (vehicles: VehicleMaster[]) => {
        this.vehicles = vehicles;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllDrivers() {
    this._driverService.getAllDriversbyUserId(this.userId).subscribe(
      (drivers: Driver[]) => {
        this.drivers = drivers;
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
      //this.updateTripMaster(this.tripForm);
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
