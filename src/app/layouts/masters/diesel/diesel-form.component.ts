import { Diesel } from './../../../shared/models/diesel';
import { Component, OnInit, Input } from '@angular/core';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { DieselService } from '../services/diesel.service';

@Component({
  selector: 'app-diesel-form',
  templateUrl: './diesel-form.component.html',
  styleUrls: ['./diesel-form.component.scss']
})
export class DieselFormComponent implements OnInit {
  @Input('dieselData') dieselData: Diesel;
  matcher = new FormErrorStateMatcher();
  public dieselForm: FormGroup;
  public dieselMasters: Array<any> = [];

  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,

    private _dieselService: DieselService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (this.dieselData) {
      this.dieselForm = this.fb.group({
        dieselRateId: [this.dieselData.dieselRateId ? this.dieselData.dieselRateId : ''],
        dieselRate: [this.dieselData.dieselRate ? this.dieselData.dieselRate : '',
        Validators.required],
        dieselRateDate: [this.dieselData.dieselRateDate ? this.dieselData.dieselRateDate : '', Validators.required],
        isActive: [this.dieselData.isActive ? this.dieselData.isActive : true, Validators.required]
      });
    } else {
      this.dieselForm = this.fb.group({
        dieselRateId: [''],
        dieselRate: ['', Validators.required],
        dieselRateDate: ['', Validators.required],
        isActive: [true, Validators.required]
      });
    }
    //this.getAllStateMasters();
    //}
  }

  getAllDieselMasters() {
    this._dieselService.getAllDieselMasters().subscribe(
      (dieselMasters) => {
        this.dieselMasters = dieselMasters;
      },
      (err) => {
      }
    );
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.dieselForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }



  submitDieselForm(ev) {
    this.findInvalidControls();
    if (ev) {
      ev.preventDefault();
    }
    if (this.dieselForm.valid) {
      if (!this.dieselData) {
        this.saveDieselMaster(this.dieselForm);
      } else {
        this.updateDieselMaster(this.dieselForm);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  saveDieselMaster(dieselForm: any) {
    this._dieselService.saveDieselMaster(dieselForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Diesel Master Created Successfully');
        this._router.navigate(['/default/masters/diesel/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create diesel!');
      }
    );
  }

  updateDieselMaster(dieselForm: any) {
    this._dieselService.updateDieselMaster(dieselForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Diesel Master Updated Successfully');
        this._router.navigate(['/default/masters/diesel/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not update Diesel!');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
