import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BidsService } from './../layouts/transporter/services/bids.service';
import { OrderService } from './../layouts/cfs/services/order.service';
import { Injectable } from '@angular/core';
import { TripService } from '../layouts/transporter/services/trip.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = environment.baseUri;

  constructor(
    private _tripService: TripService,
    private _orderService: OrderService,
    private _bidService: BidsService,
    private _http: HttpClient
  ) { }

  getTotalTrips() {
    return this._http.get<any>(this.baseUrl + 'trips/count');
  }

  getTotalOrders() {
    return this._http.get<any>(this.baseUrl + 'orders/count');
  }

  getTotalBids() {
    return this._http.get<any>(this.baseUrl + 'bids/count');
  }

  getTotalCFSMasters() {
    return this._http.get<any>(this.baseUrl + 'cfs-masters/count');
  }

  bigChart() {
    return [{
      name: 'Asia',
      data: [502, 635, 809, 947, 1402, 3634, 5268]
    }, {
      name: 'Africa',
      data: [106, 107, 111, 133, 221, 767, 1766]
    }, {
      name: 'Europe',
      data: [163, 203, 276, 408, 547, 729, 628]
    }, {
      name: 'America',
      data: [18, 31, 54, 156, 339, 818, 1201]
    }, {
      name: 'Oceania',
      data: [2, 2, 2, 6, 13, 30, 46]
    }];
  }

  cards() {
    return [78, 71, 39, 66];
  }

  pieData() {
    return [
      { name: 'Chrome', y: 61.41 },
      { name: 'Internet Explorer', y: 11.84 },
      { name: 'Firefox', y: 10.85 },
      { name: 'Edge', y: 4.67 },
      { name: 'Safari', y: 4.18 },
      { name: 'Other', y: 7.05 }
    ];
  }

}

