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
    // const allowed: boolean = this.auth.currentUser.roles.filter(
    //   role => this.allowedRoles.includes(role)).length > 0;
    if (this.allowedRoles.includes(userRole)) {
      return true;
    } else {
      this.router.navigate(['/default']);
    }
    return false;
  }
}