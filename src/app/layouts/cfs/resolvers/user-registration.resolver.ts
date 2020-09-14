import { UserRegistrationService } from './../services/user-registration.service';
import { Driver} from './../../../shared/models/driver';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
@Injectable()
export class UserRegistrationResolver implements Resolve<any>
{
  constructor(private service: UserRegistrationService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
   | Promise<any> {
    return this.service.getCfsUserRegistrationById(route.params.id);
  }
}
