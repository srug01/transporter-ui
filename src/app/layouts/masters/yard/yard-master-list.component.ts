import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { YardService } from '../services/yard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Yard } from 'src/app/shared/models/yard';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';
import { PortService } from '../services/port.service';

@Component({
  selector: 'app-yard-master-list',
  templateUrl: './yard-master-list.component.html',
  styleUrls: ['./yard-master-list.component.scss']
})
export class YardMasterListComponent implements OnInit {
  displayedColumns: string[] = [
    'yard_syscode', 'yard_name',
    'port','is_active', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public yardMasters: Array<any> = [];
  public portMasters: Array<any> = [];
  constructor(
    private _yardService: YardService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _portService: PortService,
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.getAllYardMasters();
    this.getAllPortMasters();
  }

  openDialog(ev, yardId: number) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteYardById(yardId);
      }
    });
  }

  getAllPortMasters() {
    this._portService.getAllPortMasters().subscribe(
      (portMasters) => {
        this.portMasters = portMasters;
      },
      (err) => {
        console.log('could not fetch port masters');
      }
    );
  }
  getAllYardMasters() {
    this._yardService.getAllYardMasters().subscribe(
      (yardMasters) => {
        console.log(yardMasters);
        this.yardMasters = yardMasters;
      },
      (err) => {
        console.log('could not fetch port masters');
      }
    );
  }
  getPortbyId(id): string {
    for (let i = 0; i < this.portMasters.length; i++) {
      if (this.portMasters[i].port_syscode === id) {
        return this.portMasters[i].port_name;
      }
    }
  }
  deleteYardById( yardId: number) {

    this._yardService.deleteYardMasterById(yardId).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Yard Master Deleted Successfully');
        this.getAllYardMasters();
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
