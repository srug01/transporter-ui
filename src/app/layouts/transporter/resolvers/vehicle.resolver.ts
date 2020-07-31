import { VehicleMaster} from './../../../shared/models/VehicleMaster';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { VehicleService } from '../services/vehicle.service';


@Injectable()
export class VehicleResolver implements Resolve<VehicleMaster>
{
  constructor(private service: VehicleService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<VehicleMaster> | Promise<VehicleMaster> | VehicleMaster {
    return this.service.getVehicleMasterById(route.params.id);
  }
}
