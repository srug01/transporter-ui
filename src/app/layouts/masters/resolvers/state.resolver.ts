import { State } from './../../../shared/models/state';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { StateMasterService } from '../services/state-master.service';


@Injectable()
export class StatesResolver implements Resolve<State>
{
  constructor(private service: StateMasterService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<State> 
            | Promise<State> | State {
    return this.service.getStateMastersById(route.params.id);
  }
}