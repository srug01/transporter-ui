import { Container } from './../../../shared/models/container';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ContianerService } from '../services/contianer.service';


@Injectable()
export class ContainerResolver implements Resolve<Container>
{
  constructor(private service: ContianerService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Container> | Promise<Container> | Container {
    return this.service.getContainerMasterById(route.params.id);
  }
}
