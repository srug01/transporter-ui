import { ContainerMaster } from '../../../shared/models/containerMaster';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ContianerService } from '../services/contianer.service';


@Injectable()
export class ContainerResolver implements Resolve<ContainerMaster>
{
  constructor(private service: ContianerService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ContainerMaster> | Promise<ContainerMaster> | ContainerMaster {
    return this.service.getContainerMasterById(route.params.id);
  }
}
