import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { YardCFSRateService } from '../services/yardcfsrate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';
import { YardService } from '../services/yard.service';
import { ContianerService } from '../services/contianer.service';
import { WeightService } from '../services/weight.service';
import { CfsService } from '../services/cfs.service';
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
  public cfsMasters: Array<any> = [];
  public yardMasters: Array<any> = [];
  public containerMasters: Array<any> = [];
  public weightMasters: Array<any> = [];


  constructor(
    private _yardcfsrateService: YardCFSRateService,
    private _containerservice: ContianerService,
    private _weightService: WeightService,
    private _yardService: YardService,
    private _cfsService: CfsService,


    private _snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog
  ) { }

  getAllCFSMasters() {
    this._cfsService.getAllCfsMasters().subscribe(
      (cfs) => {
        this.cfsMasters = cfs;
      }
    );
  }
  getCFSbyId(id): string {
    for (let i = 0; i < this.cfsMasters.length; i++) {
      if (this.cfsMasters[i].cfs_syscode === id) {
        return this.cfsMasters[i].cfs_name;
      }
    }
  }

  getAllYardMasters() {
    this._yardService.getAllYardMasters().subscribe(
      (yard) => {
        this.yardMasters = yard;
      }
    );
  }
  getYardbyId(id): string {
    for (let i = 0; i < this.yardMasters.length; i++) {
      if (this.yardMasters[i].yard_syscode === id) {
        return this.yardMasters[i].yard_name;
      }
    }
  }
  getAllWeightMasters() {
    this._weightService.getAllWeightMasters().subscribe(
      (wieght) => {
        this.weightMasters = wieght;
      }
    );
  }

  getWeightbyId(id): string {
    for (let i = 0; i < this.weightMasters.length; i++) {
      if (this.weightMasters[i].weight_syscode === id) {
        return this.weightMasters[i].weight_description;
      }
    }
  }
  getAllContainerMasters() {
    this._containerservice.getAllContainerMasters().subscribe(
      (container) => {
        this.containerMasters = container;
      }
    );
  }
  getContainerbyId(id): string {
    for (let i = 0; i < this.containerMasters.length; i++) {
      if (this.containerMasters[i].container_syscode === id) {
        return this.containerMasters[i].container_name;
      }
    }
  }

  ngOnInit(): void {
    this.getAllYardCFSRateMasters();
   this.getAllWeightMasters();
   this.getAllCFSMasters();
    this.getAllContainerMasters();
    this.getAllYardMasters();
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
