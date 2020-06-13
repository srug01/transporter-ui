import { Diesel } from './../../../shared/models/diesel';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DieselService {
  baseUrl = environment.baseUri;

  constructor(
    private http: HttpClient
  ) { }

  saveDieselMaster(diesel: Diesel): Observable<any> {
    console.log(diesel);
    delete diesel.diesel_rate_syscode;
    console.log(diesel);
    return this.http.post<Diesel>(this.baseUrl + 'diesel-rate-masters', JSON.stringify(diesel));
  }

  updateDieselMaster(diesel: Diesel): Observable<any> {
    return this.http.put<Diesel>(this.baseUrl + 'diesel-rate-masters/'+ diesel.diesel_rate_syscode, JSON.stringify(diesel));
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
