import { OrderFilter } from './../../../shared/models/OrderFilter';
import { Include } from './../../../shared/models/filter';
import { Order } from './../../../shared/models/order';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { User } from 'aws-sdk/clients/appstream';
import { SubOrderFilter } from 'src/app/shared/models/subOrderFilter';
import { BidFilter } from 'src/app/shared/models/bidFilter';
import { TripFilter } from 'src/app/shared/models/tripFilter';
import { ThreeparamObj } from 'src/app/shared/models/threeparamObj';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  filter: any = {
    include: [
      {
        relation: 'containers'
      }
    ]
  };
  constructor(
    private http: HttpClient
  ) { }

  saveOrder(order: Order): Observable<any> {
    delete order.orderId;
    return this.http.post<Order>(this.baseUrl + 'orders', JSON.stringify(order), this.HttpUploadOptions);
  }

  getAllOrders(): Observable<Order[]> {
    const include = {
      include: [{
        relation: 'containers'
      }]
    };
    return this.http.get<Order[]>(this.baseUrl + 'orders?filter=' + JSON.stringify(include));
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(this.baseUrl + 'orders/' + orderId + '?filter=' + JSON.stringify(this.filter));
  }

  getCfsLocation(userId: number): Observable<any> {
    return this.http.get(this.baseUrl + 'searchCFSLocation/' + userId);
  }

  getAllStatuses(): Observable<any> {
    const filter1 = {
      where: {
        statusMasterId: 4
      }
    };

    return this.http.get(this.baseUrl + 'status-details?filter='+  JSON.stringify(filter1));
  }

  getAllBidUserStatuses(): Observable<any> {
    const filter1 = {
      where: {
        statusMasterId: 2
      }
    };

    return this.http.get(this.baseUrl + 'status-details?filter='+  JSON.stringify(filter1));
  }

  getAllTripStatuses(): Observable<any> {
    const filter1 = {
      where: {
        statusMasterId: 5
      }
    };

    return this.http.get(this.baseUrl + 'status-details?filter='+  JSON.stringify(filter1));
  }

  getAllWeights(): Observable<any> {
    return this.http.get(this.baseUrl + 'weight-masters');
  }

  getAllContainerMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'container-masters');
  }

  getAllSavedOrders(): Observable<Order[]> {
    this.filter.where = {
      status: 'pending'
    };
    return this.http.get<Order[]>(this.baseUrl + 'orders?filter=' + JSON.stringify(this.filter));
  }

  getAllNewlyCreatedOrders(): Observable<Order[]> {
    this.filter.where = {
      orderStatus: 'ORDER_ACCEPTED'
    };
    this.filter.order = [
      "createdOn DESC"
    ];
    return this.http.get<Order[]>(this.baseUrl + 'orders?filter=' + JSON.stringify(this.filter));
  }

  getOrderDetailsbyOrderId(orderId): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'GetOrderDetailsbyOrderId/' + orderId);
  }

  getAllOrdersbyuserId(userId): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'GetAllOrdersbyUserId/' + userId);
  }

  getAllSubOrdersbyuserId(userId): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'GetAllSubOrdersbyUserId/' + userId);
  }

  /*  ************ Order Listing SPs ************** */

  getOrderListForFilters(orderFilter: OrderFilter): Observable<any> {
     console.log("Filter : " + JSON.stringify(orderFilter));
    return this.http.post<any>(this.baseUrl + 'GetOrderListForFilters',
    JSON.stringify(orderFilter),
     this.HttpUploadOptions
    );
  }

  getSubOrderListForFilters(suborderFilter: SubOrderFilter): Observable<any> {
    //  console.log("Filter : " + JSON.stringify(suborderFilter));
    return this.http.post<any>(this.baseUrl + 'GetSubOrderListForFilters',
    JSON.stringify(suborderFilter),
     this.HttpUploadOptions
    );
  }

  getBidListForFilters(bidFilter: BidFilter): Observable<any> {
    // console.log("Filter : " + JSON.stringify(suborderFilter));
    return this.http.post<any>(this.baseUrl + 'GetBidListForFilters',
    JSON.stringify(bidFilter),
     this.HttpUploadOptions
    );
  }

  getTripListForFilters(tripFilter: TripFilter): Observable<any> {
    // console.log("Filter : " + JSON.stringify(suborderFilter));
    return this.http.post<any>(this.baseUrl + 'GetTripsListForFilters',
    JSON.stringify(tripFilter),
     this.HttpUploadOptions
    );
  }

  saveorderInvoices(order: ThreeparamObj): Observable<any> {
    return this.http.post<ThreeparamObj>(this.baseUrl + 'generateorderinvoices', JSON.stringify(order),
      this.HttpUploadOptions);
  }

  /*  ************ Order Listing SPs ************** */

  deleteOrderById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'orders/' + id);
  }
}

