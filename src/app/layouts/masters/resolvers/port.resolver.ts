import { Port } from './../../../shared/models/port';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PortService } from '../services/port.service';


@Injectable()
export class PortsResolver implements Resolve<Port>
{
  constructor(private service: PortService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Port> | Promise<Port> | Port {
    return this.service.getPortMastersById(route.params.id);
  }
}