import { VehicleService } from './../services/vehicle.service';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vehicle-registration',
  templateUrl: './vehicle-registration.component.html',
  styleUrls: ['./vehicle-registration.component.scss']
})
export class VehicleRegistrationComponent implements OnInit {

  matcher = new FormErrorStateMatcher();
  displayedColumns: string[] = [
    'position', 'Type', 'Weight', 'NoOfTrucks', 'ContainerNo'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public vehicleForm: FormGroup;

  public vehicleTypes: Array<any> = [
    { value: '10 FT', viewValue: '10 FT' },
    { value: '20 FT', viewValue: '20 FT' },
    { value: '30 FT', viewValue: '30 FT' }
  ];
  public vehicleCapacity: Array<any> = [
    { value: '1 TON', viewValue: '1 TON' },
    { value: '2 TON', viewValue: '2 TON' },
    { value: '3 TON', viewValue: '3 TON' }
  ];
  public weight: Array<any> = [];
  public manufactureYear: Array<any> = [];
  public owned = false;

  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      vehicle_no: ['', Validators.required],
      vehicle_type: ['', Validators.required],
      vehicle_capacity: ['', Validators.required],
      weight: ['', Validators.required],
      manufacture_year: ['', Validators.required],
      vehicle_state: ['', Validators.required],
      owned: ['']
    });
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  submitVehicleForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.vehicleForm.valid) {
      this.saveVehicle(this.vehicleForm);
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
      console.log(this.vehicleForm);

    }
  }

  saveVehicle(vehicleForm: any) {
    this._vehicleService.saveVehicle(vehicleForm.value).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create vehicle');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
