
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TripInvoice } from '../../../shared/models/tripinvoice';
import { environment } from 'src/environments/environment';
import { ThreeparamObj } from 'src/app/shared/models/threeparamObj';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
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

  repTreeViewOrder(): Observable<TripInvoice[]> {
    return this.http.get<TripInvoice[]>('assets/data.json');
  }

  savetripInvoices(trip: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'generatetripinvoices', JSON.stringify(trip),
      this.HttpUploadOptions);
  }

  savetransporterInvoices(trip: any): Observable<any> {
    console.log("API :" + JSON.stringify(trip));
    return this.http.post<any>(this.baseUrl + 'generatetransportertripinvoices', JSON.stringify(trip),
      this.HttpUploadOptions);
  }

  saveorderInvoices(order: ThreeparamObj): Observable<any> {
    return this.http.post<ThreeparamObj>(this.baseUrl + 'generateorderinvoices', JSON.stringify(order),
      this.HttpUploadOptions);
  }

  gettripInvoicebyInvoiceId(id: number): Observable<any>{
    return this.http.get(this.baseUrl + 'getTripInvoicebyId/' + id);
  }

  getorderInvoicedetailsbyInvoiceId(id: number): Observable<any>{
    return this.http.get(this.baseUrl + 'getorderInvoicedetailsbyInvoiceId/' + id);
  }

  getorderInvoicemasterbyInvoiceId(id: number): Observable<any>{
    return this.http.get(this.baseUrl + 'getOrderInvoicemasterbyInvoiceId/' + id);
  }


}
