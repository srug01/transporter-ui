import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class RoleGuardService implements CanActivate {

  private allowedRoles: string[];

  constructor(
    public auth: AuthenticationService,
    public router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {

    this.allowedRoles = route.data["roles"];
    const userRole = this.auth.getUserRole();
    console.log(this.allowedRoles.includes(userRole));
    console.log(this.allowedRoles);
    console.log(userRole);   
    if (this.allowedRoles.includes(userRole)) {
      return true;
    } else {
      this.router.navigate(['/default']);
    }
    return false;
  }
}