import { Component, OnInit } from '@angular/core';
import { VehicleMaster} from './../../../shared/models/VehicleMaster';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-registration-edit',
  templateUrl: './vehicle-registration-edit.component.html',
  styleUrls: ['./vehicle-registration-edit.component.scss']
})
export class VehicleRegistrationEditComponent implements OnInit {
  public vehicle: VehicleMaster;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.vehicle = this.route.snapshot.data['vehicleResolver'];
  }

}
