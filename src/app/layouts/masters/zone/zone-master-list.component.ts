import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { ZoneService } from '../services/zone.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';

@Component({
  selector: 'app-zone-master-list',
  templateUrl: './zone-master-list.component.html',
  styleUrls: ['./zone-master-list.component.scss']
})
export class ZoneMasterListComponent implements OnInit {
  displayedColumns: string[] = [
    'zone_syscode','zone_name','zone_description','pincode',
    'is_active','action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public zoneMasters: Array<any> = [];

  constructor(
    private _zoneService: ZoneService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.getAllZoneMasters();
  }

  openDialog(ev, zoneId: number) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteZoneById(zoneId);
      }
    });
  }
  getAllZoneMasters() {
    this._zoneService.getAllZoneMasters().subscribe(
      (zoneMasters) => {
        this.zoneMasters = zoneMasters;
      },
      (err)=>{
        console.log('could not fetch Zone masters');
      }
    );
  }
  deleteZoneById(zoneId: number) {
    this._zoneService.deleteZoneMastersById(zoneId).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Zone Master Deleted Successfully');
        this.getAllZoneMasters();
      }
    );
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }




}
