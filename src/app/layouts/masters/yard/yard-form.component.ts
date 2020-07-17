import { UserService } from 'src/app/services/user.service';
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
import { User } from 'src/app/shared/models/user';



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
  public currentUser: User;

  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _yardService: YardService,
    private _portService: PortService,
    private _router: Router,
    private _userService: UserService

  ) { }

  ngOnInit(): void {
    this.getAllPortMasters();
    this.getUserInfo();
    if (this.yardData) {
      this.yardForm = this.fb.group({
        yardMasterId: [this.yardData.yardMasterId ? this.yardData.yardMasterId : ''],
        yardName: [this.yardData.yardName ? this.yardData.yardName : '', Validators.required],
        portMasterId: [this.yardData.portMasterId ? this.yardData.portMasterId : '', Validators.required],
        isActive: [this.yardData.isActive ? this.yardData.isActive : '', Validators.required],
        address: [this.yardData.address ? this.yardData.address : ''],
        createdBy: [this.yardData.createdBy ? this.yardData.createdBy : ''],
        createdOn: [this.yardData.createdOn ? this.yardData.createdOn : ''],
        latitude: [this.yardData.latitude ? this.yardData.latitude : ''],
        longitude: [this.yardData.longitude ? this.yardData.longitude : ''],
        modifiedBy: [this.yardData.modifiedBy ? this.yardData.modifiedBy : ''],
        modifiedOn: [this.yardData.modifiedOn ? this.yardData.modifiedOn : ''],
        pincode: [this.yardData.pincode ? this.yardData.pincode : '']
      });
    } else {
      this.yardForm = this.fb.group({
        yardMasterId: [''],
        yardName: ['', Validators.required],
        portMasterId: ['', Validators.required],
        isActive: ['', Validators.required],
        address: [''],
        createdBy: [''],
        createdOn: [''],
        latitude: [''],
        longitude: [''],
        modifiedBy: [''],
        modifiedOn: [''],
        pincode: ['']
      });
    }

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

  getUserInfo() {
    this._userService.getUsersInfo().subscribe(
      (loggedUser: User) => {
        this.currentUser = loggedUser;
      }
    );
  }

  transforYardObj(yard: Yard): Yard {
    return {
      address: yard.address,
      createdBy: this.currentUser.userId,
      createdOn: new Date(),
      isActive: yard.isActive,
      latitude: yard.latitude,
      longitude: yard.longitude,
      modifiedBy: this.currentUser.userId,
      modifiedOn: new Date(),
      pincode: yard.pincode,
      portMasterId: yard.portMasterId,
      yardMasterId: yard.yardMasterId,
      yardName: yard.yardName
    } as Yard;
  }

  submitYardForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.yardForm.valid) {
      const yard: Yard = this.transforYardObj(this.yardForm.value);
      if (!this.yardData) {
        this.saveYardMaster(yard);
      } else {
        this.updateYardMaster(yard);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  saveYardMaster(yard: Yard) {
    this._yardService.saveYardMaster(yard).subscribe(
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

  updateYardMaster(yard: Yard) {
    this._yardService.updateYardMaster(yard).subscribe(
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
