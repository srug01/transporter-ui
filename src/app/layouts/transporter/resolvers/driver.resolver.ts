import { Driver} from './../../../shared/models/driver';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DriverService } from '../services/driver.service';


@Injectable()
export class DriverResolver implements Resolve<Driver>
{
  constructor(private service: DriverService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Driver> | Promise<Driver> | Driver {
    return this.service.getDriverMastersById(route.params.id);
  }
}
