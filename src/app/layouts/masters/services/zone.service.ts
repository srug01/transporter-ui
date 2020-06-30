import { Zone } from './../../../shared/models/zone';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  saveZoneMaster(zone: Zone): Observable<any> {
    delete zone.zone_syscode;
    return this.http.post<Zone>(this.baseUrl + 'zone-masters', JSON.stringify(zone), this.HttpUploadOptions);
  }

  updateZoneMaster(zone: Zone): Observable<any> {
    return this.http.put<Zone>(this.baseUrl + 'zone-masters/'+ zone.zone_syscode,
     JSON.stringify(zone), this.HttpUploadOptions);
  }

  getAllZoneMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'zone-masters');
  }
  getZoneMastersById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'zone-masters/' + id);
  }

  deleteZoneMastersById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'zone-masters/' + id);
  }


}
