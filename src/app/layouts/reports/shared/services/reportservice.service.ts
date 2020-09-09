
import { environment } from './../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  // repTreeViewOrder(): Observable<any> {
  //   return this.http.get(this.baseUrl + 'repTreeViewOrder');
  // }

  repTreeViewOrder(): Observable<Order[]> {
    return this.http.get<Order[]>('assets/data.json');
  }

}
