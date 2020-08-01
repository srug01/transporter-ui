import { Diesel } from './../../../shared/models/diesel';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { DieselService } from '../services/diesel.service';
@Injectable()
export class DieselResolver implements Resolve<Diesel> {
  constructor(private service: DieselService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Diesel>
  | Promise<Diesel> | Diesel {
    return this.service.getDieselMastersById(route.params.id);
  }
}
