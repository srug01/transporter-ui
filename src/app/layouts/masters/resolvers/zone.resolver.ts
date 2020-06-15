import { Zone } from './../../../shared/models/zone';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ZoneService } from '../services/zone.service';


@Injectable()
export class ZonesResolver implements Resolve<Zone>
{
  constructor(private service: ZoneService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Zone> 
  | Promise<Zone> | Zone {
    return this.service.getZoneMastersById(route.params.id);
  }
}