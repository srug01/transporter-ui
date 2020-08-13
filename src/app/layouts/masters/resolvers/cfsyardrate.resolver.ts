import { CfsYardRateMaster } from '../../../shared/models/cfsyardrate';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CfsYardRateService } from '../services/cfsyardrate.service';


@Injectable()
export class CfsYardRateResolver implements Resolve<CfsYardRateMaster>
{
  constructor(private service: CfsYardRateService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CfsYardRateMaster> | Promise<CfsYardRateMaster> | CfsYardRateMaster {
    return this.service.getCfsYardRateMasterById(route.params.id);
  }
}
