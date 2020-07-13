import { Component, OnInit, Input } from '@angular/core';

import { Weight } from './../../../shared/models/weight';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WeightService } from '../services/weight.service';


@Component({
  selector: 'app-weight-form',
  templateUrl: './weight-form.component.html',
  styleUrls: ['./weight-form.component.scss']
})
export class WeightFormComponent implements OnInit {
  @Input('weightData') weightData: Weight;
  matcher = new FormErrorStateMatcher();
  public weightForm: FormGroup;
  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _weightService: WeightService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (this.weightData) {
      this.weightForm = this.fb.group({
        weightMasterId: [this.weightData.weightMasterId ? this.weightData.weightMasterId : ''],
        weightDesc: [this.weightData.weightDesc ? this.weightData.weightDesc : '', Validators.required],
        isActive: [this.weightData.isActive ? this.weightData.isActive : '', Validators.required]
      });
    } else {
      this.weightForm = this.fb.group({
        weightMasterId: [''],
        weightDesc: ['', Validators.required],
        isActive: ['', Validators.required]
      });
    }
  }



  submitWeightForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.weightForm.valid) {
      if (!this.weightData) {
        this.saveWeightMaster(this.weightForm);
      } else {
        this.updateWeightMaster(this.weightForm);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  saveWeightMaster(weightForm: any) {
    this._weightService.saveWeightMaster(weightForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Weight Master Created Successfully');
        this._router.navigate(['/default/masters/weight/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create Weight!');
      }
    );
  }

  updateWeightMaster(weightForm: any) {
    this._weightService.updateWeightMaster(weightForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Weight Master Updated Successfully');
        this._router.navigate(['/default/masters/weight/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not update Weight!');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
