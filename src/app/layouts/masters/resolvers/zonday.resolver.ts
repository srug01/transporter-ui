import { ZoneDay } from './../../../shared/models/zoneday';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ZonedayService } from '../services/zoneday.service';

@Injectable()
export class ZoneDayResolver implements Resolve<ZoneDay> {
  constructor(private service: ZonedayService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ZoneDay> 
  | Promise<ZoneDay> | ZoneDay {
    return this.service.getZoneDayMastersById(route.params.id);
  }
}
