import { Cfs } from './../../../shared/models/cfs';
import { Component, OnInit, Input } from '@angular/core';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CfsService } from '../services/cfs.service';
import { PortService } from '../services/port.service';
import { LocationService } from '../services/location.service';


@Component({
  selector: 'app-cfs-form',
  templateUrl: './cfs-form.component.html',
  styleUrls: ['./cfs-form.component.scss']
})
export class CfsFormComponent implements OnInit {
  @Input('cfsData') cfsData: Cfs;
  matcher = new FormErrorStateMatcher();
  public cfsForm: FormGroup;
  public portMasters: Array<any> = [];
  public locations: Array<any> = [];
  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _cfsService: CfsService,
    private _portService: PortService,
    private _router: Router,
    private _locationService: LocationService
  ) { }

  ngOnInit(): void {
    if (this.cfsData) {
      this.cfsForm = this.fb.group({
        cfs_syscode: [this.cfsData.cfs_syscode ? this.cfsData.cfs_syscode : ''],
        cfs_name: [this.cfsData.cfs_name ? this.cfsData.cfs_name : '', Validators.required],
        contact_no: [this.cfsData.contact_no ? this.cfsData.contact_no : '', Validators.required],
        email_id: [this.cfsData.email_id ? this.cfsData.email_id : '', Validators.required],
        address: [this.cfsData.address ? this.cfsData.address : '', Validators.required],
        pincode: [this.cfsData.pincode ? this.cfsData.pincode : '', Validators.required],
        cfs_code_no: [this.cfsData.cfs_code_no ? this.cfsData.cfs_code_no : '', Validators.required],
        gstn: [this.cfsData.gstn ? this.cfsData.gstn : '', Validators.required],
        pan: [this.cfsData.pan ? this.cfsData.pan : '', Validators.required],
        tan: [this.cfsData.tan ? this.cfsData.tan : '', Validators.required],
        primary_contact_name: [this.cfsData.primary_contact_name ? this.cfsData.primary_contact_name : '', Validators.required],
        primary_mobile_no: [this.cfsData.primary_mobile_no ? this.cfsData.primary_mobile_no : '', Validators.required],
        additional_contact_name: [this.cfsData.additional_contact_name ? this.cfsData.additional_contact_name : '', Validators.required],
        additional_mobile_no: [this.cfsData.additional_mobile_no ? this.cfsData.additional_mobile_no : '', Validators.required],
        port_syscode: [this.cfsData.port_syscode ? this.cfsData.port_syscode : '', Validators.required],
        location: [this.cfsData.location ? this.cfsData.location : '', Validators.required],
        is_active: [this.cfsData.is_active ? this.cfsData.is_active : '', Validators.required]
      });
    } else {
      this.cfsForm = this.fb.group({
        cfs_syscode: [''],
        cfs_name: ['', Validators.required],
        contact_no: ['', Validators.required],
        email_id: ['', Validators.required],
        address: ['', Validators.required],
        pincode: ['', Validators.required],
        cfs_code_no: ['', Validators.required],
        gstn: ['', Validators.required],
        pan: ['', Validators.required],
        tan: ['', Validators.required],
        primary_contact_name: ['', Validators.required],
        primary_mobile_no: ['', Validators.required],
        additional_contact_name: ['', Validators.required],
        additional_mobile_no: ['', Validators.required],
        port_syscode: ['', Validators.required],
        location: ['', Validators.required],
        is_active: ['', Validators.required]
      });
    }
    this.getAllPortMasters();
    this.getLocations();
  }

  getLocations() {
    this._locationService.getAllLocationMasters().subscribe(
      (locations) => {
        this.locations = locations;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllPortMasters() {
    this._portService.getAllPortMasters().subscribe(
      (portMasters) => {
        this.portMasters = portMasters;
      },
      (err) => {
        console.log('could not fetch port masters');
      }
    );
  }

  submitCfsForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.cfsForm.valid) {
      if (!this.cfsData) {
        this.saveCfsMaster(this.cfsForm);
      } else {
        this.updateCfsMaster(this.cfsForm);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  saveCfsMaster(cfsForm: any) {
    this._cfsService.saveCfsMaster(cfsForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Cfs Master Created Successfully');
        this._router.navigate(['/default/masters/cfs/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create Cfs!');
      }
    );
  }

  updateCfsMaster(cfsForm: any) {
    this._cfsService.updateCfsMaster(cfsForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Cfs Master Updated Successfully');
        this._router.navigate(['/default/masters/cfs/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not update Cfs!');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
