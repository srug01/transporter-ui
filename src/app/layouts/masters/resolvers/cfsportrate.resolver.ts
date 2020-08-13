import { CfsPortRateMaster } from '../../../shared/models/cfsportrate';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CfsPortRateService } from '../services/cfsportrate.service';


@Injectable()
export class CfsPortRateResolver implements Resolve<CfsPortRateMaster>
{
  constructor(private service: CfsPortRateService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CfsPortRateMaster> | Promise<CfsPortRateMaster> | CfsPortRateMaster {
    return this.service.getCfsRateMasterById(route.params.id);
  }
}
