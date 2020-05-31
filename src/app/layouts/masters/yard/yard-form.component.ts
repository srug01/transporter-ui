import { Component, OnInit, Input } from '@angular/core';

import { Yard } from './../../../shared/models/yard';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { YardService } from '../services/yard.service';
import { PortService } from '../services/port.service';



@Component({
  selector: 'app-yard-form',
  templateUrl: './yard-form.component.html',
  styleUrls: ['./yard-form.component.scss']
})
export class YardFormComponent implements OnInit {
  @Input('yardData') yardData: Yard;
  matcher = new FormErrorStateMatcher();
  public yardForm: FormGroup;
  public portMasters: Array<any> = [];

  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _yardService: YardService,
    private _portService: PortService,
    private _router: Router

  ) { }

  ngOnInit(): void {
    if (this.yardData) {
      this.yardForm = this.fb.group({
        yard_syscode: [this.yardData.yard_syscode ? this.yardData.yard_syscode : ''],
        yard_name: [this.yardData.yard_name ? this.yardData.yard_name : '', Validators.required],
        port_syscode: [this.yardData.port_syscode ? this.yardData.port_syscode : '', Validators.required],
        is_active: [this.yardData.is_active ? this.yardData.is_active : '', Validators.required]
      });
    } else {
      this.yardForm = this.fb.group({
        yard_syscode: [''],
        yard_name: ['', Validators.required],
        port_syscode: ['', Validators.required],
        is_active: ['', Validators.required]
      });
    }
    this.getAllPortMasters();
  }

  getAllPortMasters() {
    this._portService.getAllPortMasters().subscribe(
      (portMasters) => {
        this.portMasters = portMasters;
      },
      (err) => {
        console.log('could not fetch state masters');
      }
    );
  }

  submitYardForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.yardForm.valid) {
      if (!this.yardData) {
        this.saveYardMaster(this.yardForm);
      } else {
        this.updateYardMaster(this.yardForm);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  saveYardMaster(yardForm: any) {
    this._yardService.saveYardMaster(yardForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Yard Master Created Successfully');
        this._router.navigate(['/default/masters/yard/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create Port!');
      }
    );
  }

  updateYardMaster(yardForm: any) {
    this._yardService.updateYardMaster(yardForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Yard Master Updated Successfully');
        this._router.navigate(['/default/masters/yard/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not update Port!');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
