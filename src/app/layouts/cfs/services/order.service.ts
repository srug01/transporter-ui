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
  constructor(
    private http: HttpClient
  ) { }

  saveOrder(order: Order): Observable<any> {
    return this.http.post<Order>(this.baseUrl + 'orders', JSON.stringify(order));
  }
}

