import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { CfsrateService } from '../services/cfsrate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';


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
  constructor(
    private _cfsrateService: CfsrateService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllCfsRateMasters();
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
