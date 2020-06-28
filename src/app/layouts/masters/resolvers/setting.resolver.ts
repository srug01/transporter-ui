import { Setting} from './../../../shared/models/Setting';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { SettingService } from '../services/setting.service';


@Injectable()
export class SettingResolver implements Resolve<Setting>
{
  constructor(private service: SettingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Setting> | 
  Promise<Setting> | Setting {
    return this.service.getSettingById(route.params.id);
  }
}
