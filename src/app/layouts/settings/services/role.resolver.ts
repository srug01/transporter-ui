import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleService } from './role.service';
import { UserRole } from 'aws-sdk/clients/workmail';


@Injectable()
export class RoleResolver implements Resolve<UserRole>
{
    constructor(private service: RoleService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserRole> | Promise<UserRole> | UserRole {
        return this.service.getRoleById(route.params.id);
    }
}
