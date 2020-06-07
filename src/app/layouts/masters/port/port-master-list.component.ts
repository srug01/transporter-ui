import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { PortService } from '../services/port.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';

@Component({
  selector: 'app-port-master-list',
  templateUrl: './port-master-list.component.html',
  styleUrls: ['./port-master-list.component.scss']
})
export class PortMasterListComponent implements OnInit {
  displayedColumns: string[] = [
    'port_syscode', 'port_name', 'state_syscode', 'location_syscode', 'is_active', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public portMasters: Array<any> = [];

  constructor(
    private _portService: PortService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllPortMasters();
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

  getAllPortMasters() {
    this._portService.getAllPortMasters().subscribe(
      (portMasters) => {
        console.log(portMasters);
        this.portMasters = portMasters;
      },
      (err) => {
        console.log('could not fetch port masters');
      }
    );
  }

  deletePortById(portId: number) {
    this._portService.deletePortMastersById(portId).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Port Master Deleted Successfully');
        this.getAllPortMasters();
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
