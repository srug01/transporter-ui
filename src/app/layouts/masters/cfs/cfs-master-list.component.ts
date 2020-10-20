import { CfsMaster } from './../../../shared/models/cfsMaster.model';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { CfsService } from '../services/cfs.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-cfs-master-list',
  templateUrl: './cfs-master-list.component.html',
  styleUrls: ['./cfs-master-list.component.scss']
})
export class CfsMasterListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'cfsMasterId', 'cfsName', 'contactNumber', 'email',
    'address', 'isActive', 'createdBy', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @ViewChild(MatSort) csfMasterSort: MatSort;
  public cfsMasters: MatTableDataSource<CfsMaster>;
  searchList: any = [
    { cfsMasterId: 1, cfs_name: 'value' }
  ];

  constructor(
    private _cfsService: CfsService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllCfsMasters();
  }

  ngAfterViewInit() {
    // this.cfsMasters.sort = this.csfMasterSort;
  }

  demo(ev) {
  }
  openDialog(ev, cfsId: number) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCfsById(cfsId);
      }
    });
  }

  getAllCfsMasters() {
    this._cfsService.getAllCfsMasters().subscribe(
      (cfsMasters) => {
        this.cfsMasters = new MatTableDataSource(cfsMasters);
        this.cfsMasters.sort = this.csfMasterSort;
      },
      (err) => {
      }
    );
  }

  deleteCfsById(cfsId: number) {
    this._cfsService.deleteCfsMasterById(cfsId).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'CFS Master Deleted Successfully');
        this.getAllCfsMasters();
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  searchCfsMasters(term: string, item: any) {
    if (term.length === 0) {
      return false;
    }
    // term = term.toLocaleLowerCase();
    return true;
    // return item.code.toLocaleLowerCase().indexOf(term) > -1 || item.countryName.toLocaleLowerCase() === term;
  }

}
