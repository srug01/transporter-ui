import { Component, OnInit } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {

  displayedColumns: string[] = [
    'vehicle_syscode', 'vehicle_no', 'vehicle_type', 'vehicle_capacity',
    'weight','manufacture_year', 'state_syscode'
  ];
  public dataSource: any[];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public vehicleMasters: Array<any> = [];


  constructor(
    private _ngZone: NgZone,
    private _vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.getAllVehicleMasters();
  }

  getAllVehicleMasters() {
    this._vehicleService.getAllVehicleMasters().subscribe(
      (vehicleMasters) => {
        console.log(vehicleMasters);
        this.vehicleMasters = vehicleMasters;
      },
      (err) => {
        console.log('could not fetch vehicle masters');
      }
    );
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

}
