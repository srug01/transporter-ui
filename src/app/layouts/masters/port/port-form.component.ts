import { LocationService } from './../services/location.service';
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
    private _locationService: LocationService,
    private _portService: PortService,

    private _router: Router
  ) { }

  getLocations() {
    this._locationService.getAllLocationMasters().subscribe(
      (locations)=>{
        this.locations = locations;
      }
    );
  }

  ngOnInit(): void {
    this.getLocations();
    if (this.portData) {
      this.portForm = this.fb.group({
        portMasterId: [this.portData.portMasterId ? this.portData.portMasterId : ''],
        portName: [this.portData.portName ? this.portData.portName : '', Validators.required],
        stateMasterId: [this.portData.stateMasterId ? this.portData.stateMasterId : '', Validators.required],
        location: [this.portData.location ? this.portData.location : '', Validators.required],
        isActive: [this.portData.isActive ? this.portData.isActive : '', Validators.required]
      });
    } else {
      this.portForm = this.fb.group({
        portMasterId: [''],
        portName: ['', Validators.required],
        stateMasterId: ['', Validators.required],
        location: ['', Validators.required],
        isActive: ['', Validators.required]
      });
    }
    this.getAllStateMasters();

  }

  getAllStateMasters() {
    this._stateService.getAllStateMasters().subscribe(
      (stateMasters) => {
        this.stateMasters = stateMasters;
      },
      (err) => {
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
