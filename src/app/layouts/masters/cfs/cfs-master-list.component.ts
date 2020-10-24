import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { CfsService } from '../services/cfs.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';
import * as moment from 'moment';


@Component({
  selector: 'app-cfs-master-list',
  templateUrl: './cfs-master-list.component.html',
  styleUrls: ['./cfs-master-list.component.scss']
})
export class CfsMasterListComponent implements OnInit {
  displayedColumns: string[] = [
    'cfsMasterId', 'cfsName', 'contactNumber', 'email',
    'address', 'isActive', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public cfsMasters: Array<any> = [];
  public userId = parseInt(localStorage.getItem('userID'), 10);
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

  demo(ev) {
  }
  openDialog(ev, cfsId: any) {
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
        this.cfsMasters = cfsMasters;
        console.log(this.cfsMasters);
      },
      (err) => {
      }
    );
  }

  deleteCfsById(cfsId: any) {
    cfsId.isActive = false;
    cfsId.modifiedBy = this.userId;
    cfsId.modifiedOn = moment().format('YYYY-MM-DD h:mm:ss a').toString();
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
