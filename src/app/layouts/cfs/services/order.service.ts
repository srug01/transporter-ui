import { Include } from './../../../shared/models/filter';
import { Order } from './../../../shared/models/order';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.baseUri;

  filter: any = {
    include: [
      {
        relation: 'containers'
      }
    ],
    fields: {
      order_type_syscode: true,
      orderId: true,
      order_date: true,
      source_syscode: true,
      destination_syscode: true,
      destination_type_syscode: true,
      source_type_syscode: true,
      order_remarks: true,
      order_address: true,
      is_delete: true,
      created_by: true,
      created_on: true,
      modify_by: true,
      modify_on: true,
      status: true,
      is_verified: true
    }
  };
  constructor(
    private http: HttpClient
  ) { }

  saveOrder(order: Order): Observable<any> {
    return this.http.post<Order>(this.baseUrl + 'orders', JSON.stringify(order));
  }

  getAllOrders(): Observable<Order[]> {
    this.filter.where = {
      status: 'submitted'
    };
    return this.http.get<Order[]>(this.baseUrl + 'orders?filter=' + JSON.stringify(this.filter));
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

