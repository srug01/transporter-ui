import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { PortService } from '../services/port.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';
import { StateMasterService} from './../services/state-master.service';
import {  LocationService } from './../services/location.service';
import { State } from 'src/app/shared/models/state';
import { LocationMaster } from 'src/app/shared/models/location';

@Component({
  selector: 'app-port-master-list',
  templateUrl: './port-master-list.component.html',
  styleUrls: ['./port-master-list.component.scss']
})
export class PortMasterListComponent implements OnInit {
  displayedColumns: string[] = [
    'port_syscode', 'port_name', 'state_syscode', 'location_syscode', 'is_active', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public portMasters: Array<any> = [];
  public states: Array<State> = [];
  public locations: Array<LocationMaster> = [];

  constructor(
      private _portService: PortService,
      private _stateService: StateMasterService,
      private _locationService: LocationService,
      private _snackBar: MatSnackBar,
      private _router: Router,
      public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllPortMasters();
    this.getAllStateMasters();
    this.getAllLocations();
  }

  getAllLocations() {
    this._locationService.getAllLocationMasters().subscribe(
      (locations) => {
        this.locations = locations;
      }
    );
  }

  getAllStateMasters() {
    this._stateService.getAllStateMasters().subscribe(
      (states) => {
        this.states = states;
      }
    );
  }
  openDialog(ev, portId: number) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePortById(portId);
      }
    });
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

  getStatebyId(id): string {
    for (let i = 0; i < this.states.length; i++) {
      if (this.states[i].stateMasterId === id) {
        return this.states[i].stateName;
      }
    }
  }

  getLocationbyId(id): string
  {

    for (let i = 0; i < this.locations.length; i++) {
      if (this.locations[i].locationId === id) {
        return this.locations[i].locationName;
      }
    }
  }
  deletePortById(portId: number) {
    this._portService.deletePortMastersById(portId).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Port Master Deleted Successfully');
        this.getAllPortMasters();
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
