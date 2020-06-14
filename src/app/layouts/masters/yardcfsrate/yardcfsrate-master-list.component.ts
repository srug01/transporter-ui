import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { YardCFSRateService } from '../services/yardcfsrate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';



@Component({
  selector: 'app-yardcfsrate-master-list',
  templateUrl: './yardcfsrate-master-list.component.html',
  styleUrls: ['./yardcfsrate-master-list.component.scss']
})
export class YardcfsrateMasterListComponent implements OnInit {
  displayedColumns: string[] = [
    'yard_cfs_rate_syscode','cfs_syscode' ,'rate', 'yard_syscode', 'container_syscode',
    'weight_syscode', 'is_active', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public yardcfsrateMasters: Array<any> = [];

  constructor(
    private _yardcfsrateService: YardCFSRateService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllYardCFSRateMasters();
  }

  openDialog(ev, yard_cfs_rate_syscode: number) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteYardCFSRateById(yard_cfs_rate_syscode);
      }
    });
  }

  getAllYardCFSRateMasters() {
    this._yardcfsrateService.getAllYardcfsrateMasters().subscribe(
      (yardcfsrateMasters) => {
        console.log(yardcfsrateMasters);
        this.yardcfsrateMasters = yardcfsrateMasters;
      },
      (err) => {
        console.log('could not fetch Yard CFS Rate Masters');
      }
    );
  }

  deleteYardCFSRateById(yard_cfs_rate_syscode: number) {
    this._yardcfsrateService.deleteYardcfsrateMasterById(yard_cfs_rate_syscode).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Yard CFS Rate Master Deleted Successfully');
        this.getAllYardCFSRateMasters();
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
