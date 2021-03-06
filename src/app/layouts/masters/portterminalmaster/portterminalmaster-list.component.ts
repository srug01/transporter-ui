import { PortTerminalMaster } from 'src/app/shared/models/PortTerminalMaster';
import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { PortService } from '../services/port.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';
import { PortterminalmasterService } from './../services/portterminalmaster.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import * as moment from 'moment';


@Component({
  selector: 'app-portterminalmaster-list',
  templateUrl: './portterminalmaster-list.component.html',
  styleUrls: ['./portterminalmaster-list.component.scss']
})
export class PortterminalmasterListComponent implements OnInit {
  displayedColumns: string[] = [
    'portTerminalId', 'portMasterId', 'terminal', 'longitude', 'latitude', 'isActive', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public portMasters: Array<any> = [];
  public portterminalMasters: MatTableDataSource<PortTerminalMaster>;
  @ViewChild(MatSort) portterminalMasterSort: MatSort;
  public userId = parseInt(localStorage.getItem('userID'), 10);

  constructor(
    private _portService: PortService,
    private _portterminalService: PortterminalmasterService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllPortMasters();
    this.getAllPortTerminalMasters();
  }

  openDialog(ev, porMastertId: any) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePortMasterById(porMastertId);
      }
    });

  }
  deletePortMasterById(porMastertId: any) {
    porMastertId.isActive = false;
    porMastertId.modifiedBy = this.userId;
    porMastertId.modifiedOn = moment().format('YYYY-MM-DD h:mm:ss a').toString();
    this._portterminalService.deletePortTerminalMasterById(porMastertId).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Port Terminal Master Deleted Successfully');
        this.getAllPortTerminalMasters();
      }
    );
  }
  getAllPortTerminalMasters() {
    this._portterminalService.getAllPortTerminalMaster().subscribe(
      (portterminalMasters) => {
        this.portterminalMasters = new MatTableDataSource(portterminalMasters);
        this.portterminalMasters.sort = this.portterminalMasterSort;
      },
      (err) => {
      }
    );
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  getAllPortMasters() {
    this._portService.getAllPortMasters().subscribe(
      (portMasters) => {
        this.portMasters = portMasters;
      },
      (err) => {
      }
    );
  }
  getPortMasterbyId(id): string {
    for (let i = 0; i < this.portMasters.length; i++) {
      if (this.portMasters[i].portMasterId === id) {
        return this.portMasters[i].portName;
      }
    }
  }

}
