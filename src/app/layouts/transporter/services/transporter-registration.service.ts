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

  constructor(
    private http: HttpClient
  ) { }

  saveTransporter(transporter: any): Observable<any> {
    delete transporter.confirm_transporter_bank_acno;
    return this.http.post<Vehicle>(this.baseUrl + 'transporter-registrations', JSON.stringify(transporter));
  }

  getAllTransporters(): Observable<any> {
    return this.http.get(this.baseUrl + 'transporter-registrations');
  }
}
