import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { CfsPortRateService } from '../services/cfsportrate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';
import { PortService } from '../services/port.service';
import { WeightService } from '../services/weight.service';
import { CfsService } from '../services/cfs.service';
import { ContainerService } from '../services/container.service';


@Component({
  selector: 'app-cfsportrate-master-list',
  templateUrl: './cfsportrate-master-list.component.html',
  styleUrls: ['./cfsportrate-master-list.component.scss']
})
export class CfsportrateMasterListComponent implements OnInit {
  displayedColumns: string[] = [
    'cfsPortRateMasterId', 'cfsMasterId', 'portMasterId', 'weightMasterId',
    'containerMasterId', 'rate', 'isActive', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public containerMasters: Array<any> = [];
  public cfsrateMasters: Array<any> = [];
  public Port: Array<any> = [];
  public Weight: Array<any> = [];
  public CFS: Array<any> = [];
  constructor(
    private _containerService: ContainerService,
    private _cfsrateService: CfsPortRateService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _portservice : PortService,
    private _weightservice : WeightService,
    private _cfsService : CfsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllCfsRateMasters();
    this.getAllPortMasters();
    this.getAllWeightMasters();
    this.getAllCFSMasters();
    this. getAllContainerMasters() ;

  }
  getAllContainerMasters() {
    this._containerService.getAllContainerMasters().subscribe(
      (containerMasters) => {
        this.containerMasters = containerMasters;
      },
      (err) => {
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

  getAllCFSMasters() {
    this._cfsService.getAllCfsMasters().subscribe(
      (cfs) => {
        this.CFS = cfs;
      },
      (err) => {
      }
    );
  }
  getCFSbyId(id): string {
    for (let i = 0; i < this.CFS.length; i++) {
      if (this.CFS[i].cfsMasterId === id) {
        return this.CFS[i].cfsName;
      }
    }
  }



  getAllPortMasters() {
    this._portservice.getAllPortMasters().subscribe(
      (port) => {
        this.Port = port;
      },
      (err) => {
      }
    );
  }
  getPortbyId(id): string {
    for (let i = 0; i < this.Port.length; i++) {
      if (this.Port[i].portMasterId === id) {
        return this.Port[i].portName;
      }
    }
  }

  getAllWeightMasters() {
    this._weightservice.getAllWeightMasters().subscribe(
      (weight) => {
        this.Weight = weight;
      },
      (err) => {
      }
    );
  }
  getWeightbyId(id): string {
    for (let i = 0; i < this.Weight.length; i++) {
      if (this.Weight[i].weightMasterId === id) {
        return this.Weight[i].weightDesc;
      }
    }
  }



  getAllCfsRateMasters() {
    this._cfsrateService.getAllCfsRateMasters().subscribe(
      (cfsrateMasters) => {
        this.cfsrateMasters = cfsrateMasters;
      },
      (err) => {
      }
    );
  }

  deletePortById(cfsrateId: number) {
    this._cfsrateService.deleteCfsRateMastersById(cfsrateId).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'CFS Rate Master Deleted Successfully');
        this.getAllCfsRateMasters();
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
