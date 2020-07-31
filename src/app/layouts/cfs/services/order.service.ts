import { Include } from './../../../shared/models/filter';
import { Order } from './../../../shared/models/order';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';


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
    return this.http.get<Order[]>(this.baseUrl + 'orders?filter='+JSON.stringify(include));
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(this.baseUrl + 'orders/' + orderId + '?filter=' + JSON.stringify(this.filter));
  }

  getCfsLocation(userId: number): Observable<any> {
    return this.http.get(this.baseUrl + 'searchCFSLocation/' + userId);
  }

  getAllSavedOrders(): Observable<Order[]> {
    this.filter.where = {
      status: 'pending'
    };
    return this.http.get<Order[]>(this.baseUrl + 'orders?filter=' + JSON.stringify(this.filter));
  }

  deleteOrderById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'orders/' + id);
  }
}

