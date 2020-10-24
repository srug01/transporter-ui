import { ContainerMaster } from './../../../shared/models/containerMaster';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';

import { Weight } from './../../../shared/models/weight';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WeightService } from '../services/weight.service';
import { User } from 'src/app/shared/models/user';
import { ContainerService } from '../services/container.service';
import * as moment from 'moment';


@Component({
  selector: 'app-weight-form',
  templateUrl: './weight-form.component.html',
  styleUrls: ['./weight-form.component.scss']
})
export class WeightFormComponent implements OnInit {
  @Input('weightData') weightData: Weight;
  matcher = new FormErrorStateMatcher();
  public weightForm: FormGroup;
  public currentUser: User;
  public containerMasters: ContainerMaster[];
  public userId = parseInt(localStorage.getItem('userID'), 10);

  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _weightService: WeightService,
    private _router: Router,
    private _userService: UserService,
    private _containerMasterService: ContainerService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getAllContainerMasters();
    if (this.weightData) {
      this.weightForm = this.fb.group({
        weightMasterId: [this.weightData.weightMasterId ? this.weightData.weightMasterId : ''],
        weightDesc: [this.weightData.weightDesc ? this.weightData.weightDesc : '', Validators.required],
        isActive: [this.weightData.isActive === false ? false  : true, Validators.required],
        createdBy: [this.weightData.createdBy ? this.weightData.createdBy : ''],
        createdOn: [this.weightData.createdOn ? this.weightData.createdOn : ''],
        modifiedBy: [this.weightData.modifiedBy ? this.weightData.modifiedBy : ''],
        modifiedOn: [this.weightData.modifiedOn ? this.weightData.modifiedOn : ''],
        containerMasterId: [this.weightData.containerMasterId ? this.weightData.containerMasterId : '', Validators.required]
      });
    } else {
      this.weightForm = this.fb.group({
        weightMasterId: [''],
        weightDesc: ['', Validators.required],
        isActive: [true, Validators.required],
        createdBy: [''],
        createdOn: [''],
        modifiedBy: [''],
        modifiedOn: [''],
        containerMasterId: ['', Validators.required],
      });
    }
  }

  getUserInfo() {
    this._userService.getUsersInfo().subscribe(
      (loggedUser: User) => {
        this.currentUser = loggedUser;
      }
    );
  }

  getAllContainerMasters() {
    this._containerMasterService.getAllContainerMasters().subscribe(
      (containerMasters: ContainerMaster[]) => {
        this.containerMasters = containerMasters;
      },
      () => { }
    );
  }


  transformWeightMaster(weight: Weight): Weight {
    return {
      weightMasterId: weight.weightMasterId ? weight.weightMasterId : 0,
      containerMasterId: weight.containerMasterId,
      isActive: weight.isActive,
      weightDesc: weight.weightDesc
    } as Weight;
  }

  submitWeightForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.weightForm.valid) {
      const weight: Weight = this.transformWeightMaster(this.weightForm.value);
      if (!this.weightData) {
        weight.createdBy = this.userId;
        weight.createdOn = moment().format('YYYY-MM-DD h:mm:ss a').toString();
        this.saveWeightMaster(weight);
      } else {
        weight.modifiedBy = this.userId;
        weight.modifiedOn = moment().format('YYYY-MM-DD h:mm:ss a').toString();
        this.updateWeightMaster(weight);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  saveWeightMaster(weight: Weight) {
    this._weightService.saveWeightMaster(weight).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Weight Master Created Successfully');
        this._router.navigate(['/default/masters/weight/weight-list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create Weight!');
      }
    );
  }

  updateWeightMaster(weight: Weight) {
    this._weightService.updateWeightMaster(weight).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Weight Master Updated Successfully');
        this._router.navigate(['/default/masters/weight/weight-list']);
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
