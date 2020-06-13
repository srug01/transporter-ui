import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { DieselService } from '../services/diesel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';


@Component({
  selector: 'app-diesel-master-list',
  templateUrl: './diesel-master-list.component.html',
  styleUrls: ['./diesel-master-list.component.scss']
})
export class DieselMasterListComponent implements OnInit {
  displayedColumns: string[] = [
    'diesel_rate_syscode', 'diesel_rate', 'date', 'is_active', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public dieselMasters: Array<any> = [];
  constructor(
    private _dieselService: DieselService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllDieselMasters();
  }

  openDialog(ev, portId: number) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteDieselById(portId);
      }
    });
  }

  getAllDieselMasters() {
    this._dieselService.getAllDieselMasters().subscribe(
      (dieselMasters) => {
        console.log(dieselMasters);
        this.dieselMasters = dieselMasters;
      },
      (err) => {
        console.log('could not fetch diesel masters');
      }
    );
  }

  deleteDieselById(dieselId: number) {
    this._dieselService.deleteDieselMastersById(dieselId).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Diesel Master Deleted Successfully');
        this.getAllDieselMasters();
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
