import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { YardportmapService } from '../services/yardportmap.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';
import { YardService } from '../services/yard.service';
import { PortService } from '../services/port.service';


@Component({
  selector: 'app-yardportmap-master-list',
  templateUrl: './yardportmap-master-list.component.html',
  styleUrls: ['./yardportmap-master-list.component.scss']
})
export class YardportmapMasterListComponent implements OnInit {
  displayedColumns: string[] = [
    'yard_port_mapping_syscode', 'yard', 'port',
     'is_active', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public yardMasters: Array<any> = [];
  public portMasters: Array<any> = [];

  public yardportmapMasters: Array<any> = [];
  constructor(
    private _yardportmapService: YardportmapService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _yardService: YardService,
    private _portService: PortService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllYardPortMappingMasters();
    this.getAllYardMasters();
    this.getAllPortMasters();
  }

  openDialog(ev, yarportmapId: number) {
    if (ev) {
      ev.preventDefault();
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteyardportmappingById(yarportmapId);
      }
    });
  }

  getAllYardMasters() {
    this._yardService.getAllYardMasters().subscribe(
      (yardMasters) => {
        this.yardMasters = yardMasters;
      },
      (err) => {
        console.log('could not fetch yard masters');
      }
    );
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

  getPortbyId(id): string {
    for (let i = 0; i < this.portMasters.length; i++) {
      if (this.portMasters[i].port_syscode === id) {
        return this.portMasters[i].port_name;
      }
    }
  }

  getYardbyId(id): string {
    for (let i = 0; i < this.yardMasters.length; i++) {
      if (this.yardMasters[i].yard_syscode === id) {
        return this.yardMasters[i].yard_name;
      }
    }
  }

  getAllYardPortMappingMasters() {
    this._yardportmapService.getAllYardPortMapMasters().subscribe(
      (yardportmapMasters) => {
        console.log(yardportmapMasters);
        this.yardportmapMasters = yardportmapMasters;
      },
      (err) => {
        console.log('could not fetch yard port mappings');
      }
    );
  }

  deleteyardportmappingById( yarportmapId: number) {
    this._yardportmapService.deleteYardPortMapMastersById(yarportmapId).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Yard Port Mapping Deleted Successfully');
        this.getAllYardPortMappingMasters();
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
