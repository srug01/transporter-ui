import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { WeightService } from '../services/weight.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-weight-master-list',
  templateUrl: './weight-master-list.component.html',
  styleUrls: ['./weight-master-list.component.scss']
})
export class WeightMasterListComponent implements OnInit {
  displayedColumns: string[] = [
    'weight_syscode', 'weight_description',
    'is_active', 'action'
  ];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public weightMasters: Array<any> = [];
  constructor(
    private _weightService: WeightService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getAllWeightMasters();
  }
  getAllWeightMasters() {
    this._weightService.getAllWeightMasters().subscribe(
      (weightMasters) => {
        console.log(weightMasters);
        this.weightMasters = weightMasters;
      },
      (err) => {
        console.log('could not fetch weight masters');
      }
    );
  }

  deleteWeightById(ev, weightId: number) {
    if (ev) {
      ev.preventDefault();
    }
    this._weightService.deleteWeightMasterById(weightId).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'Weight Master Deleted Successfully');
        this.getAllWeightMasters();
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
