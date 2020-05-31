import { Yard } from './../../../shared/models/yard';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { YardService } from '../services/yard.service';


@Injectable()
export class YardsResolver implements Resolve<Yard>
{
  constructor(private service: YardService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Yard> | Promise<Yard> | Yard {
    return this.service.getYardMasterById(route.params.id);
  }
}
