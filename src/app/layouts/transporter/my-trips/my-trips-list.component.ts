import { Mytrip } from './../../../shared/models/mytrip';
import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { TripService } from '../services/trip.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';
@Component({
  selector: 'app-my-trips-list',
  templateUrl: './my-trips-list.component.html',
  styleUrls: ['./my-trips-list.component.scss']
})
export class MyTripsListComponent implements OnInit {
  displayedColumns: string[] = [
    'tripId', 'subOrderId', 'sourceId', 'destinationId', 
    'assignedVehicle', 'assignedDriver', 'billedAmount',
    'isActive', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public tripMasters: Array<Mytrip> = [];
  constructor(
    private _tripService: TripService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllMyTripMasters();
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
  deleteTripById1(tripId:number) {
    this._tripService.getAllMytripMasters().subscribe(
      (mytrip) => {
        this.tripMasters = mytrip;
      }
    );
    
  }
  deleteTripById(tripId: number) {
    this._tripService.deleteMytripMasterById(tripId).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Trip Master Deleted Successfully');
        this.getAllMyTripMasters();
      }
    );
  }


  
  getAllMyTripMasters() {
    this._tripService.getAllMytripMasters().subscribe(
      (mytrip) => {
        this.tripMasters = mytrip;
      }
    );
    
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
