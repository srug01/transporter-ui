import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { CfsrateService } from '../services/cfsrate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';
import { PortService } from '../services/port.service';
import { WeightService } from '../services/weight.service';
import { CfsService } from '../services/cfs.service';


@Component({
  selector: 'app-cfsrate-master-list',
  templateUrl: './cfsrate-master-list.component.html',
  styleUrls: ['./cfsrate-master-list.component.scss']
})
export class CfsrateMasterListComponent implements OnInit {
  displayedColumns: string[] = [
    'cfs_rate_syscode', 'cfs_syscode', 'port_syscode', 'weight_syscode', 'rate', 'is_active', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public cfsrateMasters: Array<any> = [];
  public Port: Array<any> = [];
  public Weight: Array<any> = [];
  public CFS: Array<any> = [];
  constructor(
    private _cfsrateService: CfsrateService,
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
        console.log(cfs);
        this.CFS = cfs;
      },
      (err) => {
        console.log('could not fetch CFS');
      }
    );
  }
  getCFSbyId(id): string {
    for (let i = 0; i < this.CFS.length; i++) {
      if (this.CFS[i].cfs_syscode === id) {
        return this.CFS[i].cfs_name;
      }
    }
  }



  getAllPortMasters() {
    this._portservice.getAllPortMasters().subscribe(
      (port) => {
        console.log(port);
        this.Port = port;
      },
      (err) => {
        console.log('could not fetch Port');
      }
    );
  }
  getPortbyId(id): string {
    for (let i = 0; i < this.Port.length; i++) {
      if (this.Port[i].port_syscode === id) {
        return this.Port[i].port_name;
      }
    }
  }

  getAllWeightMasters() {
    this._weightservice.getAllWeightMasters().subscribe(
      (weight) => {
        console.log(weight);
        this.Weight = weight;
      },
      (err) => {
        console.log('could not fetch Weight');
      }
    );
  }
  getWeightbyId(id): string {
    for (let i = 0; i < this.Weight.length; i++) {
      if (this.Weight[i].weight_syscode === id) {
        return this.Weight[i].weight_description;
      }
    }
  }



  getAllCfsRateMasters() {
    this._cfsrateService.getAllCfsRateMasters().subscribe(
      (cfsrateMasters) => {
        console.log(cfsrateMasters);
        this.cfsrateMasters = cfsrateMasters;
      },
      (err) => {
        console.log('could not fetch cfs rate masters');
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
