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
import * as moment from 'moment';



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
  public stateMasters: Array<any> = [];
  public locationMasters: Array<any> = [];
  public state:State;
  public location: Location;
  public currentUser: User;
  public userId = parseInt(localStorage.getItem('userID'), 10);

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
      this.getAllStateMasters();
    this.getAllLocationMasters();
    if (this.yardData) {
      this.yardForm = this.fb.group({
        yardMasterId: [this.yardData.yardMasterId ? this.yardData.yardMasterId : ''],
        yardName: [this.yardData.yardName ? this.yardData.yardName : '', Validators.required],
        portMasterId: [this.yardData.portMasterId ? this.yardData.portMasterId : '', Validators.required],
        isActive: [this.yardData.isActive ? this.yardData.isActive : true, Validators.required],
        address1: [this.yardData.address1 ? this.yardData.address1 : '', Validators.required],
        address2: [this.yardData.address2 ? this.yardData.address2 : ''],
        landmark: [this.yardData.landmark ? this.yardData.landmark : ''],
        locationMasterId: [this.yardData.locationMasterId ? this.yardData.locationMasterId : '', Validators.required],
        stateMasterId: [this.yardData.stateMasterId ? this.yardData.stateMasterId : '', Validators.required],
        latitude: [this.yardData.latitude ? this.yardData.latitude : ''],
        longitude: [this.yardData.longitude ? this.yardData.longitude : ''],
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
        isActive: [true, Validators.required],
        address1: ['', Validators.required],
        address2: [''],
        landmark: [''],
        locationMasterId: ['', Validators.required],
        stateMasterId: ['', Validators.required],
        latitude: [''],
        longitude: [''],
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
        this.getStatebyId(portMaster.stateMasterId);
        this.getLocationbyId(portMaster.locationMasterId);
          },
      (err) => {
        console.log(err);
      }
    );

  }

  getStatebyId(stateId: number){
     this.state = this.stateMasters.find(a=> a.stateMasterId == stateId);
    if(this.state != null)
    {
      this.stateMasters = this.stateMasters.filter(s=> s.stateMasterId == stateId) ;
      this.yardForm.get('stateMasterId').setValue(stateId);
    }
  }

  getLocationbyId(locationId: number){
    this.location = this.locationMasters.find(a=> a.locationMasterId == locationId);
   if(this.location != null)
   {
     this.locationMasters = this.locationMasters.filter(l=> l.locationMasterId == locationId) ;
     this.yardForm.get('locationMasterId').setValue(locationId);
   }
 }

  stateSelected(stateMasterId) {
    this.getAllLocationsByStateId(stateMasterId);
  }
  portSelected(portMasterId) {

    this.getAllStateMasters();
    this.getAllLocationMasters();
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
      isActive: yard.isActive,
      latitude: yard.latitude,
      longitude: yard.longitude,
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
        yard.createdBy = this.userId;
        yard.createdOn = moment().format('YYYY-MM-DD h:mm:ss a').toString();
        this.saveYardMaster(yard);
      } else {
        yard.modifiedBy = this.userId;
        yard.modifiedOn = moment().format('YYYY-MM-DD h:mm:ss a').toString();
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
        this._router.navigate(['/default/masters/yard/yard-list']);
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
        this._router.navigate(['/default/masters/yard/yard-list']);
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
