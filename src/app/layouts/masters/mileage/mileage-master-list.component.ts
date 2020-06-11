import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { MileageService } from '../services/mileage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';


@Component({
  selector: 'app-mileage-master-list',
  templateUrl: './mileage-master-list.component.html',
  styleUrls: ['./mileage-master-list.component.scss']
})
export class MileageMasterListComponent implements OnInit {

  displayedColumns: string[] = [
    'mileage_syscode', 'mileage', 'container_syscode', 'weight_syscode', 'is_active', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public mileageMasters: Array<any> = [];


  constructor( private _mileageService: MileageService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllMileageMasters();
  }

  openDialog(ev, mileage_syscode: number) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteMileageById(mileage_syscode);
      }
    });
  }

  getAllMileageMasters() {
    this._mileageService.getAllMileageMasters().subscribe(
      (mileageMasters) => {
        console.log(mileageMasters);
        this.mileageMasters = mileageMasters;
      },
      (err) => {
        console.log('could not fetch Mileage masters');
      }
    );
  }

  deleteMileageById(mileage_syscode: number) {
    this._mileageService.deleteMileageMastersById(mileage_syscode).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Mileage Master Deleted Successfully');
        this.getAllMileageMasters();
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
