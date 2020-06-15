import { YardPortMap } from './../../../shared/models/yardportmap';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { YardportmapService } from '../services/yardportmap.service';


@Injectable()
export class YardPortMapResolver implements Resolve<YardPortMap>
{
  constructor(private service: YardportmapService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<YardPortMap> | Promise<YardPortMap> | YardPortMap {
    return this.service.getYardPortMapMastersById(route.params.id);
  }
}
