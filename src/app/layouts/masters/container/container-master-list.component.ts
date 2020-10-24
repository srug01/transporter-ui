import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { ContainerService } from '../services/container.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';
import * as moment from 'moment';

@Component({
  selector: 'app-container-master-list',
  templateUrl: './container-master-list.component.html',
  styleUrls: ['./container-master-list.component.scss']
})
export class ContainerMasterListComponent implements OnInit {
  displayedColumns: string[] = [
    'containerMasterId', 'containerMasterName', 'isActive', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public containerMasters: Array<any> = [];
  public userId = parseInt(localStorage.getItem('userID'), 10);
  constructor(
    private _containerService: ContainerService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllContainerMasters();
  }

  openDialog(ev, containerId: any) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteContainerById(containerId);
      }
    });
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

  deleteContainerById(containerId: any) {
    containerId.isActive = false;
    containerId.modifiedBy = this.userId;
    containerId.modifiedOn = moment().format('YYYY-MM-DD h:mm:ss a').toString();
    this._containerService.deleteContainerMastersById(containerId).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Container Master Deleted Successfully');
        this.getAllContainerMasters();
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
