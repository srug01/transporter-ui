import { Cfs} from './../../../shared/models/cfs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CfsService } from '../services/cfs.service';


@Injectable()
export class CfsResolver implements Resolve<Cfs>
{
  constructor(private service: CfsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cfs> | Promise<Cfs> | Cfs {
    return this.service.getCfsMasterById(route.params.id);
  }
}
