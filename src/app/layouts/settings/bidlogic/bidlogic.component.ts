import { Component, OnInit , Input  } from '@angular/core';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';

import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { NotificationService } from './../../../shared/services/notification.service';
import { Notification } from './../../../shared/models/notification';
import { TimeSlot } from 'src/app/shared/models/timeslot';
import { ThreeparamObj } from 'src/app/shared/models/threeparamObj';

import { MasterTypeService } from '../../cfs/services/master-type.service';
import { RoleService } from '../services/role.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import * as _moment from 'moment';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-bidlogic',
  templateUrl: './bidlogic.component.html',
  styleUrls: ['./bidlogic.component.scss']
})
export class BidlogicComponent implements OnInit {
  errorStateMatcher = new FormErrorStateMatcher();
  public orderForm: FormGroup;
  public minDate: Date;
  public maxDate: Date;
  public timeSlots: Array<any> = [];
  public message: String;

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _alertService: AlertService,
    private _notificationService: NotificationService,
    private datePipe: DatePipe,
    private _masterTypeService: MasterTypeService,
    private _roleService: RoleService,
  ) { }

  ngOnInit(): void {
    this.minDate = this.addDays(new Date(), 1);
    this.maxDate = this.addDays(new Date(), 15);
    this.initialiseOrderForm();
    this.getAllTimeSlots();
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  initialiseOrderForm() {
    this.orderForm = this.fb.group({
      orderDate: ['', Validators.required],
      createdOn: ['', Validators.required],
      timeSlotId: ['', Validators.required]
    });
  }

  getAllTimeSlots() {
    this._masterTypeService.getAllTimeSlotMasters().subscribe(
      (slots: TimeSlot[]) => {
        this.timeSlots = slots;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  timeSlotSelected(slotId) {

  }
  submitOrderForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.orderForm.valid) {
      console.log(this.orderForm.value);
      // console.log(this.datePipe.transform(this.orderForm.value.orderDate,"yyyy-MM-dd"));

      const filter: ThreeparamObj = {
        varOne: this.datePipe.transform(this.orderForm.value.createdOn,"yyyy-MM-dd"),
        varTwo: this.datePipe.transform(this.orderForm.value.orderDate,"yyyy-MM-dd"),
        varThree: this.orderForm.value.timeSlotId
      };
       this.runCheck(filter);
    } else {
      this._alertService.error('please review all the fields', 'Invalid Form!');
    }
  }

  runCheck(obj: ThreeparamObj) {
    this._roleService.checkBidLogic(obj).subscribe(
      (res) => {
        console.log(res);
        this.message = "Cutt Off Time for This Order Will be : " +  this.datePipe.transform(res[0].CutOffTime,"MMM d, y, h:mm:ss a");
        // this._alertService.success('Permissions Updated Successfully', 'Success !');
      },
      (err) => {
        console.log(err);
        // this._alertService.error('Permissions could not be created / updated', 'Failure !');
      }
    );
  }

}
