import { Diesel } from './../../../shared/models/diesel';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DieselService {
  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  saveDieselMaster(diesel: Diesel): Observable<any> {
    delete diesel.dieselRateId;
    return this.http.post<Diesel>(this.baseUrl + 'diesel-rate-masters', JSON.stringify(diesel), this.HttpUploadOptions);
  }

  updateDieselMaster(diesel: Diesel): Observable<any> {
    return this.http.put<Diesel>(this.baseUrl + 'diesel-rate-masters/'+ diesel.dieselRateId, JSON.stringify(diesel), this.HttpUploadOptions);
  }

  getAllDieselMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'diesel-rate-masters');
  }

  getDieselMastersById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'diesel-rate-masters/' + id);
  }

  deleteDieselMastersById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'diesel-rate-masters/' + id);
  }
}
