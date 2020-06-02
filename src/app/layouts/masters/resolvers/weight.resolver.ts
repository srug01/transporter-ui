import { Weight } from './../../../shared/models/weight';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { WeightService } from '../services/weight.service';


@Injectable()
export class WeightsResolver implements Resolve<Weight>
{
  constructor(private service: WeightService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Weight> | Promise<Weight> | Weight {
    return this.service.getWeightMasterById(route.params.id);
  }
}
