import { ZoneDay } from './../../../shared/models/zoneday';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZonedayService {
  baseUrl = environment.baseUri;
  public HttpUploadOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(
    private http: HttpClient
  ) { }


  saveZoneDaytMaster(zoneday: ZoneDay): Observable<any> {
    console.log(zoneday);
    delete zoneday.zoneDayMasterId;
    console.log(zoneday);
    return this.http.post<ZoneDay>(this.baseUrl + 'zone-day-masters',
      JSON.stringify(zoneday), this.HttpUploadOptions);
  }
  updateZoneDayMaster(zoneday: ZoneDay): Observable<any> {
    return this.http.put<ZoneDay>(this.baseUrl + 'zone-day-masters/' +
      zoneday.zoneDayMasterId, JSON.stringify(zoneday), this.HttpUploadOptions);
  }

  getAllZoneDayMasters(): Observable<any> {
    return this.http.get(this.baseUrl + 'zone-day-masters');
  }

  getZoneDayMastersById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'zone-day-masters/' + id);
  }

  deleteZoneDayMastersById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'zone-day-masters/' + id);
  }


}
