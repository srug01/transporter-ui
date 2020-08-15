import { CfsYardRateMaster } from './../../../shared/models/cfsyardrate';
import { Component, OnInit, Input } from '@angular/core';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StateMasterService } from '../services/state-master.service';
import { CfsYardRateService } from '../services/cfsyardrate.service';


import { WeightService } from '../services/weight.service';
import { YardService } from '../services/yard.service';
import { CfsService } from '../services/cfs.service';
import { ContainerService } from '../services/container.service';
import { PortService } from '../services/port.service';


@Component({
  selector: 'app-cfsyardrate-form',
  templateUrl: './cfsyardrate-form.component.html',
  styleUrls: ['./cfsyardrate-form.component.scss']
})
export class CfsyardrateFormComponent implements OnInit {
  @Input('cfsyardrateData') cfsyardrateData: CfsYardRateMaster;
  matcher = new FormErrorStateMatcher();
  public cfsyardrateForm: FormGroup;
  public cfsyardrateMasters: Array<any> = [];
  public containerMaster: Array<any> = [];
  public cfsMaster: Array<any> = [];
  public yardMaster: Array<any> = [];
  public weightMaster: Array<any> = [];
  public portMasters: Array<any> = [];
  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _cfsyardrateService: CfsYardRateService,
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
    this.cfsyardrateForm.get("weightMasterId").reset();
    this.getAllWeightMastersbyContainerID(containerTypeId);
  }


  ngOnInit(): void {
    if (this.cfsyardrateData) {
      this.cfsyardrateForm = this.fb.group({
        cfsYardRateMasterId: [this.cfsyardrateData.cfsYardRateMasterId ? this.cfsyardrateData.cfsYardRateMasterId : ''],
        cfsMasterId: [this.cfsyardrateData.cfsMasterId ? this.cfsyardrateData.cfsMasterId : ''],
        yardMasterId: [this.cfsyardrateData.yardMasterId ? this.cfsyardrateData.yardMasterId : '', Validators.required],
        containerMasterId: [this.cfsyardrateData.containerMasterId ? this.cfsyardrateData.containerMasterId : '', Validators.required],
        weightMasterId: [this.cfsyardrateData.weightMasterId ? this.cfsyardrateData.weightMasterId : '', Validators.required],
        portMasterId: [this.cfsyardrateData.portMasterId ? this.cfsyardrateData.portMasterId : '', Validators.required],
        rate: [this.cfsyardrateData.rate ? this.cfsyardrateData.rate : '', Validators.required],
        isActive: [this.cfsyardrateData.isActive ? this.cfsyardrateData.isActive : '', Validators.required],
        createdBy: [this.cfsyardrateData.createdBy ? this.cfsyardrateData.createdBy : 0],
        createdOn: new Date()
      });
    } else {
      this.cfsyardrateForm = this.fb.group({
        cfsYardRateMasterId: [''],
        cfsMasterId: ['', Validators.required],
        yardMasterId: ['', Validators.required],
        containerMasterId: ['', Validators.required],
        weightMasterId: ['', Validators.required],
        portMasterId: ['', Validators.required],
        rate: ['', Validators.required],
        isActive: ['', Validators.required],
        createdBy: [0],
        createdOn: new Date()
      });
    }
    this.getAllCFSYardRateMasters();

    this.getAllCFSMasters();
    this.getAllContainerMasters();
    //this.getAllWeightMasters();
    this.getAllContainerMasters();
    this.getAllYardMasters();
    this.getAllPortMasters();

  }

  getAllCFSYardRateMasters() {
    this._cfsyardrateService.getAllCfsYardRateMasters().subscribe(
      (cfsyardrateMasters) => {
        this.cfsyardrateMasters = cfsyardrateMasters;
      },
      (err) => {
        console.log('could not fetch CFS Yard Rate masters');
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
    const controls = this.cfsyardrateForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  submitcfsyardrateForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    //  this.findInvalidControls();
    if (this.cfsyardrateForm.valid) {
      if (!this.cfsyardrateData) {
        this.saveCFSYardRateMaster(this.cfsyardrateForm);
      } else {
        this.updateCFSYardRateMaster(this.cfsyardrateForm);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  saveCFSYardRateMaster(cfsyardrateForm: any) {
    this._cfsyardrateService.saveCfsYardRateMaster(cfsyardrateForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'CFS Yard Rate Master Created Successfully');
        this._router.navigate(['/default/masters/cfs-yard-rate/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', err.error.error.message);
      }
    );
  }

  updateCFSYardRateMaster(cfsyardrateForm: any) {
    this._cfsyardrateService.updateCfsYardRateMaster(cfsyardrateForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'CFS Yard Rate Master Updated Successfully');
        this._router.navigate(['/default/masters/cfsyardrate/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not update CFS YARD Rate Master!');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
