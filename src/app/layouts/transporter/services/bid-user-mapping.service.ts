import { BidUserMapping } from './../../../shared/models/bidusermapping';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BidUserMappingService {
  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  getAllConfirmedBids(): Observable<any> {
    return this.http.get(this.baseUrl + 'bidusermappings');
  }

  saveBid(bid: BidUserMapping): Observable<any> {
    delete bid.bidusermappingId;
    delete bid.bidName;
    return this.http.post<any>(this.baseUrl + 'bidusermappings', JSON.stringify(bid), this.HttpUploadOptions);
  }

  updateBid(bid: BidUserMapping): Observable<any> {
    delete bid.bidName;
    return this.http.patch<any>(this.baseUrl + 'bidusermappings/' + bid.bidusermappingId, JSON.stringify(bid), this.HttpUploadOptions);
  }

  GetBidDetailsByBidId(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'GetBidDetailsByBidId/' + id);
  }

  GetBidsbyUserId(id: number): Observable<any> {
    return this.http.get<BidUserMapping[]>(this.baseUrl + 'GetBidsByUserId/' + id);
  }
}
