import { State } from 'src/app/shared/models/state';
import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { StateMasterService } from '../services/state-master.service';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AnyLengthString } from 'aws-sdk/clients/comprehend';
import * as moment from 'moment';

@Component({
  selector: 'app-state-master-list',
  templateUrl: './state-master-list.component.html',
  styleUrls: ['./state-master-list.component.scss']
})
export class StateMasterListComponent implements OnInit {

  displayedColumns: string[] = [
    'stateMasterId', 'stateName', 'Is Active', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public stateMasters: MatTableDataSource<State>;
  @ViewChild(MatSort) stateMasterSort: MatSort;
  public userId = parseInt(localStorage.getItem('userID'), 10);

  constructor(
    private _stateService: StateMasterService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllStateMasters();
  }

  openDialog(ev, stateId: any) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteStateById(stateId);
      }
    });
  }

  getAllStateMasters() {
    this._stateService.getAllStateMasters().subscribe(
      (stateMasters: Array<State>) => {
        this.stateMasters = new MatTableDataSource(stateMasters);
        this.stateMasters.sort = this.stateMasterSort;
      },
      (err) => {
        console.log('could not fetch state masters');
      }
    );
  }

  deleteStateById(stateId: any) {

    stateId.isActive = false;
    stateId.modifiedBy = this.userId;
    stateId.modifiedOn = moment().format('YYYY-MM-DD h:mm:ss a').toString();
    this._stateService.deleteStateMastersById(stateId).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'State Master Deleted Successfully');
        this.getAllStateMasters();
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
