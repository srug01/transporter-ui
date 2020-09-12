import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, Input } from '@angular/core';

import { Yard } from './../../../shared/models/yard';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { YardService } from '../services/yard.service';
import { PortService } from '../services/port.service';
import { StateMasterService } from '../services/state-master.service';
import { LocationService } from '../services/location.service';
import { User } from 'src/app/shared/models/user';
import { State } from 'src/app/shared/models/state';



@Component({
  selector: 'app-yard-form',
  templateUrl: './yard-form.component.html',
  styleUrls: ['./yard-form.component.scss']
})
export class YardFormComponent implements OnInit {
  @Input('yardData') yardData: Yard;
  matcher = new FormErrorStateMatcher();
  public yardForm: FormGroup;
  public portMasters: Array<any> = [];
  public stateMasters: Array<State> = new Array<State>();
  public locationMasters: Array<any> = [];
  public currentUser: User;

  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _yardService: YardService,
    private _portService: PortService,
    private _stateService: StateMasterService,
    private _locationService: LocationService,
    private _router: Router,
    private _userService: UserService

  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getAllPortMasters();
    // this.getAllStateMasters();
    // this.getAllLocationMasters();
    if (this.yardData) {
      this.yardForm = this.fb.group({
        yardMasterId: [this.yardData.yardMasterId ? this.yardData.yardMasterId : ''],
        yardName: [this.yardData.yardName ? this.yardData.yardName : '', Validators.required],
        portMasterId: [this.yardData.portMasterId ? this.yardData.portMasterId : '', Validators.required],
        isActive: [this.yardData.isActive ? this.yardData.isActive : '', Validators.required],
        address1: [this.yardData.address1 ? this.yardData.address1 : '', Validators.required],
        address2: [this.yardData.address2 ? this.yardData.address2 : ''],
        landmark: [this.yardData.landmark ? this.yardData.landmark : ''],
        locationMasterId: [this.yardData.locationMasterId ? this.yardData.locationMasterId : '', Validators.required],
        stateMasterId: [this.yardData.stateMasterId ? this.yardData.stateMasterId : '', Validators.required],
        createdBy: [this.yardData.createdBy ? this.yardData.createdBy : ''],
        createdOn: [this.yardData.createdOn ? this.yardData.createdOn : ''],
        latitude: [this.yardData.latitude ? this.yardData.latitude : ''],
        longitude: [this.yardData.longitude ? this.yardData.longitude : ''],
        modifiedBy: [this.yardData.modifiedBy ? this.yardData.modifiedBy : ''],
        modifiedOn: [this.yardData.modifiedOn ? this.yardData.modifiedOn : ''],
        pincode: [this.yardData.pincode ? this.yardData.pincode : '',
        Validators.compose([Validators.pattern('[0-9]\\d{5}'), Validators.required])],
        primarycontactperson: [this.yardData.primarycontactperson ? this.yardData.primarycontactperson : '', Validators.required],
        primarycontactnumber: [this.yardData.primarycontactnumber ? this.yardData.primarycontactnumber : '', Validators.required],
      });
      this.getStateAndLocationByPortId(this.yardData.portMasterId);

    } else {
      this.yardForm = this.fb.group({
        yardMasterId: [''],
        yardName: ['', Validators.required],
        portMasterId: ['', Validators.required],
        isActive: ['', Validators.required],
        address1: ['', Validators.required],
        address2: [''],
        landmark: [''],
        locationMasterId: ['', Validators.required],
        stateMasterId: ['', Validators.required],
        createdBy: [''],
        createdOn: [''],
        latitude: [''],
        longitude: [''],
        modifiedBy: [''],
        modifiedOn: [''],
        pincode: ['', Validators.compose([Validators.pattern('[0-9]\\d{5}'), Validators.required])],
        primarycontactperson: ['', Validators.required],
        primarycontactnumber: ['', Validators.required],

      });
    }

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
      (locationMasters) => {
        this.locationMasters = locationMasters;
      },
      (err) => {
        console.log('could not fetch location masters');
      }
    );
  }


  getAllLocationsByStateId(stateMasterId: number) {
    this._stateService.getAllLocationMastersByStateId(stateMasterId).subscribe(
      (locationMasters) => {
        this.locationMasters = locationMasters;
      },
      (err) => {
      }
    );
  }

  getStateAndLocationByPortId(portMasterId: number) {

    this._portService.getPortMastersById(portMasterId).subscribe(
      (portMaster) => {
        console.log("First : " + portMaster.stateMasterId);
        this._stateService.getStateMastersById(portMaster.stateMasterId).subscribe(
          (stateArray: Array<State>) => {
            this.stateMasters = stateArray;
            console.log(this.stateMasters);
            /* console.log("States : " +  stateArray[0]);
            if(this.stateMasters.length === 1)
            {
              let state =  this.stateMasters[0];
              console.log(state);
              this.getAllLocationsByStateId(state.stateMasterId);
            } */

          },
          (err) => {
          }
        );
          },
      (err) => {
      }
    );

  }



  stateSelected(stateMasterId) {
    this.getAllLocationsByStateId(stateMasterId);
  }
  portSelected(portMasterId) {
    console.log(portMasterId);
    this.getStateAndLocationByPortId(portMasterId);
  }

  getUserInfo() {
    this._userService.getUsersInfo().subscribe(
      (loggedUser: User) => {
        this.currentUser = loggedUser;
      }
    );
  }

  transforYardObj(yard: Yard): Yard {
    return {
      address1: yard.address1,
      address2: yard.address2,
      landmark: yard.landmark,
      locationMasterId: yard.locationMasterId,
      stateMasterId: yard.stateMasterId,
      createdBy: this.currentUser.userId,
      createdOn: new Date(),
      isActive: yard.isActive,
      latitude: yard.latitude,
      longitude: yard.longitude,
      modifiedBy: this.currentUser.userId,
      modifiedOn: new Date(),
      pincode: yard.pincode,
      portMasterId: yard.portMasterId,
      yardMasterId: yard.yardMasterId,
      yardName: yard.yardName,
      primarycontactperson: yard.primarycontactperson,
      primarycontactnumber: yard.primarycontactnumber
    } as Yard;
  }

  submitYardForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.yardForm.valid) {
      const yard: Yard = this.transforYardObj(this.yardForm.value);
      if (!this.yardData) {
        this.saveYardMaster(yard);
      } else {
        this.updateYardMaster(yard);
      }
    } else {
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  saveYardMaster(yard: Yard) {
    this._yardService.saveYardMaster(yard).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Yard Master Created Successfully');
        this._router.navigate(['/default/masters/yard/list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create Port!');
      }
    );
  }

  updateYardMaster(yard: Yard) {
    this._yardService.updateYardMaster(yard).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Yard Master Updated Successfully');
        this._router.navigate(['/default/masters/yard/list']);
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
