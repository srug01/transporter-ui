import { Bid } from './../../../shared/models/bid';
import { Order } from './../../../shared/models/order';
import { Vehicle } from './../../../shared/models/vehicle';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BidRate } from 'src/app/shared/models/bidRate';

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

  getAllBidsforBidding(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'GetBidsforBidding/' + id);
  }

  // savebidForTransporter(subOrderId, userId, bidValue): Observable<any> {
  //   return this.http.get<any[]>(this.baseUrl + 'saveBidforTransporter/' + subOrderId + '/' + userId + '/' + bidValue);
  // }

  savebidForTransporter(bidRate: BidRate): Observable<any> {
    // console.log("Filter : " + JSON.stringify(suborderFilter));
    return this.http.post<any>(this.baseUrl + 'saveBidforTransporter',
    JSON.stringify(bidRate),
     this.HttpUploadOptions
    );
  }

}
