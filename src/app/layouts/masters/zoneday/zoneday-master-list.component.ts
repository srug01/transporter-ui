import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { ZonedayService } from '../services/zoneday.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';
import { Port } from 'src/app/shared/models/port';
import { PortService } from 'src/app/layouts/masters/services/port.service';


@Component({
  selector: 'app-zoneday-master-list',
  templateUrl: './zoneday-master-list.component.html',
  styleUrls: ['./zoneday-master-list.component.scss']
})
export class ZonedayMasterListComponent implements OnInit {
  displayedColumns: string[] = [
    'zone_day_syscode', 'zone_name', 'port_syscode', 'import','export', 'is_active', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public port: Array<Port> = [];
  public zonedayMasters: Array<any> = [];

  constructor(
    private _zonedayService: ZonedayService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog,
    private _portService: PortService,
  ) { }

  ngOnInit(): void {
    this.getAllZoneDayMasters();
    this.getAllPortMasters();
  }

  getAllPortMasters() {
    this._portService.getAllPortMasters().subscribe(
      (port) => {
        this.port = port;
      }
    );
  }

  openDialog(ev, zone_day_syscode: number) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteZoneDayById(zone_day_syscode);
      }
    });
  }

  getAllZoneDayMasters() {
    this._zonedayService.getAllZoneDayMasters().subscribe(
      (zonedayMasters) => {
        console.log(zonedayMasters);
        this.zonedayMasters = zonedayMasters;
      },
      (err) => {
        console.log('could not fetch Zone Day masters');
      }
    );
  }



  getPortbyId(id): string {
    for (let i = 0; i < this.port.length; i++) {
      if (this.port[i].port_syscode === id) {
        return this.port[i].port_name;
      }
    }
  }



  deleteZoneDayById(zone_day_syscode: number) {
    this._zonedayService.deleteZoneDayMastersById(zone_day_syscode).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Zone Day Master Deleted Successfully');
        this.getAllZoneDayMasters();
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
