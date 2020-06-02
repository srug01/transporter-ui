import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { YardportmapService } from '../services/yardportmap.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-yardportmap-master-list',
  templateUrl: './yardportmap-master-list.component.html',
  styleUrls: ['./yardportmap-master-list.component.scss']
})
export class YardportmapMasterListComponent implements OnInit {
  displayedColumns: string[] = [
    'yard_port_mapping_syscode', 'yard_syscode', 'port_syscode',
     'is_active', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public yardportmapMasters: Array<any> = [];
  constructor(
    private _yardportmapService: YardportmapService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getAllYardPortMappingMasters();
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

  deleteyardportmappingById(ev, yarportmapId: number) {
    if (ev) {
      ev.preventDefault();
    }
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
