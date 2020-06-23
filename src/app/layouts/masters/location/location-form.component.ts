import { LocationMaster } from './../../../shared/models/location';
import { Component, OnInit, NgZone, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LocationService } from '../services/location.service';
import { FormErrorStateMatcher } from 'src/app/shared/matchers/error.matcher';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {

  @Input('locationData') locationData: LocationMaster;
  matcher = new FormErrorStateMatcher();
  public locationForm: FormGroup;

  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _locationService: LocationService
  ) { }

  ngOnInit(): void {
    if (this.locationData) {
      this.locationForm = this.fb.group({
        locationName: [this.locationData.locationName ? this.locationData.locationName : '', Validators.required],
        isActive: [this.locationData.isActive ? this.locationData.isActive : '', Validators.required]
      });
    } else {
      this.locationForm = this.fb.group({
        locationName: ['', Validators.required],
        isActive: ['', Validators.required]
      });
    }
  }

  submitLocationForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.locationForm.valid) {
      if (!this.locationData) {
        this.saveLocationMaster(this.locationForm);
      } else {
        this.updateLocationMaster(this.locationForm);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  saveLocationMaster(locationForm: any) {
    this._locationService.saveLocationMaster(locationForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Location Master Created Successfully');
        this._router.navigate(['/default/masters/location/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create Location!');
      }
    );
  }

  updateLocationMaster(locationForm: any) {
    this._locationService.updateLocationMaster(locationForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Location Master Updated Successfully');
        this._router.navigate(['/default/masters/location/list']);
      },
      (err) => {
        console.log('err');
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
