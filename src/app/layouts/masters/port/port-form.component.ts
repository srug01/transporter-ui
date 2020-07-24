import { User } from './../../../shared/models/user';
import { UserService } from './../../../services/user.service';
import { Port } from 'src/app/shared/models/port';
import { LocationMaster } from 'src/app/shared/models/location';
import { State } from './../../../shared/models/state';
import { LocationService } from './../services/location.service';
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
  public stateMasters: Array<State> = [];
  public locationMasters: Array<LocationMaster> = [];
  public currentUser: User;


  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _stateService: StateMasterService,
    private _locationService: LocationService,
    private _portService: PortService,
    private _userService: UserService,
    private _router: Router
  ) { }

  getLocations() {
    this._locationService.getAllLocationMasters().subscribe(
      (locationMasters: Array<LocationMaster>) => {
        this.locationMasters = locationMasters;
      }
    );
  }

  ngOnInit(): void {
    this.getLocations();
    this.getAllStateMasters();
    this.getUserInfo();
    if (this.portData) {
      this.portForm = this.fb.group({
        portMasterId: [this.portData.portMasterId ? this.portData.portMasterId : ''],
        portName: [this.portData.portName ? this.portData.portName : '', Validators.required],
        stateMasterId: [this.portData.stateMasterId ? this.portData.stateMasterId : '', Validators.required],
        locationMasterId: [this.portData.locationMasterId ? this.portData.locationMasterId : '', Validators.required],
        isActive: [this.portData.isActive ? this.portData.isActive : '', Validators.required]
      });
    } else {
      this.portForm = this.fb.group({
        portMasterId: [''],
        portName: ['', Validators.required],
        stateMasterId: ['', Validators.required],
        locationMasterId: ['', Validators.required],
        isActive: ['', Validators.required]
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

  getAllStateMasters() {
    this._stateService.getAllStateMasters().subscribe(
      (stateMasters) => {
        this.stateMasters = stateMasters;
      },
      (err) => {
      }
    );
  }

  getAllLocationsByStateId(stateMasterId: number) {
    this._stateService.getAllLocationMastersByStateId(stateMasterId).subscribe(
      (locationMasters: Array<LocationMaster>) => {
        this.locationMasters = locationMasters;
      },
      (err) => {
      }
    );
  }

  stateSelected(stateMasterId) {
    this.getAllLocationsByStateId(stateMasterId);
  }

  transformPortObj(port: any): Port {
    return {
      portMasterId: port.portMasterId ? port.portMasterId : 0,
      createdBy: this.currentUser.userId,
      createdOn: new Date(),
      isActive: port.isActive,
      latitude: port.latitude,
      longitude: port.longitude,
      locationMasterId: port.locationMasterId,
      modifiedBy: this.currentUser.userId,
      modifiedOn: new Date(),
      portName: port.portName,
      stateMasterId: port.stateMasterId
    } as Port;
  }

  submitPortForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.portForm.valid) {
      const port: Port = this.transformPortObj(this.portForm.value);
      if (!this.portData) {
        console.log(port);
        this.savePortMaster(port);
      } else {
        this.updatePortMaster(port);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  savePortMaster(port: Port) {
    this._portService.savePortMaster(port).subscribe(
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

  updatePortMaster(port: Port) {
    this._portService.updatePortMaster(port).subscribe(
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
