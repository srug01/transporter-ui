import { Trip } from './../../../shared/models/mytrip';
import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { TripService } from '../services/trip.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';
import { StartDialogComponent } from 'src/app/shared/startDialog/start-dialog.component';
import { StausEnum } from '../../../shared/Enum/statusEnum';
@Component({
  selector: 'app-my-trips-list',
  templateUrl: './my-trips-list.component.html',
  styleUrls: ['./my-trips-list.component.scss']
})
export class MyTripsListComponent implements OnInit {
  public currentUser: User;
  displayedColumns: string[] = [
    'tripId', 'subOrderId', 'sourceId', 'destinationId',
    'assignedVehicle', 'assignedDriver',
    'tripstatus', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public tripMasters: Array<Trip> = [];
  constructor(
    private _tripService: TripService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog,
    public _userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this._userService.getUsersInfo().subscribe(
      (loggedUser: User) => {
        this.currentUser = loggedUser;
        this.getAllTripsByUserId(this.currentUser.userId);
      }
    );
  }

  getAllTripsByUserId(userId: number) {
    this._tripService.getAllTripsbyUserId(userId).subscribe(
      (trips: Trip[]) => {
        this.tripMasters = trips;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openDialogForTripStart(ev, trip: Trip) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this.dialog.open(StartDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.startTrip(trip);
      }
    });
  }

  startTrip(trip: Trip) {
    // https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
    const aTrip = {...trip};
    const startTime = new Date().getTime();
    aTrip.startDate = new Date(startTime);
    aTrip.tripstatus = 'TRIP_STARTED';
    aTrip.tripStatusId = StausEnum.TRIP_STARTED;
    delete aTrip.DriverName;
    delete aTrip.bidValue;
    this._tripService.updateMytripMaster(aTrip).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Trip Started Successfully');
        this.getAllTripsByUserId(this.currentUser.userId);
      },
      (err) => {
        this.openSnackBar('Failure !', 'could not start the trip!');
      });
  }

  stopTrip(ev, trip: Trip) {
    const aTrip = {...trip};
    const startTime = new Date().getTime();
    aTrip.startDate = new Date(startTime);
    aTrip.tripstatus = 'TRIP_COMPLETED';
    aTrip.tripStatusId = StausEnum.TRIP_COMPLETED;
    delete aTrip.DriverName;
    delete aTrip.bidValue;
    this._tripService.updateMytripMaster(aTrip).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Trip Started Successfully');
        this.getAllTripsByUserId(this.currentUser.userId);
      },
      (err) => {
        this.openSnackBar('Failure !', 'could not start the trip!');
      });
  }

  openDialog(ev, tripId: number) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTripById(tripId);
      }
    });
  }

  deleteTripById(tripId: number) {
    this._tripService.deleteMytripMasterById(tripId).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Trip Master Deleted Successfully');
        this.getAllTripsByUserId(this.currentUser.userId);
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
