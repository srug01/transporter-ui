import { Mileage } from './../../../shared/models/mileage';
import { Component, OnInit, Input } from '@angular/core';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StateMasterService } from '../services/state-master.service';
import { MileageService } from '../services/mileage.service';

@Component({
  selector: 'app-mileage-form',
  templateUrl: './mileage-form.component.html',
  styleUrls: ['./mileage-form.component.scss']
})
export class MileageFormComponent implements OnInit {
  @Input('mileageData') mileageData: Mileage;
  matcher = new FormErrorStateMatcher();
  public mileageForm: FormGroup;
  public stateMasters: Array<any> = [];

  public weightMasters: Array<any> = [
    { weight_syscode: 1, weight_name: '5 Ton' },
    { weight_syscode: 2, weight_name: '10 Ton' },
    { weight_syscode: 3, weight_name: '15 Ton' },
    { weight_syscode: 4, weight_name: '20 Ton' },
  ];

  public containers: Array<any> = [
    { container_syscode: 1, container_name: '2*2' },
    { container_syscode: 2, container_name: '5*5' },
    { container_syscode: 3, container_name: '10*10' },
    { container_syscode: 4, container_name: '20*20' },
  ];



  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _stateService: StateMasterService,
    private _mileageService: MileageService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (this.mileageData) {
      this.mileageForm = this.fb.group({
        mileageId: [this.mileageData.mileageId ? this.mileageData.mileageId : ''],
        mileage: [this.mileageData.mileage ? this.mileageData.mileage : '', Validators.required],
        weightId: [this.mileageData.weightId ? this.mileageData.weightId : '', Validators.required],
        containerId: [this.mileageData.containerId ? this.mileageData.containerId : '', Validators.required],
        isActive: [this.mileageData.isActive ? this.mileageData.isActive : true, Validators.required]
      });
    } else {
      this.mileageForm = this.fb.group({
        mileageId: [''],
        mileage: ['', Validators.required],
        weightId: ['', Validators.required],
        containerId: ['', Validators.required],
        isActive: [true, Validators.required]
      });
    }
  //  this.getAllMileageMasters();
  }

  submitMileageForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.mileageForm.valid) {
      if (!this.mileageData) {
        this.saveMileageMaster(this.mileageForm);
      } else {
        this.updateMileageMaster(this.mileageForm);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  saveMileageMaster(mileageForm: any) {
    this._mileageService.saveMileageMaster(mileageForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Mileage Master Created Successfully');
        this._router.navigate(['/default/masters/mileage/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create Mileage!');
      }
    );
  }

  updateMileageMaster(mileageForm: any) {
    this._mileageService.updateMileageMaster(mileageForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Mileage Master Updated Successfully');
        this._router.navigate(['/default/masters/mileage/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not update Mileage!');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  

}
