import { Driver } from './../../../shared/models/driver';
import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { DriverService } from '../services/driver.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-driver-master-list',
  templateUrl: './driver-master-list.component.html',
  styleUrls: ['./driver-master-list.component.scss']
})
export class DriverMasterListComponent implements OnInit {
  displayedColumns: string[] = [
    'driverId', 'firstname', 'lastname', 'address1', 'mobileNumber',
    'identitytype', 'identitynumber',
    'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public userId = parseInt(localStorage.getItem('userID'), 10);
  public roleId = parseInt(localStorage.getItem('roleID'), 10);
  public driverMasters: MatTableDataSource<Driver>;
  @ViewChild(MatSort) driverSort: MatSort;
  constructor(
    private _driverService: DriverService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getAllDriverMasters();
  }

  getAllDriverMasters() {
    if (this.roleId == 1) {
      this._driverService.getAllDriverMasters().subscribe(
        (driverMasters) => {
          this.driverMasters = new MatTableDataSource(driverMasters);
          this.driverMasters.sort = this.driverSort;
        },
        (err) => {
        }
      );
    }
    else {
      this._driverService.getAllDriversbyUserId(this.userId).subscribe(
        (drivers) => {
          this.driverMasters = new MatTableDataSource(drivers);
          this.driverMasters.sort = this.driverSort;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  deleteDriverById(ev, portId: number) {
    if (ev) {
      ev.preventDefault();
    }
    this._driverService.deleteDriverMastersById(portId).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Driver Master Deleted Successfully');
        this.getAllDriverMasters();
      }
    );

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
