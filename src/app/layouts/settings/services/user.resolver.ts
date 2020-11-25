import { CfsUserRegistration } from './../../../shared/models/cfsUserRegistration';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserManagementService } from './usermanagement.service';


@Injectable()
export class UserResolver implements Resolve<CfsUserRegistration>
{
    constructor(private service: UserManagementService) { }

    resolve(
        route: ActivatedRouteSnapshot, state: RouterStateSnapshot
    ): Observable<CfsUserRegistration> | Promise<CfsUserRegistration> | CfsUserRegistration {
        return this.service.getcfsUserDetailsbyUserId(route.params.id);
    }
}
