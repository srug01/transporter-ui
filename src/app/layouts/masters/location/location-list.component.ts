import { LocationMaster } from './../../../shared/models/location';
import { LocationService } from './../services/location.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {
  displayedColumns: string[] = [
    'Location ID', 'locationName', 'createdBy', 'createdOn', 'is Active', 'Action'
  ];
  public locationMasters: MatTableDataSource<LocationMaster>;
  @ViewChild(MatSort) locationMasterSort: MatSort;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(
    private _locationService: LocationService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllLocationMasters();
  }

  openDialog(ev, locationMasterId: number) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteLocationById(locationMasterId);
      }
    });
  }

  getAllLocationMasters() {
    this._locationService.getAllLocationMasters().subscribe(
      (locationMasters) => {
        this.locationMasters = new MatTableDataSource(locationMasters);
        this.locationMasters.sort = this.locationMasterSort;
      },
      (err) => {
      }
    );
  }

  deleteLocationById(locationMasterId: number) {
    this._locationService.deleteLocationMastersById(locationMasterId).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Location Master Deleted Successfully');
        this.getAllLocationMasters();
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
