import { Trip } from 'src/app/shared/models/mytrip';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthResolver implements Resolve<boolean>
{
  constructor(private service: AuthenticationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.service.isAuthenticated();
  }
}
