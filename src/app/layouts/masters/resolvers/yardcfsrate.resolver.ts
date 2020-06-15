import { YardCFSRate } from './../../../shared/models/YardCFSRate';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { YardCFSRateService } from '../services/yardcfsrate.service';


@Injectable()
export class YardCFSRatesResolver implements Resolve<YardCFSRate>
{
  constructor(private service: YardCFSRateService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  Observable<YardCFSRate> | Promise<YardCFSRate> | YardCFSRate {
    return this.service.getYardcfsrateMasterById(route.params.id);
  }
}
