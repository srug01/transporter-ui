import { CfsYardRateMaster } from './../../../shared/models/cfsyardrate';
import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { CfsYardRateService } from '../services/cfsyardrate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';
import { YardService } from '../services/yard.service';
import { ContainerService } from '../services/container.service';
import { WeightService } from '../services/weight.service';
import { CfsService } from '../services/cfs.service';
import { PortService } from '../services/port.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import * as moment from 'moment';

@Component({
  selector: 'app-cfsyardrate-master-list',
  templateUrl: './cfsyardrate-master-list.component.html',
  styleUrls: ['./cfsyardrate-master-list.component.scss']
})
export class CfsyardrateMasterListComponent implements OnInit {
  displayedColumns: string[] = [
    'cfsYardRateMasterId', 'cfsMasterId', 'portMasterId', 'rate', 'yardMasterId', 'containerMasterId',
    'weightMasterId', 'isActive', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public cfsyardrateMasters: MatTableDataSource<CfsYardRateMaster>;
  @ViewChild(MatSort) csfYardRateMasterSort: MatSort;
  public cfsMasters: Array<any> = [];
  public yardMasters: Array<any> = [];
  public containerMasters: Array<any> = [];
  public weightMasters: Array<any> = [];
  public portMasters: Array<any> = [];
  public userId = parseInt(localStorage.getItem('userID'), 10);

  constructor(
    private _cfsyardrateService: CfsYardRateService,
    private _containerservice: ContainerService,
    private _weightService: WeightService,
    private _yardService: YardService,
    private _cfsService: CfsService,
    private _portService: PortService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog
  ) { }

  getAllCFSMasters() {
    this._cfsService.getAllCfsMasters().subscribe(
      (cfs) => {
        this.cfsMasters = cfs;
      }
    );
  }
  getCFSbyId(id): string {
    for (let i = 0; i < this.cfsMasters.length; i++) {
      if (this.cfsMasters[i].cfsMasterId === id) {
        return this.cfsMasters[i].cfsName;
      }
    }
  }

  getAllYardMasters() {
    this._yardService.getAllYardMasters().subscribe(
      (yard) => {
        this.yardMasters = yard;
      }
    );
  }
  getYardbyId(id): string {
    for (let i = 0; i < this.yardMasters.length; i++) {
      if (this.yardMasters[i].yardMasterId === id) {
        return this.yardMasters[i].yardName;
      }
    }
  }
  getAllWeightMasters() {
    this._weightService.getAllWeightMasters().subscribe(
      (wieght) => {
        this.weightMasters = wieght;
      }
    );
  }

  getWeightbyId(id): string {
    for (let i = 0; i < this.weightMasters.length; i++) {
      if (this.weightMasters[i].weightMasterId === id) {
        return this.weightMasters[i].weightDesc;
      }
    }
  }
  getAllContainerMasters() {
    this._containerservice.getAllContainerMasters().subscribe(
      (container) => {
        this.containerMasters = container;
      }
    );
  }
  getContainerbyId(id): string {
    for (let i = 0; i < this.containerMasters.length; i++) {
      if (this.containerMasters[i].containerMasterId === id) {
        return this.containerMasters[i].containerMasterName;
      }
    }
  }


  getAllPortMasters() {
    this._portService.getAllPortMasters().subscribe(
      (ports) => {
        this.portMasters = ports;
      }
    );
  }
  getPortbyId(id): string {
    for (let i = 0; i < this.portMasters.length; i++) {
      if (this.portMasters[i].portMasterId === id) {
        return this.portMasters[i].portName;
      }
    }
  }

  ngOnInit(): void {
    this.getAllCFSYardRateMasters();
    this.getAllWeightMasters();
    this.getAllCFSMasters();
    this.getAllContainerMasters();
    this.getAllYardMasters();
    this.getAllPortMasters();
  }

  openDialog(ev, yardCfsRateMasterId: any) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCFSYardRateById(yardCfsRateMasterId);
      }
    });
  }

  getAllCFSYardRateMasters() {
    this._cfsyardrateService.getAllCfsYardRateMasters().subscribe(
      (cfsyardrateMasters) => {
        this.cfsyardrateMasters = new MatTableDataSource(cfsyardrateMasters);
        this.cfsyardrateMasters.sort = this.csfYardRateMasterSort;
      },
      (err) => {
        console.log('could not fetch CFS YARD Rate Masters');
      }
    );
  }

  deleteCFSYardRateById(CfsyardRateMasterId: any) {
    CfsyardRateMasterId.isActive = false;
    CfsyardRateMasterId.modifiedBy = this.userId;
    CfsyardRateMasterId.modifiedOn = moment().format('YYYY-MM-DD h:mm:ss a').toString();
    this._cfsyardrateService.deleteCfsYardRateMastersById(CfsyardRateMasterId).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'CFS Yard Rate Master Deleted Successfully');
        this.getAllCFSYardRateMasters();
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
