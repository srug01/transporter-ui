import { LocationService } from './../services/location.service';
import { LocationMaster } from './../../../shared/models/location';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class LocationResolver implements Resolve<LocationMaster>
{
    constructor(private service: LocationService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<LocationMaster> | Promise<LocationMaster> | LocationMaster {
        return this.service.getLocationMastersById(route.params.id);
    }
}
