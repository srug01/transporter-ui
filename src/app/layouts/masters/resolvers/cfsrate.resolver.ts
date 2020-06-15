import { Cfsrate } from './../../../shared/models/cfsrate';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CfsrateService } from '../services/cfsrate.service';


@Injectable()
export class CfsrateResolver implements Resolve<Cfsrate>
{
  constructor(private service: CfsrateService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cfsrate> | Promise<Cfsrate> | Cfsrate {
    return this.service.getCfsRateMasterById(route.params.id);
  }
}
