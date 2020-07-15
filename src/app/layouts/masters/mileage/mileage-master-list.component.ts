import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { MileageService } from '../services/mileage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog.component';
import { WeightService } from '../services/weight.service';
import { ContainerService } from '../services/container.service';

@Component({
  selector: 'app-mileage-master-list',
  templateUrl: './mileage-master-list.component.html',
  styleUrls: ['./mileage-master-list.component.scss']
})
export class MileageMasterListComponent implements OnInit {

  displayedColumns: string[] = [
    'mileage_syscode', 'mileage', 'container_syscode',
     'weight_syscode', 'is_active', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public mileageMasters: Array<any> = [];
  public Container: Array<any> = [];
  public Weight: Array<any> = [];


  constructor( private _mileageService: MileageService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _weightService:WeightService,
    private _containerService:ContainerService,

    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllMileageMasters();
    this.getAllContainerMasters();
    this.getAllWeightMasters();
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

  getAllContainerMasters() {
    this._containerService.getAllContainerMasters().subscribe(
      (container) => {
        this.Container = container;
      },
      (err) => {
      }
    );
  }
  getContainerbyId(id): string {
    for (let i = 0; i < this.Container.length; i++) {
      if (this.Container[i].container_syscode === id) {
        return this.Container[i].container_name;
      }
    }
  }

  getAllWeightMasters() {
    this._weightService.getAllWeightMasters().subscribe(
      (weight) => {
        this.Weight = weight;
      },
      (err) => {
      }
    );
  }
  getWeightbyId(id): string {
    for (let i = 0; i < this.Weight.length; i++) {
      if (this.Weight[i].weight_syscode === id) {
        return this.Weight[i].weight_description;
      }
    }
  }

  getAllMileageMasters() {
    this._mileageService.getAllMileageMasters().subscribe(
      (mileageMasters) => {
        this.mileageMasters = mileageMasters;
      },
      (err) => {
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
