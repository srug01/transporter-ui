import { Mileage } from './../../../shared/models/mileage';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MileageService } from '../services/mileage.service';
@Injectable()
export class MileagesResolver implements Resolve<Mileage> {
  constructor(private service: MileageService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Mileage> 
  | Promise<Mileage> | Mileage {
    return this.service.getMileageMastersById(route.params.id);
  }
}
