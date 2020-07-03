import { YardCFSRate } from './../../../shared/models/yardcfsrate';
import { Component, OnInit, Input } from '@angular/core';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StateMasterService } from '../services/state-master.service';
import { YardCFSRateService } from '../services/yardcfsrate.service';


import { WeightService } from '../services/weight.service';
import { YardService } from '../services/yard.service';
import { CfsService } from '../services/cfs.service';
import { ContianerService } from '../services/contianer.service';



@Component({
  selector: 'app-yardcfsrate-form',
  templateUrl: './yardcfsrate-form.component.html',
  styleUrls: ['./yardcfsrate-form.component.scss']
})
export class YardcfsrateFormComponent implements OnInit {
  @Input('yardcfsrateData') yardcfsrateData: YardCFSRate;
  matcher = new FormErrorStateMatcher();
  public yardcfsrateForm: FormGroup;
  public yardcfsrateMasters: Array<any> = [];

  public containerMaster: Array<any> = [];
  public cfsMaster: Array<any> = [];
  public yardMaster: Array<any> = [];
  public weightMaster: Array<any> = [];
  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _yardcfsrateService: YardCFSRateService,

    private _yardService: YardService,
    private _containerService: ContianerService,
    private _cfsService: CfsService,
    private _weightService: WeightService,
    private _router: Router
  ) { }


  getAllContainerMasters() {
    this._containerService.getAllContainerMasters().subscribe(
      (containerMasters) => {
        this.containerMaster = containerMasters;
      },
      (err) => {
        console.log('could not fetch Container masters');
      }
    );
  }

  // public containerMaster: Array<any> = [
  //   { container_syscode: 1, container_name: '8*8' },
  //   { container_syscode: 2, container_name: '9*9' },
  //   { container_syscode: 3, container_name: '10*10' },
  //   { container_syscode: 4, container_name: '11*11' },
  // ];

  // public cfsMaster: Array<any> = [
  //   { cfs_syscode: 1, cfs_name: 'P' },
  //   { cfs_syscode: 2, cfs_name: 'Q' },
  //   { cfs_syscode: 3, cfs_name: 'R' },
  //   { cfs_syscode: 4, cfs_name: 'S' },
  // ];

  getAllCFSMasters() {
    this._cfsService.getAllCfsMasters().subscribe(
      (cfsMasters) => {
        this.cfsMaster = cfsMasters;
      },
      (err) => {
        console.log('could not fetch CFS masters');
      }
    );
  }

  
  // public yardMaster: Array<any> = [
  //   { yard_syscode: 1, yard_name: 'A' },
  //   { yard_syscode: 2, yard_name: 'B' },
  //   { yard_syscode: 3, yard_name: 'C' },
  //   { yard_syscode: 4, yard_name: 'D' },
  // ];

  getAllYardMasters() {
    this._yardService.getAllYardMasters().subscribe(
      (yardMasters) => {
        this.yardMaster = yardMasters;
      },
      (err) => {
        console.log('could not fetch Yard masters');
      }
    );
  }

  // public weightMaster: Array<any> = [
  //   { weight_syscode: 1, weight_description: '10 ton' },
  //   { weight_syscode: 2, weight_description: '20 ton' },
  //   { weight_syscode: 3, weight_description: '30 ton' },
  //   { weight_syscode: 4, weight_description: '40 ton' },
  // ];

  getAllWeightMasters() {
    this._weightService.getAllWeightMasters().subscribe(
      (weightMasters) => {
        this.weightMaster = weightMasters;
      },
      (err) => {
        console.log('could not fetch weight masters');
      }
    );
  }

  
  ngOnInit(): void {
    if (this.yardcfsrateData) {
      this.yardcfsrateForm = this.fb.group({
        yard_cfs_rate_syscode: [this.yardcfsrateData.yard_cfs_rate_syscode ?
           this.yardcfsrateData.yard_cfs_rate_syscode : ''],
   
        cfs_syscode: [this.yardcfsrateData.cfs_syscode ? 
          this.yardcfsrateData.cfs_syscode : ''],
        yard_syscode: [this.yardcfsrateData.yard_syscode ? 
            this.yardcfsrateData.yard_syscode : '', Validators.required],
        container_syscode: [this.yardcfsrateData.container_syscode ? 
           this.yardcfsrateData.container_syscode : '', Validators.required],
        weight_syscode: [this.yardcfsrateData.weight_syscode ? this.yardcfsrateData.weight_syscode : 
          '', Validators.required],
          rate: [this.yardcfsrateData.rate ? this.yardcfsrateData.rate : '', 
        Validators.required],
        is_active: [this.yardcfsrateData.is_active ? this.yardcfsrateData.is_active : '', Validators.required]
      });
    } else {
      this.yardcfsrateForm = this.fb.group({
        yard_cfs_rate_syscode: [''],
        cfs_syscode: ['', Validators.required],
        yard_syscode: ['', Validators.required],
        container_syscode: ['', Validators.required],
        weight_syscode: ['', Validators.required],
        rate: ['', Validators.required],
        is_active: ['', Validators.required]
      });
    }
    this.getAllYardCFSRateMasters();

    this.getAllCFSMasters();
    this.getAllContainerMasters();
    this.getAllWeightMasters();
    this.getAllContainerMasters();
    this.getAllYardMasters();

  }

  getAllYardCFSRateMasters() {
    this._yardcfsrateService.getAllYardcfsrateMasters().subscribe(
      (yardcfsrateMasters) => {
        this.yardcfsrateMasters = yardcfsrateMasters;
      },
      (err) => {
        console.log('could not fetch Yard CFS Rate masters');
      }
    );
  }

  submitYardCFSRateForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.yardcfsrateForm.valid) {
      if (!this.yardcfsrateData) {
        this.saveYardCFSRateMaster(this.yardcfsrateForm);
      } else {
        this.updateYardCFSRateMaster(this.yardcfsrateForm);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  saveYardCFSRateMaster(yardcfsrateForm: any) {
    this._yardcfsrateService.saveYardcfsrateMaster(yardcfsrateForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Yard CFS Rate Master Created Successfully');
        this._router.navigate(['/default/masters/yardcfsrate/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create YARD CFS Rate Master!');
      }
    );
  }

  updateYardCFSRateMaster(yardcfsrateForm: any) {
    this._yardcfsrateService.updateYardcfsrateMaster(yardcfsrateForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Yard CFS Rate Master Updated Successfully');
        this._router.navigate(['/default/masters/yardcfsrate/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not update YARD CFS Rate Master!');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
