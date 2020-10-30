import { State } from './../../../shared/models/state';
import { Component, OnInit, Input } from '@angular/core';

import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StateMasterService } from '../services/state-master.service';


@Component({
  selector: 'app-state-form',
  templateUrl: './state-form.component.html',
  styleUrls: ['./state-form.component.scss']
})
export class StateFormComponent implements OnInit {
  @Input('stateData') stateData: State;
  matcher = new FormErrorStateMatcher();

  public stateForm: FormGroup;
  public stateMasters: Array<any> = [];

  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _stateService: StateMasterService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (this.stateData) {
      this.stateForm = this.fb.group({
        stateMasterId: [this.stateData.stateMasterId ? this.stateData.stateMasterId : ''],
        stateName: [this.stateData.stateName ? this.stateData.stateName : '', Validators.required],
        isActive: [this.stateData.isActive ? this.stateData.isActive : true, Validators.required]
      });
    } else {
      this.stateForm = this.fb.group({
        stateMasterId: [''],
        stateName: ['', Validators.required],
        isActive: [true, Validators.required]
      });
    }
  }
  getAllStateMasters() {
    this._stateService.getAllStateMasters().subscribe(
      (stateMasters) => {
        this.stateMasters = stateMasters;
      },
      (err) => {
        console.log('could not fetch state masters');
      }
    );
  }

  submitStatesForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.stateForm.valid) {
      if (!this.stateData) {
        this.saveStateMaster(this.stateForm);
      } else {
        this.updateStateMaster(this.stateForm);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  saveStateMaster(stateForm: any) {
    this._stateService.saveStateMaster(stateForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'State Master Created Successfully');
        this._router.navigate(['/default/masters/state/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create state!');
      }
    );
  }

  updateStateMaster(stateForm: any) {
    this._stateService.updateStateMaster(stateForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'State Master Updated Successfully');
        this._router.navigate(['/default/masters/state/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not update State!');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
