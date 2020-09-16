import { OrderFilter } from './../../../shared/models/OrderFilter';
import { Include } from './../../../shared/models/filter';
import { Order } from './../../../shared/models/order';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { User } from 'aws-sdk/clients/appstream';


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
    return this.http.get(this.baseUrl + 'status-details');
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

  getOrderListForAdmin(orderFilter: OrderFilter): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'GetOrderListForAdmin/'
      + orderFilter.sourceId + '/'
      + orderFilter.destinationId + '/'
      + orderFilter.orderDate + '/'
      + orderFilter.orderType + '/'
      + orderFilter.orderStatus + '/'
      + orderFilter.custId
    );
  }

  getAllCFSUsers(): Observable<User[]> {
    const filter = {
      where: {
        or: [{ typeSyscode: 4 }, { typeSyscode: 7 }, { typeSyscode: 8 }, { typeSyscode: 9 }]
      }
    }
    return this.http.get<User[]>(this.baseUrl + 'users?filter=' + JSON.stringify(filter));
  }

  /*  ************ Order Listing SPs ************** */

  deleteOrderById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'orders/' + id);
  }
}

