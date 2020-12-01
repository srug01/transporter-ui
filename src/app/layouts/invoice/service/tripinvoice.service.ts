
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TripInvoice } from '../../../shared/models/tripinvoice';
import { environment } from 'src/environments/environment';

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

  savetripInvoice(trip: TripInvoice): Observable<any> {
    delete trip.invoiceId;
    return this.http.post<TripInvoice>(this.baseUrl + 'tripinvoices', JSON.stringify(trip),
      this.HttpUploadOptions);
  }

  gettripInvoicebyInvoiceId(id: number): Observable<any>{
    return this.http.get(this.baseUrl + 'getTripInvoicebyId/' + id);
  }

}
