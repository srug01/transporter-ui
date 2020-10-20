import { Vehicle } from './../../../shared/models/vehicle';
import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { VehicleService } from '../services/vehicle.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';
import { StateMasterService } from '../../masters/services/state-master.service';
import { State } from 'src/app/shared/models/state';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-vehicle-registration-list',
  templateUrl: './vehicle-registration-list.component.html',
  styleUrls: ['./vehicle-registration-list.component.scss']
})
export class VehicleRegistrationListComponent implements OnInit {

  displayedColumns: string[] = [
    'vehicleMasterId', 'vehicleNumber', 'vehicleType', 'vehicleCapacity',
    'weight', 'manufactureYear', 'state', 'owned', 'action'
  ];
  public vehicleMasters: MatTableDataSource<Vehicle>;
  @ViewChild(MatSort) vehicleSort: MatSort;
  public dataSource: any[];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public states: State[];
  public userId = parseInt(localStorage.getItem('userID'), 10);
  public roleId = parseInt(localStorage.getItem('roleID'), 10);


  constructor(
    private _ngZone: NgZone,
    private _vehicleService: VehicleService,
    private _stateService: StateMasterService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllVehicleMasters();
    this.getAllStates();
  }

  getAllVehicleMasters() {
    if (this.roleId == 1) {
      this._vehicleService.getAllVehicleMasters().subscribe(
        (vehicleMasters) => {
          // console.log(vehicleMasters);
          this.vehicleMasters = new MatTableDataSource(vehicleMasters);
          this.vehicleMasters.sort = this.vehicleSort;
        },
        (err) => {
          console.log('could not fetch vehicle masters');
        }
      );
    }
    else {
      this._vehicleService.getAllVehiclesbyUserId(this.userId).subscribe(
        (vehicleMasters) => {
          this.vehicleMasters = new MatTableDataSource(vehicleMasters);
          this.vehicleMasters.sort = this.vehicleSort;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  getAllStates() {
    this._stateService.getAllStateMasters().subscribe(
      (states) => {
        this.states = states;
      },
      (err) => {
      }
    );
  }

  getStatebyId(id): string {
    if (this.states) {
      for (let i = 0; i < this.states.length; i++) {
        if (this.states[i].stateMasterId === id) {
          return this.states[i].stateName;
        }
      }
    }
  }

  deleteVehicleById(vehicleId: number) {
    this._vehicleService.deleteVehicleMasterById(vehicleId).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Vehicle Master Deleted Successfully');
        this.getAllVehicleMasters();
      }
    );
  }

  openDialog(ev, vehicleId: number) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteVehicleById(vehicleId);
      }
    });
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
