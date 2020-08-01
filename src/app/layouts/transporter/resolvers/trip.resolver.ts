import { Trip } from 'src/app/shared/models/Mytrip';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TripService } from '../services/trip.service';


@Injectable()
export class TripResolver implements Resolve<Trip>
{
  constructor(private service: TripService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Trip> | Promise<Trip> | Trip {
    return this.service.getMytripMasterById(route.params.id);
  }
}
