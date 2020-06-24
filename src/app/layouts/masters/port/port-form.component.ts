import { Port } from './../../../shared/models/port';
import { Component, OnInit, Input } from '@angular/core';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StateMasterService } from '../services/state-master.service';
import { PortService } from '../services/port.service';
import {  LocationService } from './../services/location.service';

@Component({
  selector: 'app-port-form',
  templateUrl: './port-form.component.html',
  styleUrls: ['./port-form.component.scss']
})
export class PortFormComponent implements OnInit {
  @Input('portData') portData: Port;
  matcher = new FormErrorStateMatcher();
  public portForm: FormGroup;
  public stateMasters: Array<any> = [];
  public locations: Array<any> = [];


  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _stateService: StateMasterService,
    private _portService: PortService,
    private _locationService: LocationService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (this.portData) {
      this.portForm = this.fb.group({
        port_syscode: [this.portData.port_syscode ? this.portData.port_syscode : ''],
        port_name: [this.portData.port_name ? this.portData.port_name : '', Validators.required],
        state_syscode: [this.portData.state_syscode ? this.portData.state_syscode : '', Validators.required],
        location_syscode: [this.portData.location_syscode ? this.portData.location_syscode : '', Validators.required],
        is_active: [this.portData.is_active ? this.portData.is_active : '', Validators.required]
      });
    } else {
      this.portForm = this.fb.group({
        port_syscode: [''],
        port_name: ['', Validators.required],
        state_syscode: ['', Validators.required],
        location_syscode: ['', Validators.required],
        is_active: ['', Validators.required]
      });
    }
    this.getAllStateMasters();
    this.getAllLocationMasters();
  }

  getAllStateMasters() {
    this._stateService.getAllStateMasters().subscribe(
      (stateMasters) => {
        this.stateMasters = stateMasters;
      },
      (err) => {
        console.log('could not fetch state masters');
      }
    );
  }

  getAllLocationMasters() {
    this._locationService.getAllLocationMasters().subscribe(
      (locations) => {
        this.locations = locations;
      }
    );
  }

  submitPortForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.portForm.valid) {
      if (!this.portData) {
        this.savePortMaster(this.portForm);
      } else {
        this.updatePortMaster(this.portForm);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  savePortMaster(portForm: any) {
    this._portService.savePortMaster(portForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Port Master Created Successfully');
        this._router.navigate(['/default/masters/port/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create Port!');
      }
    );
  }

  updatePortMaster(portForm: any) {
    this._portService.updatePortMaster(portForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Port Master Updated Successfully');
        this._router.navigate(['/default/masters/port/list']);
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
