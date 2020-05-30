import { Component, OnInit } from '@angular/core';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StateMasterService } from '../services/state-master.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {

  matcher = new FormErrorStateMatcher();
  public stateForm: FormGroup;

  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _stateService: StateMasterService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.stateForm = this.fb.group({
      state: ['', Validators.required],
      is_active: ['', Validators.required]
    });
  }

  submitStateForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.stateForm.valid) {
      this.saveStateMaster(this.stateForm);
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
      console.log(this.stateForm);
    }
  }

  saveStateMaster(stateForm: any) {
    this._stateService.saveStateMaster(stateForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'State Master Created Successfully');
        this._router.navigate(['/default/masters/state-master-list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create State!');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
