import { Vehicle } from './../../../shared/models/vehicle';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransporterRegistrationService {
  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  saveTransporter(transporter: any): Observable<any> {
    delete transporter.confirm_transporter_bank_acno;
    delete transporter.transporter_syscode;
    return this.http.post<Vehicle>(this.baseUrl + 'transporter-registrations', JSON.stringify(transporter), this.HttpUploadOptions);
  }

  getAllTransporters(): Observable<any> {
    return this.http.get(this.baseUrl + 'GetAllTransporter');
  }
}
