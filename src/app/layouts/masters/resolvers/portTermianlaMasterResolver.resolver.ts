import { PortTerminalMaster } from './../../../shared/models/PortTerminalMaster';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PortterminalmasterService } from '../services/portterminalmaster.service';

@Injectable()
export class portTerminalMasterResolver implements Resolve<PortTerminalMaster>
{
  constructor(private service: PortterminalmasterService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PortTerminalMaster> 
  | Promise<PortTerminalMaster> | PortTerminalMaster {
    return this.service.getPortTerminalMasterById(route.params.id);
  }
}