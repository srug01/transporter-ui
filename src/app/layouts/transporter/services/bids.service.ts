import { Bid } from './../../../shared/models/bid';
import { Order } from './../../../shared/models/order';
import { Vehicle } from './../../../shared/models/vehicle';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BidsService {
  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  getAllPlacedBids(): Observable<any> {
    return this.http.get(this.baseUrl + 'bids');
  }

  getAllBidsbyUserId(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'GetBidsByUserId/' + id);
  }

}
