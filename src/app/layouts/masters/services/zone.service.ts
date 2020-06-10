import { Zone } from './../../../shared/models/zone';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  baseUrl = environment.baseUri;

  constructor(
    private http: HttpClient
  ) { }

  saveZoneMaster(zone: Zone): Observable<any> {
    delete zone.zone_syscode;
    return this.http.post<Zone>(this.baseUrl + 'zone-masters', JSON.stringify(zone));
  }

  updateZoneMaster(zone: Zone): Observable<any> {
    return this.http.put<Zone>(this.baseUrl + 'zone-masters/'+ zone.zone_syscode,
     JSON.stringify(zone));
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
