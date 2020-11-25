import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Userrole } from 'src/app/shared/models/userrole';
import { RoleService } from './role.service';
@Injectable()
export class RoleResolver implements Resolve<Userrole>
{
    constructor(private service: RoleService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Userrole> | Promise<Userrole> | Userrole {
        return this.service.getRoleById(route.params.id);
    }
}
