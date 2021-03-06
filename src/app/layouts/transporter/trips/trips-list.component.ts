import { Trip } from './../../../shared/models/mytrip';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { TripService } from '../services/trip.service';
import { InvoiceService} from '../../invoice/service/tripinvoice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss']
})
export class TripsListComponent implements OnInit {
  public currentUser: User;
  displayedColumns: string[] = [
    '#', 'tripId', 'subOrderId', 'sourceId', 'destinationId',
    'assignedVehicle', 'assignedDriver',
    'tripstatus', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public tripMasters: MatTableDataSource<any>;
  @ViewChild(MatSort) tripSort: MatSort;
  public userId = parseInt(localStorage.getItem('userID'), 10);

  constructor(
    private _tripService: TripService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog,
    public _userService: UserService,
    private _tripInvoiceService : InvoiceService,
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getAllTrips();
  }

  generateInvoice() {
    const selectedTrips = this.tripMasters.data.filter((trip) => {
      return trip.isInvoiceGenerated === true;
    });
    this._tripInvoiceService.savetripInvoices(selectedTrips).subscribe(
      (invoice) => {
        this.openSnackBar('Status',invoice);
        this.getAllTrips();
        //this.tripMasters = new MatTableDataSource(trips);
        //this.tripMasters.sort = this.tripSort;
      },
      (err) => {
        console.log(err);
      }
    );
    console.log(selectedTrips);
  }


  getAllTrips() {
    this._tripService.getAllTripsbyUserId(this.userId).subscribe(
      (trips) => {
        this.tripMasters = new MatTableDataSource(trips);
        this.tripMasters.sort = this.tripSort;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getUserInfo() {
    this._userService.getUsersInfo().subscribe(
      (loggedUser: User) => {
        this.currentUser = loggedUser;
      }
    );
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
        this.getAllTrips();
      }
    );
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
