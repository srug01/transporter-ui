import { Trip } from 'src/app/shared/models/mytrip';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TripService } from '../services/trip.service';


@Injectable()
export class TripDetailsResolver implements Resolve<any>
{
  constructor(private service: TripService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.service.getTripdetailsbyTripId(route.params.id);
  }
}
