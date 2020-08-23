import { Transporter } from './../../../shared/models/transporter';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { TransporterRegistrationService } from '../services/transporter-registration.service';

@Injectable()
export class TransporterResolver implements Resolve<Transporter>{
  constructor(private _transporterRegistrationService: TransporterRegistrationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Transporter>
    | Promise<Transporter> | Transporter {
    console.log(route.params.id);
    return this._transporterRegistrationService.getTransporterById(route.params.id);
  }
}