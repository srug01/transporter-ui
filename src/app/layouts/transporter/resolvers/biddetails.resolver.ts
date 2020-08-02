import { Driver} from './../../../shared/models/driver';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { BidUserMappingService } from '../services/bid-user-mapping.service';

import { BidUserMapping } from './../../../shared/models/bidusermapping';

@Injectable()
export class DriverResolver implements Resolve<BidUserMapping>
{
  constructor(private _bidMappingService: BidUserMappingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  Observable<BidUserMapping> 
  | Promise<BidUserMapping> | BidUserMapping {
    return this._bidMappingService.GetBidDetailsByBidId(route.params.id);
  }
}
