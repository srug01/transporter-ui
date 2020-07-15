import { Weight } from './../../../shared/models/weight';
import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { WeightService } from '../services/weight.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';


@Component({
  selector: 'app-weight-master-list',
  templateUrl: './weight-master-list.component.html',
  styleUrls: ['./weight-master-list.component.scss']
})
export class WeightMasterListComponent implements OnInit {
  displayedColumns: string[] = [
    'weightMasterId', 'weightDesc','container',
    'isActive', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public weightMasters: Array<Weight> = [];
  constructor(
    private _weightService: WeightService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllWeightMasters();
  }
  openDialog(ev, weightId: number) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteWeightById(weightId);
      }
    });
  }

  getAllWeightMasters() {
    this._weightService.getAllWeightMasters().subscribe(
      (weightMasters: Weight[]) => {
        this.weightMasters = weightMasters;
      },
      (err) => {
        console.log('could not fetch weight masters');
      }
    );
  }

  deleteWeightById(weightId: number) {
    this._weightService.deleteWeightMasterById(weightId).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Weight Master Deleted Successfully');
        this.getAllWeightMasters();
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
