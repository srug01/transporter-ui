import { PortCfsRateMaster } from '../../../shared/models/portcfsrate';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PortCfsRateService } from '../services/portcfsrate.service';


@Injectable()
export class PortCfsRateResolver implements Resolve<PortCfsRateMaster>
{
  constructor(private service: PortCfsRateService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PortCfsRateMaster> | Promise<PortCfsRateMaster> | PortCfsRateMaster {
    return this.service.getPortCfsRateMasterById(route.params.id);
  }
}
