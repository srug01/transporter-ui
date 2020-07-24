import { Component, OnInit, Input } from '@angular/core';
import { TripService } from '../services/trip.service';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Mytrip } from 'src/app/shared/models/Mytrip';
import { FormErrorStateMatcher } from 'src/app/shared/matchers/error.matcher';

@Component({
  selector: 'app-my-trips-form',
  templateUrl: './my-trips-form.component.html',
  styleUrls: ['./my-trips-form.component.scss']
})
export class MyTripsFormComponent implements OnInit {
  @Input('tripData') tripData: Mytrip;
  matcher = new FormErrorStateMatcher();
  public tripForm: FormGroup;
  


  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _tripService: TripService,
  
    private _router: Router
  ) { }

  ngOnInit(): void { if (this.tripData) {
    this.tripForm = this.fb.group({
      tripId: [this.tripData.tripId ? this.tripData.tripId : ''],
      subOrderId: [this.tripData.subOrderId ? this.tripData.subOrderId : '', Validators.required],
      sourceId: [this.tripData.sourceId ? this.tripData.sourceId : '', Validators.required],
      destinationId: [this.tripData.destinationId ? this.tripData.destinationId : '',
        Validators.required],

        assignedVehicle: [this.tripData.assignedVehicle ? this.tripData.assignedVehicle : ''],
        assignedDriver: [this.tripData.assignedDriver ? this.tripData.assignedDriver : ''],
        status: [this.tripData.status ? this.tripData.status : ''],
        billedAmount: [this.tripData.billedAmount ?this.tripData.billedAmount  : ''],
      isActive: [this.tripData.isActive ? this.tripData.isActive : '', Validators.required]
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
      isActive: ['', Validators.required]
    });
  }
  }

  submittripForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.tripForm.valid) {
     // const trip: Mytrip = this.transformPortObj(this.tripForm.value);
     //const trip:Mytrip=this.tripForm;
      if (!this.tripData) {
        console.log(this.tripForm);
        this.saveTripMaster(this.tripForm);
      } else {
        this.updateTripMaster(this.tripForm);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  saveTripMaster(trip : any) {
    this._tripService.saveMytripMaster(trip).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Trip Master Created Successfully');
        this._router.navigate(['/default/transporter/my-trips/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create Trip Master!');
      }
    );
  }

  updateTripMaster(trip : any) {
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
