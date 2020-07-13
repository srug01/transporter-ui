import { Cfsrate } from './../../../shared/models/cfsrate';
import { Component, OnInit, Input } from '@angular/core';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CfsrateService } from '../services/cfsrate.service';
import { PortService } from '../services/port.service';
import { WeightService } from '../services/weight.service';
import { CfsService } from '../services/cfs.service';
import { ContianerService } from '../services/contianer.service';

@Component({
  selector: 'app-cfsrate-form',
  templateUrl: './cfsrate-form.component.html',
  styleUrls: ['./cfsrate-form.component.scss']
})
export class CfsrateFormComponent implements OnInit {
  @Input('cfsrateData') cfsrateData: Cfsrate;
  matcher = new FormErrorStateMatcher();
  public cfsrateForm: FormGroup;
  public cfsMasters: Array<any> = [];
  public portMasters: Array<any> = [];
  public weightMasters: Array<any> = [];
  public containerMaster: Array<any> = [];
  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _cfsrateService: CfsrateService,
    private _containerService: ContianerService,
    private _portService: PortService,
    private _weightService: WeightService,
    private _cfsService: CfsService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (this.cfsrateData) {
      this.cfsrateForm = this.fb.group({
        cfsRateId: [this.cfsrateData.cfsRateId ? this.cfsrateData.cfsRateId : ''],
        cfsId: [this.cfsrateData.cfsId ? this.cfsrateData.cfsId : '', Validators.required],
        portId: [this.cfsrateData.portId ? this.cfsrateData.portId : '', Validators.required],
        cotainerId: [this.cfsrateData.cotainerId ? this.cfsrateData.cotainerId : '', Validators.required],
        weightId: [this.cfsrateData.weightId ? this.cfsrateData.weightId : '', Validators.required],
        rate: [this.cfsrateData.rate ? this.cfsrateData.rate : 0, Validators.required],
        isActive: [this.cfsrateData.isActive ? this.cfsrateData.isActive : '', Validators.required]
      });
    } else {
      this.cfsrateForm = this.fb.group({
        cfsRateId: [''],
        cfsId: ['', Validators.required],
        portId: ['', Validators.required],
        cotainerId: ['', Validators.required],
        weightId: ['', Validators.required],
        rate: [0, Validators.required],
        isActive: ['', Validators.required]
      });
    }
    this.getAllPortMasters();
    this.getAllWeightMasters();
    this.getAllCfsMasters();
    this.getAllContainerMasters();
  }



  getAllContainerMasters() {
    this._containerService.getAllContainerMasters().subscribe(
      (containerMasters) => {
        this.containerMaster = containerMasters;
      },
      (err) => {
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

  getAllWeightMasters() {
    this._weightService.getAllWeightMasters().subscribe(
      (weightMasters) => {
        this.weightMasters = weightMasters;
      },
      (err) => {
      }
    );
  }

  getAllCfsMasters() {
    this._cfsService.getAllCfsMasters().subscribe(
      (cfsMasters) => {
        this.cfsMasters = cfsMasters;
      },
      (err) => {
      }
    );
  }

  submitcfsrateForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.cfsrateForm.valid) {
      if (!this.cfsrateData) {
        this.saveCfsrateMaster(this.cfsrateForm);
      } else {
        this.updateCfsrateMaster(this.cfsrateForm);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  saveCfsrateMaster(cfsrateForm: any) {

    this._cfsrateService.saveCfsRateMaster(cfsrateForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'CFS Rate Master Created Successfully');
        this._router.navigate(['/default/masters/cfs-rate/list']);
      },
      (err) => {
        this.openSnackBar('Failure !', 'Could not create CFS Rate Master!');
      }
    );
  }

  updateCfsrateMaster(cfsrateForm: any) {
    this._cfsrateService.updateCfsRateMaster(cfsrateForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'CFS Rate Master Updated Successfully');
        this._router.navigate(['/default/masters/cfs-rate/list']);
      },
      (err) => {
        this.openSnackBar('Failure !', 'Could not update CFS Rate Master!');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
