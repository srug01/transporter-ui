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
import { ContainerService } from '../services/container.service';
import { PortService } from '../services/port.service';



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
  public portMasters: Array<any> = [];
  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _yardcfsrateService: YardCFSRateService,
    private _yardService: YardService,
    private _containerService: ContainerService,
    private _portService: PortService,
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



  /* getAllWeightMasters() {
    this._weightService.getAllWeightMasters().subscribe(
      (weightMasters) => {
        this.weightMaster = weightMasters;
      },
      (err) => {
        console.log('could not fetch weight masters');
      }
    );
  } */

  getAllWeightMastersbyContainerID(id: number){
    this.weightMaster = [];
    this.weightMaster.length = 0;

    this._weightService.getAllWeightMastersbyContainerID(id).subscribe(
      (weightMasters) => {
        this.weightMaster = weightMasters;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  containerTypeSelected(containerTypeId)
  {
    this.yardcfsrateForm.get("weightMasterId").reset();
    this.getAllWeightMastersbyContainerID(containerTypeId);
  }


  ngOnInit(): void {
    if (this.yardcfsrateData) {
      this.yardcfsrateForm = this.fb.group({
        yardCfsRateMasterId: [this.yardcfsrateData.yardCfsRateMasterId ? this.yardcfsrateData.yardCfsRateMasterId : ''],
        cfsMasterId: [this.yardcfsrateData.cfsMasterId ? this.yardcfsrateData.cfsMasterId : ''],
        yardMasterId: [this.yardcfsrateData.yardMasterId ? this.yardcfsrateData.yardMasterId : '', Validators.required],
        containerMasterId: [this.yardcfsrateData.containerMasterId ? this.yardcfsrateData.containerMasterId : '', Validators.required],
        weightMasterId: [this.yardcfsrateData.weightMasterId ? this.yardcfsrateData.weightMasterId : '', Validators.required],
        portMasterId: [this.yardcfsrateData.portMasterId ? this.yardcfsrateData.portMasterId : '', Validators.required],
        rate: [this.yardcfsrateData.rate ? this.yardcfsrateData.rate : '', Validators.required],
        isActive: [this.yardcfsrateData.isActive ? this.yardcfsrateData.isActive : '', Validators.required],
        createdBy: [this.yardcfsrateData.createdBy ? this.yardcfsrateData.createdBy : 0]
      });
    } else {
      this.yardcfsrateForm = this.fb.group({
        yardCfsRateMasterId: [''],
        cfsMasterId: ['', Validators.required],
        yardMasterId: ['', Validators.required],
        containerMasterId: ['', Validators.required],
        weightMasterId: ['', Validators.required],
        portMasterId: ['', Validators.required],
        rate: ['', Validators.required],
        isActive: ['', Validators.required],
        createdBy: [0]
      });
    }
    this.getAllYardCFSRateMasters();

    this.getAllCFSMasters();
    this.getAllContainerMasters();
    //this.getAllWeightMasters();
    this.getAllContainerMasters();
    this.getAllYardMasters();
    this.getAllPortMasters();

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

  getAllPortMasters() {
    this._portService.getAllPortMasters().subscribe(
      (portMasters) => {
        this.portMasters = portMasters;
      },
      (err) => {
      }
    );
  }
  // This Control For Finding Invalid Control
  public findInvalidControls() {
    const invalid = [];
    const controls = this.yardcfsrateForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  submitYardCFSRateForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    //  this.findInvalidControls();
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
