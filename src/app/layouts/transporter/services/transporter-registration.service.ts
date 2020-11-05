import { Vehicle } from './../../../shared/models/vehicle';
import { Transporter} from './../../../shared/models/transporter'
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
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  saveTransporter(transporter: any): Observable<any> {
    delete transporter.transporterConfirmBankAccNumber;
    delete transporter.transporterId;
    return this.http.post<any>(this.baseUrl + 'transporter-registrations', JSON.stringify(transporter), this.HttpUploadOptions);
  }

  updateTransporter(transporter: any): Observable<any> {
    delete transporter.transporterConfirmBankAccNumber;
    return this.http.patch<Transporter>(
      this.baseUrl + 'transporter-registrations/' + transporter.transporterId,
      JSON.stringify(transporter), this.HttpUploadOptions
    );
  }


  getAllTransporters(): Observable<any> {
    // return this.http.get(this.baseUrl + 'GetAllTransporter');
    return this.http.get(this.baseUrl + 'transporter-registrations');
  }

  getTransporterById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'transporter-registrations/' + id);
  }

  getTransporterByUserId(id: number): Observable<any> {
    const filter = {
      where: {
        userId: id
      }
    }
    return this.http.get(this.baseUrl + 'transporter-registrations?filter=' + JSON.stringify(filter));
  }


  deleteTransporterById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'transporter-registrations/' + id);
  }
}
